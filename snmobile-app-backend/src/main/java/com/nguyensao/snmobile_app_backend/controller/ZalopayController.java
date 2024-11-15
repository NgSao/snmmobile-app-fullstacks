// package com.nguyensao.snmobile_app_backend.controller;

// import com.nguyensao.snmobile_app_backend.crypto.HMACUtil;
// import lombok.AllArgsConstructor;
// import org.apache.http.NameValuePair;
// import org.apache.http.client.entity.UrlEncodedFormEntity;
// import org.apache.http.client.methods.CloseableHttpResponse;
// import org.apache.http.client.methods.HttpPost;
// import org.apache.http.impl.client.CloseableHttpClient;
// import org.apache.http.impl.client.HttpClients;
// import org.apache.http.message.BasicNameValuePair;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import java.io.BufferedReader;
// import java.io.InputStreamReader;
// import java.text.SimpleDateFormat;
// import java.util.*;

// @RestController
// @RequestMapping("/api/zalopay")
// @AllArgsConstructor
// public class ZalopayController {

//     private static final Map<String, String> config = new HashMap<String, String>() {
//         {
//             put("app_id", "2554"); // Make sure this app_id is correct
//             put("key1", "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn"); // Check key1
//             put("key2", "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf"); // Check key2
//             put("endpoint", "https://sb-openapi.zalopay.vn/v2/create"); // Correct API endpoint
//         }
//     };

//     private static String getCurrentTimeString(String format) {
//         Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
//         SimpleDateFormat fmt = new SimpleDateFormat(format);
//         fmt.setCalendar(cal);
//         return fmt.format(cal.getTimeInMillis());
//     }

//     @PostMapping("/create-order")
//     public String createOrder(@RequestBody Map<String, Object> orderRequest) {
//         Random rand = new Random();
//         int randomId = rand.nextInt(1000000);

//         Object amount = orderRequest.get("amount");
//         if (amount == null) {
//             return "{\"error\": \"Amount is required\"}";
//         }
//         Map<String, Object> embedData = new HashMap<>();
//         Map<String, Object>[] items = new Map[] { new HashMap<>() };

//         Map<String, Object> order = new HashMap<>();
//         order.put("app_id", config.get("app_id"));
//         order.put("app_trans_id", getCurrentTimeString("yyMMdd") + "_" + randomId);
//         order.put("app_time", System.currentTimeMillis());
//         order.put("app_user", "user123"); // User information
//         order.put("amount", amount); // Amount to be paid
//         order.put("description", "Lazada - Payment for the order #" + randomId);
//         order.put("bank_code", "");
//         order.put("item", "[{}]");
//         order.put("embed_data", "{}");

//         String data = order.get("app_id") + "|" + order.get("app_trans_id") + "|" + order.get("app_user") + "|"
//                 + order.get("amount") + "|" + order.get("app_time") + "|" + order.get("embed_data") + "|"
//                 + order.get("item");
//         String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, config.get("key1"), data);
//         order.put("mac", mac);

//         System.out.println("Generated MAC: " + mac);

//         try (CloseableHttpClient client = HttpClients.createDefault()) {
//             HttpPost post = new HttpPost(config.get("endpoint"));

//             List<NameValuePair> params = new ArrayList<>();
//             for (Map.Entry<String, Object> entry : order.entrySet()) {
//                 params.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
//             }

//             post.setEntity(new UrlEncodedFormEntity(params));

//             try (CloseableHttpResponse response = client.execute(post)) {
//                 BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
//                 StringBuilder resultJsonStr = new StringBuilder();
//                 String line;
//                 while ((line = reader.readLine()) != null) {
//                     resultJsonStr.append(line);
//                 }

//                 System.out.println("Zalopay Response: " + resultJsonStr.toString());

//                 return resultJsonStr.toString();
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             return "{\"error\": \"Failed to create order: " + e.getMessage() + "\"}";
//         }
//     }
// }

// package com.nguyensao.snmobile_app_backend.controller;

// import lombok.AllArgsConstructor;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.nguyensao.snmobile_app_backend.service.ZaloPayService;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/zalopay")
// @AllArgsConstructor
// public class ZalopayController {

//     private final ZaloPayService zalopayService;

//     @PostMapping
//     public String createOrder(@RequestBody Map<String, Object> orderRequest) {
//         return zalopayService.createOrder(orderRequest);
//     }

// }

// package com.nguyensao.snmobile_app_backend.controller;

// import com.nguyensao.snmobile_app_backend.service.ZaloPayService;
// import lombok.AllArgsConstructor;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/zalopay")
// @AllArgsConstructor
// public class ZalopayController {

//     private final ZaloPayService zalopayService;

//     @PostMapping
//     public String createOrder(@RequestBody Map<String, Object> orderRequest) {
//         return zalopayService.createOrder(orderRequest);
//     }

// }
package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.service.ZaloPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/zalopay")
public class ZalopayController {

    @Autowired
    private ZaloPayService zaloPayService;

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody Map<String, Object> orderRequest) {
        try {
            String response = zaloPayService.createOrder(orderRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating payment: " + e.getMessage());
        }
    }

    @GetMapping("/order-status/{appTransId}")
    public ResponseEntity<String> getOrderStatus(@PathVariable String appTransId) {
        String response = zaloPayService.getOrderStatus(appTransId);
        return ResponseEntity.ok(response);
    }

}
