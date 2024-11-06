package com.pcplanet.dto;

import com.pcplanet.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDetailsDTO extends ProductInfoDTO {
    private Integer warranty;
    private BrandDTO brand;
    private CategoryDTO category;
    private List<ProductSpecificationDTO> specifications;

    public static ProductDetailsDTO ofEntity(Product product) {
        ProductDetailsDTO productDetailsDTO = new ProductDetailsDTO();

        productDetailsDTO.setId(product.getId());
        productDetailsDTO.setName(product.getName());
        productDetailsDTO.setCode(product.getCode());
        productDetailsDTO.setModel(product.getModel());
        productDetailsDTO.setPrice(product.getPrice());
        productDetailsDTO.setStatus(product.getStatus());
        productDetailsDTO.setWarranty(product.getWarranty());

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

        List<ProductSpecificationDTO> specificationDTOs = new ArrayList<>();

        product.getSpecifications().forEach(specification -> {
            ProductSpecificationDTO specificationDTO = new ProductSpecificationDTO();

            List<ProductSpecificationDetailsDTO> detailsDTOs = new ArrayList<>();

            specification.getSpecificationDetails().forEach(specificationDetail -> {
                ProductSpecificationDetailsDTO detailsDTO = new ProductSpecificationDetailsDTO();

                detailsDTO.setId(specificationDetail.getId());
                detailsDTO.setName(specificationDetail.getName());
                detailsDTO.setValue(specificationDetail.getValue());

                detailsDTOs.add(detailsDTO);
            });
            specificationDTO.setId(specification.getId());
            specificationDTO.setCategory(specification.getCategory());
            specificationDTO.setSpecificationDetails(detailsDTOs);

            specificationDTOs.add(specificationDTO);
        });

        productDetailsDTO.setKeyFeatures(keyFeatureDTOs);
        productDetailsDTO.setSpecifications(specificationDTOs);

        return productDetailsDTO;
    }
}
