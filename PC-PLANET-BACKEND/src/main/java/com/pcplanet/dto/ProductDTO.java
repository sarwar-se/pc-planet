package com.pcplanet.dto;

import com.pcplanet.entity.Brand;
import com.pcplanet.entity.Category;
import com.pcplanet.entity.Product;
import com.pcplanet.enums.ProductStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDTO {
    private Integer id;
    private String name;
    private String code;
    private String model;
    private Double price;
    private ProductStatus status;
    private Brand brand;
    private Category category;
    private List<ProductSpecificationDTO> specifications;

    public static ProductDTO ofEntity(Product product) {
        ProductDTO productDTO = new ProductDTO();

        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setCode(product.getCode());
        productDTO.setModel(product.getModel());
        productDTO.setPrice(product.getPrice());
        productDTO.setStatus(product.getStatus());
        productDTO.setBrand(product.getBrand());
        productDTO.setCategory(product.getCategory());

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

        productDTO.setSpecifications(specificationDTOs);

        return productDTO;
    }
}
