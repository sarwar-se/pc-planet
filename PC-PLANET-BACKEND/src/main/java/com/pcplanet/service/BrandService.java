package com.pcplanet.service;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.brand.CreateBrandDTO;

import java.util.List;

public interface BrandService {
    List<BrandDTO> findBrandsByCategory(int id);

    List<BrandDTO> findBrandsBySubCategory(int id);

    void insertBrand(CreateBrandDTO brandDTO);
}
