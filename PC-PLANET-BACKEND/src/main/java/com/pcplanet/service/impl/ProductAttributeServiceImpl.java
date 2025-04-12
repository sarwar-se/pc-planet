package com.pcplanet.service.impl;

import com.pcplanet.dto.productAttribute.CreateProductAttributeDTO;
import com.pcplanet.dto.productAttribute.ProductAttributeValueDTO;
import com.pcplanet.entity.ProductAttribute;
import com.pcplanet.entity.ProductAttributeValue;
import com.pcplanet.entity.SubCategory;
import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.repository.ProductAttributeRepository;
import com.pcplanet.repository.ProductAttributeValueRepository;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.ProductAttributeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ProductAttributeServiceImpl implements ProductAttributeService {
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;

    public ProductAttributeServiceImpl(CategoryRepository categoryRepository,
                                       SubCategoryRepository subCategoryRepository,
                                       ProductAttributeRepository productAttributeRepository, ProductAttributeValueRepository productAttributeValueRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productAttributeRepository = productAttributeRepository;
        this.productAttributeValueRepository = productAttributeValueRepository;
    }

    @Override
    @Transactional
    public void saveProductAttribute(CreateProductAttributeDTO attributeDTO) {
        if (attributeDTO.getCategoryId() == null) {
            log.warn("Product category must be provided");
            throw new ServiceException(ErrorCode.NO_CATEGORY_SELECTED);
        }

        var category = categoryRepository.findById(attributeDTO.getCategoryId())
                .orElseThrow(() -> {
                    log.warn("Category not found with id: {}", attributeDTO.getCategoryId());
                    return new ServiceException(ErrorCode.CATEGORY_NOT_FOUND);
                });

        SubCategory subCategory = null;
        if (attributeDTO.getSubCategoryId() != null) {
            subCategory = subCategoryRepository.findById(attributeDTO.getSubCategoryId())
                    .orElseThrow(() -> {
                        log.warn("Sub-category not found with id: {}", attributeDTO.getSubCategoryId());
                        return new ServiceException(ErrorCode.SUB_CATEGORY_NOT_FOUND);
                    });
        }

        ProductAttribute productAttribute;

        if (attributeDTO.getId() != null) {
            productAttribute = productAttributeRepository.findById(attributeDTO.getId()).orElseThrow(() -> {
                log.warn("Product attribute not found with id: {}", attributeDTO.getId());
                return new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_NOT_FOUND);
            });
        } else {
            var attributeExists = productAttributeRepository.findByNameIgnoreCase(attributeDTO.getName());
            if (attributeExists != null && attributeDTO.getId() == null) {
                log.warn("Product attribute already exists with name: {}", attributeDTO.getName());
                throw new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_ALREADY_EXISTS);
            }

            productAttribute = new ProductAttribute();
        }

        productAttribute.setId(attributeDTO.getId());
        productAttribute.setName(attributeDTO.getName());
        mapToProductAttributeValue(attributeDTO.getAttributeValues(), productAttribute);

        if (!category.getAttributes().contains(productAttribute)) {
            category.getAttributes().add(productAttribute);
        }

        if (subCategory != null && !subCategory.getAttributes().contains(productAttribute)) {
            subCategory.getAttributes().add(productAttribute);
        }

        productAttributeRepository.save(productAttribute);
        log.info("Saved new product attribute");
    }

    private void mapToProductAttributeValue(List<ProductAttributeValueDTO> attributeValueDTOs, ProductAttribute productAttribute) {
        List<ProductAttributeValue> existingValues = productAttribute.getAttributeValues();
        if (existingValues == null) {
            existingValues = new ArrayList<>();
            productAttribute.setAttributeValues(existingValues);
        } else {
            existingValues.clear();
        }

        for (ProductAttributeValueDTO attributeValueDTO : attributeValueDTOs) {
            ProductAttributeValue attributeValue;

            if (attributeValueDTO.getId() != null) {
                attributeValue = productAttributeValueRepository.findById(attributeValueDTO.getId())
                        .orElseThrow(() -> {
                            log.warn("Product attribute not found with id: {}", attributeValueDTO.getId());
                            return new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_VALUE_NOT_FOUND);
                        });
            } else {
                var existsAttributeValue = productAttributeValueRepository.findByValueIgnoreCase(attributeValueDTO.getValue().toLowerCase());
                if (existsAttributeValue != null) {
                    log.warn("Product attribute already exists with name: {}", attributeValueDTO.getValue());
                    throw new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_VALUE_ALREADY_EXISTS);
                }
                attributeValue = new ProductAttributeValue();
            }

            attributeValue.setId(attributeValueDTO.getId());
            attributeValue.setValue(attributeValueDTO.getValue());
            attributeValue.setAttribute(productAttribute);

            existingValues.add(attributeValue);
        }
    }
}
