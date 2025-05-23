package com.pcplanet.dto.product;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.category.CategoryDTO;
import com.pcplanet.dto.category.SubCategoryDTO;
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
    private BrandDTO brand;
    private CategoryDTO category;
    private SubCategoryDTO subCategory;
    private List<ProductKeyFeatureDTO> keyFeatures;
    private String image;

    public static ProductInfoDTO ofEntity(Product product) {
        var productInfoDTO = new ProductInfoDTO();

        productInfoDTO.setId(product.getId());
        productInfoDTO.setName(product.getName());
        productInfoDTO.setCode(product.getCode());
        productInfoDTO.setModel(product.getModel());
        productInfoDTO.setPrice(product.getPrice());
        productInfoDTO.setStatus(product.getStatus());

        productInfoDTO.setBrand(new BrandDTO(product.getBrand().getId(), product.getBrand().getName()));
        productInfoDTO.setCategory(new CategoryDTO(product.getCategory().getId(), product.getCategory().getName()));
        if (product.getSubCategory() != null) {
            productInfoDTO.setSubCategory(new SubCategoryDTO(product.getSubCategory().getId(), product.getSubCategory().getName()));
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
        productInfoDTO.setKeyFeatures(keyFeatureDTOs);

        productInfoDTO.setImage(!product.getImages().isEmpty() ? product.getImages().get(0).getImageLocation() : null);

        return productInfoDTO;
    }
}
