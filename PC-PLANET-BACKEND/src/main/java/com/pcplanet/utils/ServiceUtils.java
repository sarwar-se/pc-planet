package com.pcplanet.utils;

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
}
