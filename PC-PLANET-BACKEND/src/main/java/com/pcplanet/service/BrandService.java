package com.pcplanet.service;

import com.pcplanet.dto.BrandDTO;

import java.util.List;

public interface BrandService {
    List<BrandDTO> findBrandsByCategory(int id);

    List<BrandDTO> findBrandsBySubCategory(int id);
}
