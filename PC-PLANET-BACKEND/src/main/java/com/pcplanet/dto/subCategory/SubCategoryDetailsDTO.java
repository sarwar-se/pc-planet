package com.pcplanet.dto.subCategory;

import com.pcplanet.dto.BrandDTO;
import com.pcplanet.dto.ProductAttributeDTO;
import com.pcplanet.dto.ProductAttributeValueDTO;
import com.pcplanet.entity.SubCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SubCategoryDetailsDTO {
    private Integer id;
    private String name;
    private List<BrandDTO> brands;
    private List<ProductAttributeDTO> attributes;

    public static SubCategoryDetailsDTO ofEntity(SubCategory category) {
        var categoryDTO = new SubCategoryDetailsDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());

        var brandDTOs = category.getBrands()
                .stream()
                .map(brand -> {
                    return new BrandDTO(brand.getId(), brand.getName());
                }).toList();

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
                                var filterPropertyDTO = new ProductAttributeValueDTO();

                                filterPropertyDTO.setId(attributeValue.getId());
                                filterPropertyDTO.setValue(attributeValue.getValue());

                                return filterPropertyDTO;
                            }).toList();
                    attributeDTO.setAttributeValues(attributeValueDTOs);

                    return attributeDTO;
                }).toList();
        categoryDTO.setAttributes(attributeDTOs);

        return categoryDTO;
    }
}
