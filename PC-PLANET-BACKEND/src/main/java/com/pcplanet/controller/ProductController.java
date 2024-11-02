package com.pcplanet.controller;

import com.pcplanet.dto.ProductDTO;
import com.pcplanet.entity.Product;
import com.pcplanet.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/all/{productId}")
    public Product getProductDetails(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    @PostMapping("/save")
    public void saveProduct(@RequestBody ProductDTO productDTO) {
        productService.saveProduct(productDTO);
    }

    @DeleteMapping("/all/{productId}/delete")
    public void deleteProduct(@PathVariable int productId) {
        productService.deleteProductById(productId);
    }

    @PutMapping("/update")
    public ProductDTO updateProduct(@RequestBody ProductDTO product) {
        return productService.updateProduct(product);
    }
}
