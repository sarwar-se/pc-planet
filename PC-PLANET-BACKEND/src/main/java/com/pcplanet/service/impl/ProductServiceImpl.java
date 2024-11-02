package com.pcplanet.service.impl;

import com.pcplanet.dto.ProductDTO;
import com.pcplanet.dto.ProductSpecificationDTO;
import com.pcplanet.dto.ProductSpecificationDetailsDTO;
import com.pcplanet.entity.*;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.ProductRepository;
import com.pcplanet.repository.ProductSpecificationDetailsRepository;
import com.pcplanet.repository.ProductSpecificationRepository;
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
    private final ProductRepository productRepository;
    private final ProductSpecificationRepository specificationRepository;
    private final ProductSpecificationDetailsRepository specificationDetailsRepository;


    public ProductServiceImpl(ProductRepository productRepository, ProductSpecificationRepository specificationRepository,
                              ProductSpecificationDetailsRepository specificationDetailsRepository) {
        this.productRepository = productRepository;
        this.specificationRepository = specificationRepository;
        this.specificationDetailsRepository = specificationDetailsRepository;
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    @Transactional
    public void saveProduct(ProductDTO productDTO) {
        log.debug("Saving new product with model: {}", productDTO.getModel());

        Product product = new Product();

        mapToProduct(productDTO, product);

        List<ProductSpecification> specifications = productDTO.getSpecifications()
                .stream()
                .map(specificationDTO -> {
                    ProductSpecification specification = new ProductSpecification();

                    specification.setCategory(specificationDTO.getCategory());
                    specification.setProduct(product);

                    List<ProductSpecificationDetails> specificationDetails = specificationDTO.getSpecificationDetails()
                            .stream()
                            .map(specificationDetailsDTO -> {
                                ProductSpecificationDetails details = new ProductSpecificationDetails();

                                details.setName(specificationDetailsDTO.getName());
                                details.setValue(specificationDetailsDTO.getValue());
                                details.setSpecification(specification);
                                return details;
                            }).collect(Collectors.toList());

                    specification.setSpecificationDetails(specificationDetails);
                    return specification;
                }).collect(Collectors.toList());

        product.setSpecifications(specifications);

        productRepository.save(product);

        log.debug("Product saved with model: {}", productDTO.getModel());
    }

    @Override
    public Product getProductById(int productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> {
                    log.warn("Product not found with id: {}", productId);
                    return new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
                });
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
    public ProductDTO updateProduct(ProductDTO productDTO) {
        if (productDTO.getId() == null) {
            log.warn("Product id not provided");
            throw new ServiceException(ErrorCode.NO_PRODUCT_ID_PROVIDED);
        }

        log.debug("Product updating with id: {}", productDTO.getId());

        Product product = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> {
                    log.warn("Product not found with id: {}", productDTO.getId());
                    return new ServiceException(ErrorCode.PRODUCT_NOT_FOUND);
                });

        mapToProduct(productDTO, product);
        product.setUpdatedAt(LocalDateTime.now());

        /* Get specification IDs from the request */
        List<Integer> requestedSpecificationIds = productDTO.getSpecifications()
                .stream()
                .map(ProductSpecificationDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        /* Remove specifications from the database that are not present in request */
        product.getSpecifications().removeIf(spec -> !requestedSpecificationIds.contains(spec.getId()));

        for (ProductSpecificationDTO specificationDTO : productDTO.getSpecifications()) {

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

            /* Get specification detail IDs from the request */
            List<Integer> requestedSpecificationDetailsIds = specificationDTO.getSpecificationDetails()
                    .stream()
                    .map(ProductSpecificationDetailsDTO::getId)
                    .filter(Objects::nonNull)
                    .toList();

            if (specification.getSpecificationDetails() == null) {
                specification.setSpecificationDetails(new ArrayList<>());
            }

            /* Remove specification details from the database that are not present in request */
            specification.getSpecificationDetails().removeIf(detail ->
                    detail != null && detail.getId() != null && !requestedSpecificationDetailsIds.contains(detail.getId())
            );

            for (ProductSpecificationDetailsDTO specificationDetailsDTO : specificationDTO.getSpecificationDetails()) {

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
                    specificationDetails.setSpecification(specification);
                    specification.getSpecificationDetails().add(specificationDetails);
                }

                specificationDetails.setName(specificationDetailsDTO.getName());
                specificationDetails.setValue(specificationDetailsDTO.getValue());
            }
        }

        var result = productRepository.save(product);
        log.debug("Product updated with model: {}", productDTO.getModel());

        return ProductDTO.ofEntity(result);
    }

    private void mapToProduct(ProductDTO productDTO, Product product) {
        product.setName(productDTO.getName());
        product.setCode(productDTO.getCode());
        product.setModel(productDTO.getModel());
        product.setPrice(productDTO.getPrice());
        product.setStatus(productDTO.getStatus());
        product.setBrand(productDTO.getBrand());
        product.setCategory(productDTO.getCategory());
    }
}
