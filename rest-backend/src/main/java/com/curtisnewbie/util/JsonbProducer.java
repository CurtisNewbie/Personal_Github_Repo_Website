package com.curtisnewbie.util;

import javax.enterprise.inject.Produces;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Producer of Jsonb Object.
 * </p>
 */
public class JsonbProducer {

    @Produces
    public Jsonb produceJsonb() {
        return JsonbBuilder.create();
    }

}