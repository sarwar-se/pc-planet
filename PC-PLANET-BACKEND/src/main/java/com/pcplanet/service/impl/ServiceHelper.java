package com.pcplanet.service.impl;

import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
class ServiceHelper {
    static void categoryNullThrowException() {
        log.warn("Product category must be provided");
        throw new ServiceException(ErrorCode.NO_CATEGORY_SELECTED);
    }

    static void categoryNotFoundThrowException(int categoryId) {
        log.warn("Category not found with id: {}", categoryId);
        throw new ServiceException(ErrorCode.NO_CATEGORY_FOUND);
    }

    static void subCategoryNotFoundThrowException(int subCategoryId) {
        log.warn("Sub-category not found with id: {}", subCategoryId);
        throw new ServiceException(ErrorCode.NO_SUB_CATEGORY_FOUND);
    }
}
