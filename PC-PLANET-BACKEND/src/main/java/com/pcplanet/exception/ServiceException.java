package com.pcplanet.exception;

public class ServiceException extends RuntimeException {
    public final ErrorCode errorCode;

    public ServiceException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String toString() {
        return "%s(%d)".formatted(errorCode, errorCode.value);
    }
}
