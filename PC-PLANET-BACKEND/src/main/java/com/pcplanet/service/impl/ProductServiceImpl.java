package com.pcplanet.service.impl;

import com.pcplanet.Constants;
import com.pcplanet.dto.productAttribute.ProductAttributeValueDTO;
import com.pcplanet.dto.param.ProductFilterParams;
import com.pcplanet.dto.product.*;
import com.pcplanet.entity.*;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.*;
import com.pcplanet.service.ProductService;
import com.pcplanet.utils.ImageUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final ProductImageRepository imageRepository;
    private final ProductKeyFeatureRepository keyFeatureRepository;
    private final ProductDescriptionRepository descriptionRepository;
    private final ProductSpecificationRepository specificationRepository;
    private final ProductAttributeValueRepository attributeValueRepository;
    private final ProductSpecificationPropertyRepository specificationPropertyRepository;
    private final ProductSpecificationPropertyValueRepository specificationPropertyValueRepository;

    @Value("${app.product-uploaded-data.storage-directory}")
    private String baseDir;

    public ProductServiceImpl(BrandRepository brandRepository,
                              ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              ProductImageRepository imageRepository,
                              ProductKeyFeatureRepository keyFeatureRepository,
                              ProductDescriptionRepository descriptionRepository,
                              ProductSpecificationRepository specificationRepository,
                              ProductAttributeValueRepository attributeValueRepository,
                              ProductSpecificationPropertyRepository specificationPropertyRepository,
                              ProductSpecificationPropertyValueRepository specificationPropertyValueRepository) {

        this.brandRepository = brandRepository;
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.keyFeatureRepository = keyFeatureRepository;
        this.descriptionRepository = descriptionRepository;
        this.specificationRepository = specificationRepository;
        this.attributeValueRepository = attributeValueRepository;
        this.specificationPropertyRepository = specificationPropertyRepository;
        this.specificationPropertyValueRepository = specificationPropertyValueRepository;
    }

    @Override
    public List<ProductInfoDTO> getProducts(ProductFilterParams params) {

        return productRepository.findProducts(params.getCategoryName(), params.getSubCategoryName(),
                        params.getBrandName(), params.getStatuses(), params.getBrandNames(), params.getAttributeValues())
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

        Product product = new Product();

        mapToProduct(productDetailsDTO, product);
        addOrUpdateProductAttributeValue(productDetailsDTO.getAttributeValues(), product);
        mapToProductKeyFeatures(productDetailsDTO.getKeyFeatures(), product);
        mapToProductSpecifications(productDetailsDTO.getSpecifications(), product);
        mapToProductDescriptions(productDetailsDTO.getDescriptions(), product);
        mapToProductImages(productDetailsDTO.getImages(), product);

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
        log.debug("Product updating with id: {}", productDetailsDTO.getId());

        Product product = productRepository.findById(productDetailsDTO.getId())
                .orElseThrow(() -> {
                    log.warn("Product not found with id: {}", productDetailsDTO.getId());
                    return new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
                });

        mapToProduct(productDetailsDTO, product);
        product.setUpdatedAt(LocalDateTime.now());

        addOrUpdateProductAttributeValue(productDetailsDTO.getAttributeValues(), product);
        updateProductKeyFeatures(productDetailsDTO.getKeyFeatures(), product);
        updateProductSpecifications(productDetailsDTO.getSpecifications(), product);
        updateProductDescriptions(productDetailsDTO.getDescriptions(), product);
        updateProductImages(productDetailsDTO.getImages(), product);

        var result = productRepository.save(product);
        log.debug("Product updated with model: {}", productDetailsDTO.getModel());

        return ProductDetailsDTO.ofEntity(result);
    }

    @Override
    public List<ProductInfoDTO> searchProductsByName(String name) {
        return productRepository.findByNameContainsIgnoreCase(name).stream().map(ProductInfoDTO::ofEntity).toList();
    }


    private void mapToProduct(ProductDetailsDTO productDetailsDTO, Product product) {
        if (productDetailsDTO.getName() == null || productDetailsDTO.getName().isBlank()) {
            throw new ServiceException(ErrorCode.NO_PRODUCT_NAME_PROVIDED);
        }
        product.setName(productDetailsDTO.getName());

        if (productDetailsDTO.getCode() == null || productDetailsDTO.getCode().isBlank()) {
            throw new ServiceException(ErrorCode.NO_PRODUCT_CODE_PROVIDED);
        }
        if (productDetailsDTO.getCode().length() < 6 || productDetailsDTO.getCode().length() > 12) {
            throw new ServiceException(ErrorCode.INVALID_PRODUCT_CODE_SIZE);
        }
        product.setCode(productDetailsDTO.getCode());

        if (productDetailsDTO.getModel() == null || productDetailsDTO.getModel().isBlank()) {
            throw new ServiceException(ErrorCode.NO_PRODUCT_MODEL_PROVIDED);
        }
        product.setModel(productDetailsDTO.getModel());

        if (productDetailsDTO.getPrice() == null) {
            throw new ServiceException(ErrorCode.NO_PRODUCT_PRICE_PROVIDED);
        }
        product.setPrice(productDetailsDTO.getPrice());
        product.setWarranty(productDetailsDTO.getWarranty());

        if (productDetailsDTO.getStatus() == null) {
            log.warn("Product status must be provided");
            throw new ServiceException(ErrorCode.NO_PRODUCT_STATUS_SELECTED);
        }
        product.setStatus(productDetailsDTO.getStatus());

        checkBrandAndCategory(productDetailsDTO);

        var brand = new Brand();
        brand.setId(productDetailsDTO.getBrand().getId());
        product.setBrand(brand);

        var category = new Category();
        category.setId(productDetailsDTO.getCategory().getId());
        product.setCategory(category);

        if (productDetailsDTO.getSubCategory() != null) {
            var subCategory = new SubCategory();
            subCategory.setId(productDetailsDTO.getSubCategory().getId());
            product.setSubCategory(subCategory);
        }
    }

    private void checkBrandAndCategory(ProductDetailsDTO productDetailsDTO) {
        if (productDetailsDTO.getCategory() == null) {
            log.warn("Product category must be provided");
            throw new ServiceException(ErrorCode.NO_CATEGORY_SELECTED);
        }

        categoryRepository.findById(productDetailsDTO.getCategory().getId())
                .orElseThrow(() -> {
                    log.warn("Product category not found with id: {}", productDetailsDTO.getCategory().getId());
                    return new ServiceException(ErrorCode.CATEGORY_NOT_FOUND);
                });

        if (productDetailsDTO.getBrand() == null) {
            log.warn("Product brand must be provided");
            throw new ServiceException(ErrorCode.NO_BRAND_SELECTED);
        }

        brandRepository.findById(productDetailsDTO.getBrand().getId())
                .orElseThrow(() -> {
                    log.warn("Product brand not found with id: {}", productDetailsDTO.getBrand().getId());
                    return new ServiceException(ErrorCode.BRAND_NOT_FOUND);
                });
    }

    private void mapToProductKeyFeatures(List<ProductKeyFeatureDTO> keyFeatureDTOs, Product product) {
        var keyFeatures = keyFeatureDTOs
                .stream()
                .map(featureDTO -> {
                    var keyFeature = new ProductKeyFeature();

                    keyFeature.setName(featureDTO.getName());
                    keyFeature.setValue(featureDTO.getValue());
                    keyFeature.setProduct(product);

                    return keyFeature;
                }).toList();

        product.setKeyFeatures(keyFeatures);
    }

    private void mapToProductSpecifications(List<ProductSpecificationDTO> specificationDTOs, Product product) {
        var specifications = specificationDTOs
                .stream()
                .map(specificationDTO -> {
                    var specification = new ProductSpecification();

                    specification.setType(specificationDTO.getType());
                    specification.setProduct(product);

                    if (specificationDTO.getProperties() != null) {
                        mapToProductSpecificationProperties(specificationDTO.getProperties(), specification);
                    }

                    return specification;
                }).collect(Collectors.toList());

        product.setSpecifications(specifications);
    }

    private void mapToProductDescriptions(List<ProductDescriptionDTO> descriptionDTOs, Product product) {
        var productDescriptions = descriptionDTOs
                .stream()
                .map(descriptionDTO -> {
                    var productDescription = new ProductDescription();

                    productDescription.setName(descriptionDTO.getName());
                    productDescription.setValue(descriptionDTO.getValue());
                    productDescription.setProduct(product);

                    return productDescription;
                }).toList();

        product.setDescriptions(productDescriptions);
    }

    private void mapToProductSpecificationProperties(
            List<ProductSpecificationPropertyDTO> specificationPropertyDTOs, ProductSpecification specification) {
        var specificationProperties = specificationPropertyDTOs
                .stream()
                .map(specificationPropertyDTO -> {
                    var specificationProperty = new ProductSpecificationProperty();
                    specificationProperty.setName(specificationPropertyDTO.getName());
                    specificationProperty.setSpecification(specification);

                    if (specificationPropertyDTO.getPropertyValues() != null) {
                        mapToSpecificationPropertyValues(specificationPropertyDTO.getPropertyValues(), specificationProperty);
                    }

                    return specificationProperty;
                }).toList();

        specification.setSpecificationProperties(specificationProperties);
    }

    private void mapToProductImages(List<ProductImageDTO> imageDTOs, Product product) {
        var images = imageDTOs
                .stream()
                .map(imageDTO -> {
                    var image = new ProductImage();

                    image.setImageLocation(saveImageAndGetPath(imageDTO.getFileName()));
                    image.setProduct(product);

                    return image;
                }).toList();

        product.setImages(images);
    }

    private void mapToSpecificationPropertyValues(
            List<ProductSpecificationPropertyValueDTO> specificationPropertyValueDTOs,
            ProductSpecificationProperty specificationProperty) {

        var specificationPropertyValues = specificationPropertyValueDTOs.stream()
                .map(specificationDetailsDTO -> {
                    var details = new ProductSpecificationPropertyValue();
                    details.setValue(specificationDetailsDTO.getValue());
                    details.setSpecificationProperty(specificationProperty);

                    return details;
                }).toList();

        specificationProperty.setSpecificationPropertyValues(specificationPropertyValues);
    }

    private void addOrUpdateProductAttributeValue(List<ProductAttributeValueDTO> attributeValueDTOs, Product product) {
        if (attributeValueDTOs == null || attributeValueDTOs.isEmpty()) return;

        if (product.getAttributeValues() == null) {
            product.setAttributeValues(new ArrayList<>());
        }

        /* Get attribute value IDs from the request */
        List<Integer> requestedAttributeValueIds = attributeValueDTOs
                .stream()
                .map(ProductAttributeValueDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove attribute values from the database that are not present in request */
        product.getAttributeValues().removeIf(attributeValue -> !requestedAttributeValueIds.contains(attributeValue.getId()));

        var attributeValues = new ArrayList<ProductAttributeValue>();

        for (var attributeValueDTO : attributeValueDTOs) {

            if (attributeValueDTO.getId() == null) return;

            var attributeValue = attributeValueRepository.findById(attributeValueDTO.getId())
                    .orElseThrow(() -> {
                        log.warn("Attribute value not found for id: {}", attributeValueDTO.getId());
                        return new ServiceException(ErrorCode.PRODUCT_KEY_FEATURE_NOT_FOUND);
                    });
            attributeValue.setUpdatedAt(LocalDateTime.now());

            attributeValue.getProducts().add(product);
            attributeValues.add(attributeValue);
        }
        product.setAttributeValues(attributeValues);
    }

    private void updateProductKeyFeatures(List<ProductKeyFeatureDTO> keyFeatureDTOs, Product product) {
        if (keyFeatureDTOs == null || keyFeatureDTOs.isEmpty()) return;

        if (product.getKeyFeatures() == null) {
            product.setKeyFeatures(new ArrayList<>());
        }

        /* Get keyFeature IDs from the request */
        List<Integer> requestedKeyFeatureIds = keyFeatureDTOs
                .stream()
                .map(ProductKeyFeatureDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove keyFeatures from the database that are not present in request */
        product.getKeyFeatures().removeIf(keyFeature -> !requestedKeyFeatureIds.contains(keyFeature.getId()));

        for (var keyFeatureDTO : keyFeatureDTOs) {
            ProductKeyFeature keyFeature;
            if (keyFeatureDTO.getId() != null) {
                keyFeature = keyFeatureRepository.findById(keyFeatureDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product key feature not found with id: {}", keyFeatureDTO.getId());
                            return new ServiceException(ErrorCode.PRODUCT_KEY_FEATURE_NOT_FOUND);
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
    }

    private void updateProductSpecifications(List<ProductSpecificationDTO> productSpecificationDTOs, Product product) {
        if (productSpecificationDTOs == null || productSpecificationDTOs.isEmpty()) return;

        if (product.getSpecifications() == null) {
            product.setSpecifications(new ArrayList<>());
        }

        /* Get specification IDs from the request */
        List<Integer> requestedSpecificationIds = productSpecificationDTOs
                .stream()
                .map(ProductSpecificationDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove specifications from the database that are not present in request */
        product.getSpecifications().removeIf(spec -> !requestedSpecificationIds.contains(spec.getId()));

        for (var specificationDTO : productSpecificationDTOs) {
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
            specification.setType(specificationDTO.getType());

            updateSpecificationProperties(specificationDTO.getProperties(), specification);
        }
    }

    private void updateSpecificationProperties(List<ProductSpecificationPropertyDTO> specificationPropertyDTOs, ProductSpecification specification) {
        if (specificationPropertyDTOs == null || specificationPropertyDTOs.isEmpty()) return;

        /* Get specification property IDs from the request */
        List<Integer> requestedSpecificationPropertyIds = specificationPropertyDTOs
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

        for (var specificationPropertyDTO : specificationPropertyDTOs) {
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

                if (specification.getSpecificationProperties() == null) {
                    specification.setSpecificationProperties(new ArrayList<>());
                }
                specification.getSpecificationProperties().add(specificationProperty);
            }
            specificationProperty.setName(specificationPropertyDTO.getName());

            updateSpecificationPropertyValues(specificationPropertyDTO.getPropertyValues(), specificationProperty);
        }
    }

    private void updateSpecificationPropertyValues(List<ProductSpecificationPropertyValueDTO> specificationPropertyValueDTOs, ProductSpecificationProperty specificationProperty) {
        if (specificationPropertyValueDTOs == null || specificationPropertyValueDTOs.isEmpty()) return;

        /* Get specification property value IDs from the request */
        List<Integer> requestedSpecificationPropertyValueIds = specificationPropertyValueDTOs
                .stream()
                .map(ProductSpecificationPropertyValueDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        if (specificationProperty.getSpecificationPropertyValues() == null) {
            specificationProperty.setSpecificationPropertyValues(new ArrayList<>());
        }

        /* Remove specification property value from the database that are not present in request */
        specificationProperty.getSpecificationPropertyValues().removeIf(propertyValue ->
                propertyValue != null && propertyValue.getId() != null && !requestedSpecificationPropertyValueIds.contains(propertyValue.getId())
        );

        for (var specificationPropertyValueDTO : specificationPropertyValueDTOs) {

            ProductSpecificationPropertyValue specificationPropertyValue;
            if (specificationPropertyValueDTO.getId() != null) {
                specificationPropertyValue = specificationPropertyValueRepository.findById(specificationPropertyValueDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product specification property value not found with id: {}", specificationPropertyValueDTO.getId());
                            return new ServiceException(ErrorCode.NOT_FOUND);
                        });
                specificationPropertyValue.setUpdatedAt(LocalDateTime.now());
            } else {
                specificationPropertyValue = new ProductSpecificationPropertyValue();
                specificationPropertyValue.setSpecificationProperty(specificationProperty);

                if (specificationProperty.getSpecificationPropertyValues() == null) {
                    specificationProperty.setSpecificationPropertyValues(new ArrayList<>());
                }
                specificationProperty.getSpecificationPropertyValues().add(specificationPropertyValue);
            }

            specificationPropertyValue.setValue(specificationPropertyValueDTO.getValue());
        }
    }

    private void updateProductDescriptions(List<ProductDescriptionDTO> productDescriptionDTOs, Product product) {
        if (productDescriptionDTOs == null || productDescriptionDTOs.isEmpty()) return;

        if (product.getDescriptions() == null) {
            product.setDescriptions(new ArrayList<>());
        }

        /* Get description IDs from the request */
        List<Integer> requestedDescriptionIds = productDescriptionDTOs
                .stream()
                .map(ProductDescriptionDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove descriptions from the database that are not present in request */
        product.getDescriptions().removeIf(description -> !requestedDescriptionIds.contains(description.getId()));

        for (var descriptionDTO : productDescriptionDTOs) {
            ProductDescription description;
            if (descriptionDTO.getId() != null) {
                description = descriptionRepository.findById(descriptionDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product description not found with id: {}", descriptionDTO.getId());
                            return new ServiceException(ErrorCode.NOT_FOUND);
                        });
                description.setUpdatedAt(LocalDateTime.now());
            } else {
                description = new ProductDescription();
                description.setProduct(product);
                product.getDescriptions().add(description);
            }
            description.setName(descriptionDTO.getName());
            description.setValue(descriptionDTO.getValue());
        }
    }

    private void updateProductImages(List<ProductImageDTO> imageDTOs, Product product) {
        if (imageDTOs == null || imageDTOs.isEmpty()) return;

        if (product.getImages() == null) {
            product.setImages(new ArrayList<>());
        }

        /* Get images IDs from the request */
        List<Integer> requestedImageIds = imageDTOs
                .stream()
                .map(ProductImageDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove images from the database that are not present in request */
        product.getImages().removeIf(image -> !requestedImageIds.contains(image.getId()));

        for (var imageDTO : imageDTOs) {
            ProductImage image;
            if (imageDTO.getId() != null) {
                image = imageRepository.findById(imageDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product image not found with id: {}", imageDTO.getId());
                            return new ServiceException(ErrorCode.NOT_FOUND);
                        });
                image.setUpdatedAt(LocalDateTime.now());
            } else {
                image = new ProductImage();

                image.setProduct(product);
                product.getImages().add(image);
                image.setImageLocation(saveImageAndGetPath(imageDTO.getFileName()));
            }
        }
    }

    private String saveImageAndGetPath(String base64Image) {
        return ImageUtils.saveImageFromBase64String(base64Image, baseDir, Constants.PRODUCT_IMAGE_DIRECTORY);
    }
}
