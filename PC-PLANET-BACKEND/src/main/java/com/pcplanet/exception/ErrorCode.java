package com.pcplanet.exception;

public enum ErrorCode {
    NOT_FOUND(404),
    ACCESS_DENIED(403),
    PRODUCT_NOT_FOUND(4011),
    NO_PRODUCT_ID_PROVIDED(4012),
    INTERNAL_SERVER_ERROR(999);

    public final int value;

    ErrorCode(int value) {
        this.value = value;
    }
}
