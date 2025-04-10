package com.pcplanet.dto;

import com.pcplanet.entity.ProductAttribute;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductAttributeDTO {
    private Integer id;
    private String name;
    private List<ProductAttributeValueDTO> attributeValues;

    public static ProductAttributeDTO ofEntity(ProductAttribute attribute) {
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
    }
}
