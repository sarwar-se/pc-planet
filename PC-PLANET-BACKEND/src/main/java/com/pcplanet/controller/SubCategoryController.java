package com.pcplanet.controller;

import com.pcplanet.dto.SubCategoryDTO;
import com.pcplanet.service.SubCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product-sub-category")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/details")
    public SubCategoryDTO getCategoryDetails(@RequestParam String subCategoryName) {

        return subCategoryService.getSubCategoryDetailsByName(subCategoryName);
    }
}
