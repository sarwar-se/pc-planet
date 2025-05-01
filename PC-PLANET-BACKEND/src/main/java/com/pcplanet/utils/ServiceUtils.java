package com.pcplanet.utils;

import com.pcplanet.exception.ErrorCode;
import com.pcplanet.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@Slf4j
public class ServiceUtils {

    public static <TFrom, TTo> List<TTo> simpleMap(List<TFrom> items, Function<TFrom, TTo> mapper) {
        var results = new ArrayList<TTo>();
        for (TFrom item : items) {
            results.add(mapper.apply(item));
        }
        return results;
    }

    public static void requireNotNull(Object object) {
        requireNotNull(object, ErrorCode.PARAMETER_REQUIRED);
    }

    public static void requireNotNull(Object object, ErrorCode code) {
        if (object == null) {
            throw new ServiceException(code);
        }
    }
}
