package com.pcplanet.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Slf4j
public class ImageUtils {
    private static final String DATE_FORMAT = "yyyy-MM-dd";

    private static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "").toLowerCase();
    }

    public static String saveImageFromBase64String(String base64Value, String baseDir, String path) {
        var formatter = new SimpleDateFormat(DATE_FORMAT);
        String currentDate = formatter.format(new Date());
        String relativePath = path + "/" + currentDate;
        String absolutePath = baseDir + relativePath;
        String imagePath = "";

        try {
            byte[] imageByte = Base64.getDecoder().decode(base64Value);
            File directory = new File(absolutePath);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            imagePath = "/" + generateUUID() + ".jpg";
            try (var os = new FileOutputStream(absolutePath + imagePath)) {
                os.write(imageByte);
            }
        } catch (Exception e) {
            log.error("Error saving images {}", e.getMessage());
        }

        return relativePath + imagePath;
    }
}
