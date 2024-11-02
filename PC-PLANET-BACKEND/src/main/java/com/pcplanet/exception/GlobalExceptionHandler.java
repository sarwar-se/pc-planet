package com.pcplanet.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    private final ErrorCodeService errorCodeService;

    public GlobalExceptionHandler(ErrorCodeService errorCodeService) {
        this.errorCodeService = errorCodeService;
    }

    @ExceptionHandler
    public ResponseEntity<OperationalResult> handleServiceException(ServiceException exception) {
        return new ResponseEntity<>(errorCodeService.getOperationalResult(exception), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleConstraintViolationException(
            ConstraintViolationException ex, WebRequest request) {

        Map<String, Object> response = new HashMap<>();
        response.put("code", HttpStatus.BAD_REQUEST.value());

        /* Collect violation messages */
        Map<String, String> violations = ex.getConstraintViolations()
                .stream()
                .collect(Collectors.toMap(violation -> violation.getPropertyPath().toString(),
                        ConstraintViolation::getMessage, (errorMsg1, errorMsg2) -> errorMsg1 + ";" + errorMsg2));

        response.put("message", violations.toString());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleRequestNotReadableException(HttpMessageNotReadableException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not convert request body!");
    }

    @ExceptionHandler
    public ResponseEntity<String> handleMethodNotFoundException(HttpRequestMethodNotSupportedException exception) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("Requested method is not allowed");
    }

    @ExceptionHandler
    public ResponseEntity<String> handleInvalidDataException(MethodArgumentNotValidException e) {

        List<String> errorDetails = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        return new ResponseEntity<>(errorDetails.get(0), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<String> handlePermissionException(AccessDeniedException exception) {
        log.error("FORBIDDEN EXCEPTION MESSAGE {}", exception.getMessage(), exception);
        String key = "error." + ErrorCode.ACCESS_DENIED.name();
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorCodeService.getMessage(key));
    }

//    @ExceptionHandler
//    public ResponseEntity<OperationalResult> handleAllOtherException(Exception exception) {
//        log.error("GENERIC EXCEPTION",exception);
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(errorCodeService.getOperationalResult(new ServiceException(ErrorCode.INTERNAL_SERVER_ERROR)));
//    }

    @ExceptionHandler
    public ResponseEntity<String> handleRequiredParameterException(MissingServletRequestParameterException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Request parameter [%s] is required!".formatted(exception.getParameterName()));
    }
}
