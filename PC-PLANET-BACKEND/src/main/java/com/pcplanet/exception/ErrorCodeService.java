package com.pcplanet.exception;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class ErrorCodeService {

    private final MessageSource messageSource;

    public ErrorCodeService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String getMessage(String key, Object... parameters) {
        return messageSource.getMessage(key, parameters, key, LocaleContextHolder.getLocale());
    }

    public OperationalResult getOperationalResult(ServiceException exception) {
        ErrorCode errorCode = exception.errorCode;
        String key = "error." + errorCode.name();
        var message = getMessage(key);
        return new OperationalResult(errorCode.value, message);
    }
}