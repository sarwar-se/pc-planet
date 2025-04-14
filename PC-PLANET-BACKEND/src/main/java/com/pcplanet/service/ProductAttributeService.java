package com.pcplanet.service;

import com.pcplanet.dto.productAttribute.CUProductAttributeDTO;

public interface ProductAttributeService {
    void saveProductAttribute(CUProductAttributeDTO attributeDTO);

    void deleteProductAttributeById(int id);
}
