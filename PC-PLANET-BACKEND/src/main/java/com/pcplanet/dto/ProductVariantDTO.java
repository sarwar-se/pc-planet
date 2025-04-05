package com.pcplanet.dto;

import com.pcplanet.entity.FilterKey;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductVariantDTO {
    private Integer id;
    private String name;
    private List<ProductVariantPropertyDTO> properties;

    public static ProductVariantDTO ofEntity(FilterKey variant) {
        var variantDTO = new ProductVariantDTO();

        variantDTO.setId(variant.getId());
        variantDTO.setName(variant.getName());

        List<ProductVariantPropertyDTO> variantPropertyDTOs = variant.getFilterProperties()
                .stream()
                .map(variantProperty -> {
                    var variantPropertyDTO = new ProductVariantPropertyDTO();
                    variantPropertyDTO.setId(variantProperty.getId());
                    variantPropertyDTO.setName(variantProperty.getName());

                    return variantPropertyDTO;
                }).toList();

        variantDTO.setProperties(variantPropertyDTOs);

        return variantDTO;
    }
}
