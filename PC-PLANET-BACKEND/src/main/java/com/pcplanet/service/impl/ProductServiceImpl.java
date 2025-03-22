package com.pcplanet.service.impl;

import com.pcplanet.dto.param.ProductFilterParams;
import com.pcplanet.dto.product.*;
import com.pcplanet.entity.*;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.*;
import com.pcplanet.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductKeyFeatureRepository keyFeatureRepository;
    private final ProductSpecificationRepository specificationRepository;
    private final ProductSpecificationDetailsRepository specificationDetailsRepository;
    private final ProductSpecificationPropertyRepository specificationPropertyRepository;


    public ProductServiceImpl(BrandRepository brandRepository, ProductRepository productRepository,
                              CategoryRepository categoryRepository, ProductKeyFeatureRepository keyFeatureRepository,
                              ProductSpecificationRepository specificationRepository,
                              ProductSpecificationDetailsRepository specificationDetailsRepository,
                              ProductSpecificationPropertyRepository specificationPropertyRepository) {

        this.brandRepository = brandRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.keyFeatureRepository = keyFeatureRepository;
        this.specificationRepository = specificationRepository;
        this.specificationDetailsRepository = specificationDetailsRepository;
        this.specificationPropertyRepository = specificationPropertyRepository;
    }

    @Override
    public List<ProductInfoDTO> getProducts(ProductFilterParams params) {

        return productRepository.findProducts(params.getCategoryName(), params.getSubCategoryName(), params.getBrandName(), params.getStatuses(), params.getBrandNames(), params.getProperties())
                .stream()
                .map(ProductInfoDTO::ofEntity)
                .toList();
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    @Transactional
    public void saveProduct(ProductDetailsDTO productDetailsDTO) {
        log.debug("Saving new product with model: {}", productDetailsDTO.getModel());

        checkBrandAndCategory(productDetailsDTO);

        Product product = new Product();

        mapToProduct(productDetailsDTO, product);

        List<ProductKeyFeature> keyFeatures = productDetailsDTO.getKeyFeatures()
                .stream()
                .map(featureDTO -> {
                    ProductKeyFeature keyFeature = new ProductKeyFeature();

                    keyFeature.setName(featureDTO.getName());
                    keyFeature.setValue(featureDTO.getValue());
                    keyFeature.setProduct(product);

                    return keyFeature;
                }).toList();

        List<ProductSpecification> specifications = productDetailsDTO.getSpecifications()
                .stream()
                .map(specificationDTO -> {
                    ProductSpecification specification = new ProductSpecification();

                    specification.setCategory(specificationDTO.getCategory());
                    specification.setProduct(product);

                    List<ProductSpecificationProperty> specificationProperties = null;

                    if (specificationDTO.getSpecificationProperties() != null) {
                        specificationProperties = specificationDTO.getSpecificationProperties()
                                .stream()
                                .map(specificationPropertyDTO -> {
                                    var specificationProperty = new ProductSpecificationProperty();
                                    specificationProperty.setName(specificationPropertyDTO.getName());
                                    specificationProperty.setSpecification(specification);
                                    List<ProductSpecificationDetails> specificationDetails = null;
                                    if (specificationPropertyDTO.getSpecificationDetails() != null) {
                                        specificationDetails = specificationPropertyDTO.getSpecificationDetails()
                                                .stream()
                                                .map(specificationDetailsDTO -> {
                                                    var details = new ProductSpecificationDetails();
                                                    details.setDescription(specificationDetailsDTO.getDescription());
                                                    details.setSpecificationProperty(specificationProperty);

                                                    return details;
                                                }).toList();
                                        specificationProperty.setSpecificationDetails(specificationDetails);
                                    }

                                    return specificationProperty;
                                }).toList();
                    }

                    specification.setSpecificationProperties(specificationProperties);
                    return specification;
                }).collect(Collectors.toList());

        product.setKeyFeatures(keyFeatures);
        product.setSpecifications(specifications);

        productRepository.save(product);

        log.debug("Product saved with model: {}", productDetailsDTO.getModel());
    }

    @Override
    public ProductDetailsDTO getProductDetailsById(int productId) {
        var product = productRepository.findById(productId)
                .orElseThrow(() -> {
                    log.warn("Product not found with id: {}", productId);
                    return new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
                });

        return ProductDetailsDTO.ofEntity(product);
    }

    @Override
    public void deleteProductById(int productId) {
        log.debug("Product deleting with id: {}", productId);

        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            log.warn("Product not found with id: {}", productId);
            throw new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ProductDetailsDTO updateProduct(ProductDetailsDTO productDetailsDTO) {
        if (productDetailsDTO.getId() == null) {
            log.warn("Product id not provided");
            throw new ServiceException(ErrorCode.NO_PRODUCT_ID_PROVIDED);
        }

        checkBrandAndCategory(productDetailsDTO);

        log.debug("Product updating with id: {}", productDetailsDTO.getId());

        Product product = productRepository.findById(productDetailsDTO.getId())
                .orElseThrow(() -> {
                    log.warn("Product not found with id: {}", productDetailsDTO.getId());
                    return new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
                });

        mapToProduct(productDetailsDTO, product);
        product.setUpdatedAt(LocalDateTime.now());

        /* Get keyFeature IDs from the request */
        List<Integer> requestedKeyFeatureIds = productDetailsDTO.getKeyFeatures()
                .stream()
                .map(ProductKeyFeatureDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove keyFeatures from the database that are not present in request */
        product.getKeyFeatures().removeIf(keyFeature -> !requestedKeyFeatureIds.contains(keyFeature.getId()));

        for (ProductKeyFeatureDTO keyFeatureDTO : productDetailsDTO.getKeyFeatures()) {
            ProductKeyFeature keyFeature;
            if (keyFeatureDTO.getId() != null) {
                keyFeature = keyFeatureRepository.findById(keyFeatureDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product key feature not found with id: {}", keyFeatureDTO.getId());
                            return new ServiceException(ErrorCode.NO_KEY_FEATURE_FOUND);
                        });
                keyFeature.setUpdatedAt(LocalDateTime.now());
            } else {
                keyFeature = new ProductKeyFeature();
                keyFeature.setProduct(product);
                product.getKeyFeatures().add(keyFeature);
            }
            keyFeature.setName(keyFeatureDTO.getName());
            keyFeature.setValue(keyFeatureDTO.getValue());
        }

        /* Get specification IDs from the request */
        List<Integer> requestedSpecificationIds = productDetailsDTO.getSpecifications()
                .stream()
                .map(ProductSpecificationDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove specifications from the database that are not present in request */
        product.getSpecifications().removeIf(spec -> !requestedSpecificationIds.contains(spec.getId()));

        for (ProductSpecificationDTO specificationDTO : productDetailsDTO.getSpecifications()) {

            ProductSpecification specification;
            if (specificationDTO.getId() != null) {
                specification = specificationRepository.findById(specificationDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product specification not found with id: {}", specificationDTO.getId());
                            return new ServiceException(ErrorCode.NOT_FOUND);
                        });
                specification.setUpdatedAt(LocalDateTime.now());
            } else {
                specification = new ProductSpecification();
                specification.setProduct(product);
                product.getSpecifications().add(specification);
            }
            specification.setCategory(specificationDTO.getCategory());

            /* Get specification property IDs from the request */
            List<Integer> requestedSpecificationPropertyIds = specificationDTO.getSpecificationProperties()
                    .stream()
                    .map(ProductSpecificationPropertyDTO::getId)
                    .filter(Objects::nonNull)
                    .toList();

            if (specification.getSpecificationProperties() == null) {
                specification.setSpecificationProperties(new ArrayList<>());
            }

            /* Remove specification property from the database that are not present in request */
            specification.getSpecificationProperties().removeIf(properties ->
                    properties != null && properties.getId() != null && requestedSpecificationPropertyIds.contains(properties.getId())
            );

            for (ProductSpecificationPropertyDTO specificationPropertyDTO : specificationDTO.getSpecificationProperties()) {
                ProductSpecificationProperty specificationProperty;
                if (specificationPropertyDTO.getId() != null) {
                    specificationProperty = specificationPropertyRepository.findById(specificationPropertyDTO.getId())
                            .orElseThrow(() -> {
                                log.warn("Product specification property not found with id: {}", specificationPropertyDTO.getId());
                                return new ServiceException(ErrorCode.NOT_FOUND);
                            });
                    specificationProperty.setUpdatedAt(LocalDateTime.now());
                } else {
                    specificationProperty = new ProductSpecificationProperty();
                    specificationProperty.setSpecification(specification);
                    specification.getSpecificationProperties().add(specificationProperty);
                }
                specificationProperty.setName(specificationPropertyDTO.getName());


                /* Get specification detail IDs from the request */
                List<Integer> requestedSpecificationDetailsIds = specificationPropertyDTO.getSpecificationDetails()
                        .stream()
                        .map(ProductSpecificationDetailsDTO::getId)
                        .filter(Objects::nonNull)
                        .toList();

                if (specificationPropertyDTO.getSpecificationDetails() == null) {
                    specificationPropertyDTO.setSpecificationDetails(new ArrayList<>());
                }

                /* Remove specification details from the database that are not present in request */
                specificationPropertyDTO.getSpecificationDetails().removeIf(detail ->
                        detail != null && detail.getId() != null && !requestedSpecificationDetailsIds.contains(detail.getId())
                );

                for (ProductSpecificationDetailsDTO specificationDetailsDTO : specificationPropertyDTO.getSpecificationDetails()) {

                    ProductSpecificationDetails specificationDetails;
                    if (specificationDetailsDTO.getId() != null) {
                        specificationDetails = specificationDetailsRepository.findById(specificationDetailsDTO.getId())
                                .orElseThrow(() -> {
                                    log.warn("Product specification detail not found with id: {}", specificationDetailsDTO.getId());
                                    return new ServiceException(ErrorCode.NOT_FOUND);
                                });
                        specificationDetails.setUpdatedAt(LocalDateTime.now());
                    } else {
                        specificationDetails = new ProductSpecificationDetails();
                        specificationDetails.setSpecificationProperty(specificationProperty);
                        specificationProperty.getSpecificationDetails().add(specificationDetails);
                    }

                    specificationDetails.setDescription(specificationDetailsDTO.getDescription());
                }

            }
        }

        var result = productRepository.save(product);
        log.debug("Product updated with model: {}", productDetailsDTO.getModel());

        return ProductDetailsDTO.ofEntity(result);
    }

    @Override
    public List<ProductInfoDTO> searchProductsByName(String name) {
        return productRepository.findByNameContainsIgnoreCase(name).stream().map(ProductInfoDTO::ofEntity).toList();
    }

    private void checkBrandAndCategory(ProductDetailsDTO productDetailsDTO) {
        if (productDetailsDTO.getBrand() == null) {
            log.warn("Brand must be provided");
            throw new ServiceException(ErrorCode.NO_BRAND_FOUND);
        } else {
            brandRepository.findById(productDetailsDTO.getBrand().getId())
                    .orElseThrow(() -> {
                        log.warn("Brand not found with id: {}", productDetailsDTO.getBrand().getId());
                        return new ServiceException(ErrorCode.NO_BRAND_FOUND);
                    });
        }

        if (productDetailsDTO.getCategory() == null) {
            log.warn("Category must be provided");
            throw new ServiceException(ErrorCode.NO_CATEGORY_FOUND);
        } else {
            categoryRepository.findById(productDetailsDTO.getCategory().getId())
                    .orElseThrow(() -> {
                        log.warn("Category not found with id: {}", productDetailsDTO.getCategory().getId());
                        return new ServiceException(ErrorCode.NO_CATEGORY_FOUND);
                    });
        }
    }

    private void mapToProduct(ProductDetailsDTO productDetailsDTO, Product product) {
        product.setName(productDetailsDTO.getName());
        product.setCode(productDetailsDTO.getCode());
        product.setModel(productDetailsDTO.getModel());
        product.setPrice(productDetailsDTO.getPrice());
        product.setStatus(productDetailsDTO.getStatus());

        Brand brand = new Brand();
        brand.setId(productDetailsDTO.getBrand().getId());
        brand.setName(productDetailsDTO.getBrand().getName());
        product.setBrand(brand);

        Category category = new Category();
        category.setId(productDetailsDTO.getCategory().getId());
        category.setName(productDetailsDTO.getCategory().getName());
        product.setCategory(category);

        product.setWarranty(productDetailsDTO.getWarranty());
    }
}
