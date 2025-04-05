package com.pcplanet.service.impl;

import com.pcplanet.dto.subCategory.SubCategoryDTO;
import com.pcplanet.dto.subCategory.SubCategoryDetailsDTO;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.SubCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryServiceImpl(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public List<SubCategoryDTO> getSubCategoriesByCategory(int id) {
        var result = subCategoryRepository.findByCategoryId(id);
        return result.stream().map(SubCategoryDTO::ofEntity).toList();
    }

    @Override
    public SubCategoryDetailsDTO getSubCategoryDetailsByName(String name) {
        var result = subCategoryRepository.findByName(name);
        return result == null ? null : SubCategoryDetailsDTO.ofEntity(result);
    }
}
