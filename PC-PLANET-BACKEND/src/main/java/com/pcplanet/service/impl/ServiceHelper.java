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
}
