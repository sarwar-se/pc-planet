package com.pcplanet.service;

import com.pcplanet.dto.ProductDetailsDTO;
import com.pcplanet.dto.ProductInfoDTO;

import java.util.List;

public interface ProductService {
    List<ProductInfoDTO> getProducts();

    void saveProduct(ProductDetailsDTO productDetailsDTO);

    ProductDetailsDTO getProductDetailsById(int productId);

    void deleteProductById(int productId);

    ProductDetailsDTO updateProduct(ProductDetailsDTO product);
}
