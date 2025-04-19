package com.pcplanet.dto.product;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.SubCategoryDTO;
import com.pcplanet.dto.productAttribute.ProductAttributeValueDTO;
import com.pcplanet.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDetailsDTO extends ProductInfoDTO {
    private Integer warranty;
    private List<ProductSpecificationDTO> specifications;
    private List<ProductDescriptionDTO> descriptions;
    private List<ProductAttributeValueDTO> attributeValues;
    private List<ProductImageDTO> images;

    public static ProductDetailsDTO ofEntity(Product product) {
        ProductDetailsDTO productDetailsDTO = new ProductDetailsDTO();

        productDetailsDTO.setId(product.getId());
        productDetailsDTO.setName(product.getName());
        productDetailsDTO.setCode(product.getCode());
        productDetailsDTO.setModel(product.getModel());
        productDetailsDTO.setPrice(product.getPrice());
        productDetailsDTO.setStatus(product.getStatus());
        productDetailsDTO.setWarranty(product.getWarranty());
        if (!product.getImages().isEmpty()) {
            productDetailsDTO.setImage(product.getImages().get(0).getImageLocation());
        }

        productDetailsDTO.setBrand(new BrandDTO(product.getBrand().getId(), product.getBrand().getName()));
        productDetailsDTO.setCategory(new CategoryDTO(product.getCategory().getId(), product.getCategory().getName()));
        if (product.getSubCategory() != null) {
            productDetailsDTO.setSubCategory(new SubCategoryDTO(product.getSubCategory().getId(), product.getSubCategory().getName()));
        }

        var keyFeatureDTOs = product.getKeyFeatures()
                .stream()
                .map(productKeyFeature -> {
                    var keyFeatureDTO = new ProductKeyFeatureDTO();

                    keyFeatureDTO.setId(productKeyFeature.getId());
                    keyFeatureDTO.setName(productKeyFeature.getName());
                    keyFeatureDTO.setValue(productKeyFeature.getValue());

                    return keyFeatureDTO;
                }).toList();

        var imageDTOs = product.getImages()
                .stream()
                .map(productImage -> {
                    var imageDTO = new ProductImageDTO();

                    imageDTO.setId(productImage.getId());
                    imageDTO.setFileName(productImage.getImageLocation());
                    return imageDTO;
                }).toList();
        productDetailsDTO.setImages(imageDTOs);

        var specificationDTOs = new ArrayList<ProductSpecificationDTO>();

        product.getSpecifications().forEach(specification -> {
            var specificationDTO = new ProductSpecificationDTO();

            var propertyDTOList = new ArrayList<ProductSpecificationPropertyDTO>();
            specification.getSpecificationProperties().forEach(specificationProperty -> {
                var propertyDTO = new ProductSpecificationPropertyDTO();
                propertyDTO.setId(specificationProperty.getId());
                propertyDTO.setName(specificationProperty.getName());

                var propertyValueDTOs = new ArrayList<ProductSpecificationPropertyValueDTO>();
                specificationProperty.getSpecificationPropertyValues().forEach(specificationPropertyValue -> {
                    var detailsDTO = new ProductSpecificationPropertyValueDTO();
                    detailsDTO.setId(specificationPropertyValue.getId());
                    detailsDTO.setValue(specificationPropertyValue.getValue());

                    propertyValueDTOs.add(detailsDTO);
                });
                propertyDTO.setPropertyValues(propertyValueDTOs);

                propertyDTOList.add(propertyDTO);
            });

            specificationDTO.setId(specification.getId());
            specificationDTO.setType(specification.getType());
            specificationDTO.setProperties(propertyDTOList);

            specificationDTOs.add(specificationDTO);
        });

        productDetailsDTO.setKeyFeatures(keyFeatureDTOs);
        productDetailsDTO.setSpecifications(specificationDTOs);

        var descriptionDTOs = product.getDescriptions()
                .stream()
                .map(productDescription -> {
                    var productDescDTO = new ProductDescriptionDTO();

                    productDescDTO.setId(productDescription.getId());
                    productDescDTO.setName(productDescription.getName());
                    productDescDTO.setValue(productDescription.getValue());

                    return productDescDTO;
                }).toList();
        productDetailsDTO.setDescriptions(descriptionDTOs);

        var attributeValueDTOs = product.getAttributeValues()
                .stream()
                .map(attributeValue -> {
                    var attributeValueDTO = new ProductAttributeValueDTO();

                    attributeValueDTO.setId(attributeValue.getId());
                    attributeValueDTO.setValue(attributeValue.getValue());

                    return attributeValueDTO;
                }).toList();

        productDetailsDTO.setAttributeValues(attributeValueDTOs);

        return productDetailsDTO;
    }
}
