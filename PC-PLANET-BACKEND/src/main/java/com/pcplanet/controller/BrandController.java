package com.pcplanet.controller;

import com.pcplanet.dto.brand.BrandDTO;
import com.pcplanet.dto.brand.CUBrandDTO;
import com.pcplanet.service.BrandService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/save")
    public void createOrUpdateBrand(@RequestBody CUBrandDTO brandDTO) {
        brandService.saveBrand(brandDTO);
    }

    @DeleteMapping("/delete/{brandId}")
    public void deleteProductBrand(@PathVariable int brandId) {
        brandService.deleteProductBrandById(brandId);
    }

    @GetMapping("/all")
    public List<BrandDTO> getBrands() {
        return brandService.getBrands();
    }
}
