package com.nguyensao.snmobile_app_backend.controller;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.config.ZalopayConfig;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/zalopay")
public class CallbackController {

    private Logger logger = Logger.getLogger(this.getClass().getName());
    private Mac HmacSHA256;

    public CallbackController() throws Exception {
        HmacSHA256 = Mac.getInstance("HmacSHA256");
        HmacSHA256.init(new SecretKeySpec(ZalopayConfig.config.get("key2").getBytes(), "HmacSHA256"));
    }

    @PostMapping("/callback")
    public String callback(@RequestBody String jsonStr) {
        JSONObject result = new JSONObject();

        try {
            JSONObject cbdata = new JSONObject(jsonStr);
            String dataStr = cbdata.getString("data");
            String reqMac = cbdata.getString("mac");

            byte[] hashBytes = HmacSHA256.doFinal(dataStr.getBytes());
            String mac = DatatypeConverter.printHexBinary(hashBytes).toLowerCase();
            System.out.println("mac nè MAC: " + mac);

            // Verify the callback's authenticity
            if (!reqMac.equals(mac)) {
                result.put("returncode", -1);
                result.put("returnmessage", "mac not equal");
            } else {
                // Successful payment, update order status
                JSONObject data = new JSONObject(dataStr);
                logger.info("update order's status = success where apptransid = " + data.getString("apptransid"));

                result.put("returncode", 1);
                result.put("returnmessage", "success");
            }
        } catch (Exception ex) {
            result.put("returncode", 0); // ZaloPay will retry the callback up to 3 times
            result.put("returnmessage", ex.getMessage());
        }

        return result.toString();
    }
}
