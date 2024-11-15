package com.nguyensao.snmobile_app_backend.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.otp.SpeedSMSAPI;

@RestController
@RequestMapping("/api/otp")
public class OTPController {

    /**
     * Endpoint gửi mã OTP đến số điện thoại để xác thực người dùng
     * 
     * @param phoneNumber Số điện thoại của người nhận OTP
     * @return Thông báo kết quả gửi OTP
     */
    // @GetMapping
    // public String sendOTP(@RequestParam String phoneNumber) {
    // // Tạo mã OTP ngẫu nhiên 6 chữ số
    // String otp = generateOTP();

    // // Nội dung tin nhắn chứa mã OTP
    // String message = "Mã xác thực của bạn là: " + otp;

    // // Khởi tạo SpeedSMSAPI với mã truy cập của bạn
    // SpeedSMSAPI api = new SpeedSMSAPI("_x2aRKdbdKlh7hosj43vWGBuemjY-7w6");

    // try {
    // String result = api.sendSMS(phoneNumber, message, 2, "b10dd7b9ee960337");
    // return "OTP đã được gửi thành công: " + result + ". Mã OTP của bạn là: " +
    // otp;
    // } catch (IOException e) {
    // e.printStackTrace();
    // return "Lỗi khi gửi OTP: " + e.getMessage();
    // }
    // }

    @PostMapping
    public Map<String, String> sendVerificationCode(@RequestBody Map<String, String> requestBody) {
        Map<String, String> response = new HashMap<>();

        String phoneNumber = requestBody.get("phoneNumber");
        String verificationCode = generateOTP();
        String phoneAdmin = "0392445255";
        String message = "Mã xác thực là: " + verificationCode + ". Vui lòng liên hệ " + phoneAdmin
                + " để được hổ trợ khi cần. Cảm ơn Quý khách đã lựa chọn SNMobile.";
        SpeedSMSAPI api = new SpeedSMSAPI("ElcqRDn1al60wbBj03rUNwCCJQ2Gcl7B");

        try {
            String result = api.sendSMS(phoneNumber, message, 2, "b10dd7b9ee960337");

            response.put("status", "success");
            response.put("verificationCode", verificationCode);
            response.put("result", result);
        } catch (IOException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }

    /**
     * Phương thức tạo mã OTP ngẫu nhiên gồm 6 chữ số
     * 
     * @return Mã OTP dưới dạng chuỗi
     */
    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Tạo số từ 100000 đến 999999
        return String.valueOf(otp);
    }
}
