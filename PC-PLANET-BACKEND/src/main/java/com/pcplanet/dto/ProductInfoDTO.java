package com.pcplanet.dto;

import com.pcplanet.entity.Product;
import com.pcplanet.enums.ProductStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductInfoDTO {
    private Integer id;
    private String name;
    private String code;
    private String model;
    private Double price;
    private ProductStatus status;
    private List<ProductKeyFeatureDTO> keyFeatures;

    public static ProductInfoDTO ofEntity(Product product) {
        var productInfoDTO = new ProductInfoDTO();

        productInfoDTO.setId(product.getId());
        productInfoDTO.setName(product.getName());
        productInfoDTO.setCode(product.getCode());
        productInfoDTO.setModel(product.getModel());
        productInfoDTO.setPrice(product.getPrice());
        productInfoDTO.setStatus(product.getStatus());

        List<ProductKeyFeatureDTO> keyFeatureDTOs = product.getKeyFeatures()
                .stream()
                .map(productKeyFeature -> {
                    ProductKeyFeatureDTO keyFeatureDTO = new ProductKeyFeatureDTO();

                    keyFeatureDTO.setId(productKeyFeature.getId());
                    keyFeatureDTO.setName(productKeyFeature.getName());
                    keyFeatureDTO.setValue(productKeyFeature.getValue());

                    return keyFeatureDTO;
                }).toList();
        productInfoDTO.setKeyFeatures(keyFeatureDTOs);

        return productInfoDTO;
    }
}