package com.pcplanet.dto.category;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.productAttribute.ProductAttributeDTO;
import com.pcplanet.dto.productAttribute.ProductAttributeValueDTO;
import com.pcplanet.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDetailsDTO {
    private Integer id;
    private String name;
    private List<BrandDTO> brands;
    private List<ProductAttributeDTO> attributes;

    public CategoryDetailsDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public static CategoryDetailsDTO ofEntity(Category category) {
        var categoryDTO = new CategoryDetailsDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        var brandDTOs = category.getBrands()
                .stream()
                .map(brand -> new BrandDTO(brand.getId(), brand.getName())).toList();

        categoryDTO.setBrands(brandDTOs);

        var attributeDTOs = category.getAttributes()
                .stream()
                .map(attribute -> {
                    var attributeDTO = new ProductAttributeDTO();

                    attributeDTO.setId(attribute.getId());
                    attributeDTO.setName(attribute.getName());
                    var attributeValueDTOs = attribute.getAttributeValues()
                            .stream()
                            .map(attributeValue -> {
                                var attributeValueDTO = new ProductAttributeValueDTO();

                                attributeValueDTO.setId(attributeValue.getId());
                                attributeValueDTO.setValue(attributeValue.getValue());

                                return attributeValueDTO;
                            }).toList();
                    attributeDTO.setAttributeValues(attributeValueDTOs);

                    return attributeDTO;
                }).toList();
        categoryDTO.setAttributes(attributeDTOs);

        return categoryDTO;
    }
}
