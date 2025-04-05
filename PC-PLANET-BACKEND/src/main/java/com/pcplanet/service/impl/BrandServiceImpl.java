package com.pcplanet.service.impl;

import com.pcplanet.dto.BrandDTO;
import com.pcplanet.repository.CategoryRepository;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.BrandService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public BrandServiceImpl(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<BrandDTO> findBrandsByCategory(int id) {
        var result = categoryRepository.findById(id);
        return result.map(category -> category.getBrands().stream().map(BrandDTO::ofEntity).toList())
                .orElse(Collections.emptyList());
    }

    @Override
    public List<BrandDTO> findBrandsBySubCategory(int id) {
        var result = subCategoryRepository.findById(id);
        return result.map(category -> category.getBrands().stream().map(BrandDTO::ofEntity).toList())
                .orElse(Collections.emptyList());
    }
}
