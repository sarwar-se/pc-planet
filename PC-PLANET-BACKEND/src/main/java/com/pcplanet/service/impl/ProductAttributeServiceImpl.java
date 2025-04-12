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
    public void insertProductAttribute(CreateProductAttributeDTO attributeDTO) {
        if (attributeDTO.getCategoryId() == null) {
            ServiceHelper.categoryNullThrowException();
        }

        var category = categoryRepository.findById(attributeDTO.getCategoryId())
                .orElseThrow(() -> {
                    ServiceHelper.categoryNotFoundThrowException(attributeDTO.getCategoryId());
                    return null;
                });

        SubCategory subCategory = null;
        if (attributeDTO.getSubCategoryId() != null) {
            subCategory = subCategoryRepository.findById(attributeDTO.getSubCategoryId())
                    .orElseThrow(() -> {
                        ServiceHelper.subCategoryNotFoundThrowException(attributeDTO.getSubCategoryId());
                        return null;
                    });
        }

        var attributeExists = productAttributeRepository.findByNameIgnoreCase(attributeDTO.getName());
        if (attributeExists != null) {
            log.warn("Product attribute already exists with name: {}", attributeDTO.getName());
            throw new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_ALREADY_EXISTS);
        }

        var productAttribute = new ProductAttribute();
        productAttribute.setName(attributeDTO.getName());
        mapToProductAttributeValue(attributeDTO.getAttributeValues(), productAttribute);

        category.getAttributes().add(productAttribute);
        if (subCategory != null) {
            subCategory.getAttributes().add(productAttribute);
        }

        productAttributeRepository.save(productAttribute);
        log.info("Saved new product attribute");
    }

    private void mapToProductAttributeValue(List<ProductAttributeValueDTO> attributeValueDTOs, ProductAttribute productAttribute) {
        var attributeValues = attributeValueDTOs
                .stream()
                .map(attributeValueDTO -> {
                    var attributeValue = new ProductAttributeValue();

                    var existsAttributeValue = productAttributeValueRepository.findByValueIgnoreCase(attributeValueDTO.getValue().toLowerCase());
                    if (existsAttributeValue != null) {
                        log.warn("Product attribute value already exists with name: {}", attributeValueDTO.getValue());
                        throw new ServiceException(ErrorCode.PRODUCT_ATTRIBUTE_VALUE_ALREADY_EXISTS);
                    }

                    attributeValue.setValue(attributeValueDTO.getValue());
                    attributeValue.setAttribute(productAttribute);
                    return attributeValue;
                }).toList();

        productAttribute.setAttributeValues(attributeValues);
    }
}
