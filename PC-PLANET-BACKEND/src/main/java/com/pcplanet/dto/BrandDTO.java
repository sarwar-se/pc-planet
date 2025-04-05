package com.pcplanet.dto;

import com.pcplanet.entity.Brand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class BrandDTO {
    private int id;
    private String name;

    public static BrandDTO ofEntity(Brand brand) {
        return BrandDTO
                .builder()
                .id(brand.getId())
                .name(brand.getName())
                .build();
    }
}
