package pers.simon.orderman.utils;

import java.util.UUID;

public class MyUuid {
    public static String getUuid() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        str = str.replace("-", "");
        return str;
    }

    public static String getUuidFileName(String fileName) {
        String[] tmp = fileName.split("\\.");
        String res = getUuid() + "." + tmp[tmp.length - 1];
        return res;
    }

    public static int stringToInt(String str) {
        try {
            int a = Integer.parseInt(str);
            return a;
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
