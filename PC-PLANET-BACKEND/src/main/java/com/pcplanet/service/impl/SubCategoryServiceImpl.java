package com.pcplanet.service.impl;

import com.pcplanet.dto.SubCategoryDTO;
import com.pcplanet.repository.SubCategoryRepository;
import com.pcplanet.service.SubCategoryService;
import org.springframework.stereotype.Service;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryServiceImpl(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    public SubCategoryDTO getSubCategoryDetailsByName(String name) {
        var result = subCategoryRepository.findByName(name);
        return result == null ? null : SubCategoryDTO.ofEntity(result);
    }
}
