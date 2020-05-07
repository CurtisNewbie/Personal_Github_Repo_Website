package com.curtisnewbie.util;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.json.bind.serializer.*;
import javax.json.stream.JsonParser;

import com.curtisnewbie.persistence.Language;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Deserializer of {@code List<Language>}
 * </p>
 */
public class LanguagesDeserializer implements JsonbDeserializer<List<Language>> {

    @Override
    public List<Language> deserialize(JsonParser parser, DeserializationContext ctx, Type rtType) {
        List<Language> langs = null;
        while (parser.hasNext()) {
            var event = parser.next();
            if (event == JsonParser.Event.KEY_NAME) {
                if (langs == null)
                    langs = new ArrayList<>();

                String name = parser.getString();
                parser.next();
                Long loc = parser.getLong();
                var l = new Language();
                l.setName(name);
                l.setLoc(loc);
                langs.add(l);
            }
        }
        return langs;
    }

}