package com.pcplanet.dto.param;

import com.pcplanet.enums.ProductStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductFilterParams {
    List<ProductStatus> statuses;
    List<String> brandNames;
    List<String> attributeValues;
    String categoryName;
    String subCategoryName;
    String brandName;
}
