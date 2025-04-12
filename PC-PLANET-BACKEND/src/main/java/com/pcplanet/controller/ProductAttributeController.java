package com.pcplanet.controller;

import com.pcplanet.dto.productAttribute.CreateProductAttributeDTO;
import com.pcplanet.service.ProductAttributeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product-attribute")
public class ProductAttributeController {

    private final ProductAttributeService productAttributeService;

    public ProductAttributeController(ProductAttributeService productAttributeService) {
        this.productAttributeService = productAttributeService;
    }

    @PostMapping("/save")
    public void createOrUpdateProductAttribute(@RequestBody CreateProductAttributeDTO attributeDTO) {
        productAttributeService.saveProductAttribute(attributeDTO);
    }
}
