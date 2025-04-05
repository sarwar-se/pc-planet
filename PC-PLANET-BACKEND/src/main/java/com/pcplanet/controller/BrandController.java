package com.pcplanet.controller;

import com.pcplanet.dto.BrandDTO;
import com.pcplanet.service.BrandService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-brand")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/get-brands-by-category")
    public List<BrandDTO> getBrandsByCategory(@RequestParam int categoryId) {
        return brandService.findBrandsByCategory(categoryId);
    }

    @GetMapping("/get-brands-by-sub-category")
    public List<BrandDTO> getBrandsSubCategory(@RequestParam int subCategoryId) {
        return brandService.findBrandsBySubCategory(subCategoryId);
    }
}
