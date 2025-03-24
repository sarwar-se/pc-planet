package com.pcplanet.dto.product;

import com.pcplanet.dto.BrandDTO;
import com.pcplanet.dto.CategoryDTO;
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
            productDetailsDTO.setImage(product.getImages().get(0).getFileName());
        }

        productDetailsDTO.setBrand(new BrandDTO(product.getBrand().getId(), product.getBrand().getName()));
        productDetailsDTO.setCategory(new CategoryDTO(product.getCategory().getId(), product.getCategory().getName()));

        List<ProductKeyFeatureDTO> keyFeatureDTOs = product.getKeyFeatures()
                .stream()
                .map(productKeyFeature -> {
                    ProductKeyFeatureDTO keyFeatureDTO = new ProductKeyFeatureDTO();

                    keyFeatureDTO.setId(productKeyFeature.getId());
                    keyFeatureDTO.setName(productKeyFeature.getName());
                    keyFeatureDTO.setValue(productKeyFeature.getValue());

                    return keyFeatureDTO;
                }).toList();

        List<ProductImageDTO> imageDTOs = product.getImages()
                .stream()
                .map(productImage -> {
                    ProductImageDTO imageDTO = new ProductImageDTO();

                    imageDTO.setId(productImage.getId());
                    imageDTO.setFileName(productImage.getFileName());
                    return imageDTO;
                }).toList();
        productDetailsDTO.setImages(imageDTOs);

        List<ProductSpecificationDTO> specificationDTOs = new ArrayList<>();

        product.getSpecifications().forEach(specification -> {
            ProductSpecificationDTO specificationDTO = new ProductSpecificationDTO();

            List<ProductSpecificationPropertyDTO> propertyDTOList = new ArrayList<>();
            specification.getSpecificationProperties().forEach(specificationProperty -> {
                var propertyDTO = new ProductSpecificationPropertyDTO();
                propertyDTO.setId(specificationProperty.getId());
                propertyDTO.setName(specificationProperty.getName());

                List<ProductSpecificationPropertyValueDTO> propertyValueDTOs = new ArrayList<>();
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

        List<ProductDescriptionDTO> descriptionDTOs = product.getDescriptions()
                .stream()
                .map(productDescription -> {
                    var productDescDTO = new ProductDescriptionDTO();

                    productDescDTO.setId(productDescription.getId());
                    productDescDTO.setName(productDescription.getName());
                    productDescDTO.setValue(productDescription.getValue());

                    return productDescDTO;
                }).toList();
        productDetailsDTO.setDescriptions(descriptionDTOs);

        return productDetailsDTO;
    }
}
