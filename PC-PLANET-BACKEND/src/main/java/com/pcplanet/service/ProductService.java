package com.pcplanet.service;

import com.pcplanet.dto.ProductDTO;
import com.pcplanet.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();

    void saveProduct(ProductDTO productDTO);

    Product getProductById(int productId);

    void deleteProductById(int productId);

    ProductDTO updateProduct(ProductDTO product);
}
