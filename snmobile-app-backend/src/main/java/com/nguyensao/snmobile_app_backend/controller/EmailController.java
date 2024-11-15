package com.nguyensao.snmobile_app_backend.controller;

import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyensao.snmobile_app_backend.model.OrderConfirmationRequest;
import com.nguyensao.snmobile_app_backend.model.OrderDetailRequest;
import com.nguyensao.snmobile_app_backend.utils.CurrencyFormatter;

import java.time.LocalDate;

@RequestMapping("/api/email")
@RestController
public class EmailController {

    private final JavaMailSender mailSender;

    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @GetMapping
    public String sendEmail() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("nguyenminhco2964@gmail.com");
            message.setTo("nguyensaovn2019@gmail.com");
            message.setSubject("Hello Sao nè");
            message.setText("TSSsss");

            mailSender.send(message);
            return "success!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @PostMapping("/success")
    public String sendOrderConfirmation(@RequestBody OrderConfirmationRequest orderRequest) {
        try {
            StringBuilder orderDetailsHtml = new StringBuilder();
            orderDetailsHtml.append("<h3 style='color: #d70018;'>THÔNG TIN SẢN PHẨM</h3>");
            double totalAmount = 0;
            int totalQuantity = 0;
            for (OrderDetailRequest detail : orderRequest.getOrderDetailRequests()) {
                double price = Double.parseDouble(detail.getPrice());
                double productTotal = detail.getQuantity() * price;
                totalAmount += productTotal;

                int quantity = detail.getQuantity();
                totalQuantity += quantity;

                orderDetailsHtml.append(
                        "<div class='order-item' style='display: flex; border-bottom: 1px solid #ccc; padding: 10px 0;'>")
                        .append("<img src='")
                        .append(detail.getImageUrl())
                        .append("' alt='Sản phẩm' style='width: 100px; height: 100px; margin-right: 15px;'/>")
                        .append("<div class='item-details' style='flex: 1;'>")
                        .append("<p style='font-weight: bold;'>")
                        .append(detail.getProductName())
                        .append("</p>")
                        .append("<p>Số lượng: <span>")
                        .append(detail.getQuantity())
                        .append("</span></p>")
                        .append("<p>Giá: <span>")
                        .append(CurrencyFormatter.formatAmount(String.valueOf(detail.getPrice())))
                        .append("</span></p>")
                        .append("</div></div>");
            }
            LocalDate estimatedDeliveryDate = LocalDate.now().plusDays(3);
            double totalRequestAmount = Double.parseDouble(orderRequest.getTotal());
            double shippingFee = totalRequestAmount - totalAmount;
            String emailContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; background-color: #f9f9f9; line-height: 1.6; margin: 0; padding: 20px; }"
                    +
                    ".header { background-color: #d70018; padding: 10px; text-align: center; }" +
                    ".container { max-width: 800px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 20px; }"
                    +
                    ".order-info { margin-bottom: 20px; }" +
                    ".order-title { display: flex; justify-content: space-between; align-items: center; }" +
                    ".order-status { color: #198754; }" +
                    ".order-date { margin: 10px 0; color: #555; }" +
                    ".order-details { margin-top: 20px; }" +
                    ".order-item { display: flex; border-bottom: 1px solid #ccc; padding: 10px 0; }" +
                    ".product-image { width: 100px; height: 100px; margin-right: 15px; }" +
                    ".item-details { flex: 1; }" +
                    ".item-name { font-weight: bold; }" +
                    ".order-footer { margin-top: 20px; }" +
                    ".footer-item { display: flex; justify-content: space-between; padding: 5px 0; }" +
                    ".total-order { color: #d70018; font-weight: bold; }" +
                    ".fotterne { background-color: #d70018;  padding: 10px; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div style='max-width:800px;margin: auto;'>" +
                    "<div class='header'>" +
                    "<h1 style='color: #FFF'>SN <span style='color:#000'>Mobile</span></h1>" +
                    "</div>" +
                    "<div class='container'>" +
                    "<p>Kính chào quý khách,<br>SN Mobile gửi đến quý khách hóa đơn điện tử cho đơn hàng " +
                    orderRequest.getOrderCode() +
                    ". Quý khách vui lòng kiểm tra hóa đơn VAT bằng cách xem và tải file theo thông tin chi tiết dưới đây.</p>";

            emailContent += "<div style='margin-bottom: 30px;'>" +
                    "<div style='border-bottom: 3px solid #d70018;'>" +
                    "<h3 style='color: #d70018;'>THÔNG TIN KHÁCH HÀNG</h3>" +
                    "</div>" +
                    "<p>Người nhận: <span>" + orderRequest.getCustomerName() + "</span></p>" +
                    "<p>Số điện thoại: <span>" + orderRequest.getCustomerPhone() + "</span></p>" +
                    "<p>Email: <span>" + orderRequest.getUserEmail() + "</span></p>";

            if (orderRequest.getShopName() != null && !orderRequest.getShopName().isEmpty()) {
                emailContent += "<p>Nhận tại cửa hàng: <span>" + orderRequest.getShopName() + "</span></p>";
            } else {
                emailContent += "<p>Địa chỉ nhận hàng: <span>" + orderRequest.getCustomerAddress() + "</span></p>";
                if (orderRequest.getOtherName() != null && !orderRequest.getOtherName().isEmpty()) {
                    emailContent += "<p>Người nhận hộ: <span>" + orderRequest.getOtherName() + "</span></p>";
                    emailContent += "<p>Số điện thoại người nhận hộ: <span>" + orderRequest.getOtherPhone()
                            + "</span></p>";
                }
            }
            emailContent += "</div>";

            emailContent += "<div class='order-info'>" +
                    "<div style='border-bottom: 3px solid #d70018;''>" +
                    "<h3 style='color: #d70018;'>THÔNG TIN ĐƠN HÀNG " + orderRequest.getOrderCode() + "</h3>" +
                    "</div>" +
                    "<div>" +
                    "<div class='order-title'>" +
                    "<p>Ngày đặt hàng: <span>" + LocalDate.now() + "</span></p>" +
                    "<span class='order-status'>Chờ xác nhận</span>" +
                    "</div>" +
                    "<p class='estimated-delivery'>Dự kiến giao: <span>" + estimatedDeliveryDate + "</span></p>" +
                    "</div>" +
                    "<div class='order-details'>" +
                    orderDetailsHtml.toString() +
                    "</div>" +
                    "<div class='order-footer'>" +
                    "<div class='footer-item'>" +
                    "<p>Tổng đơn hàng:</p>" +
                    "<p>" + CurrencyFormatter.formatAmount(String.valueOf(totalAmount)) + "</p>" +
                    "</div>" +
                    "<div class='footer-item'>" +
                    "<p>Số lượng:</p>" +
                    "<p>" + totalQuantity + "</p>" +
                    "</div>" +
                    "<div class='footer-item'>" +
                    "<p>Phí vận chuyển:</p>" +
                    "<p >" + CurrencyFormatter.formatAmount(String.valueOf(shippingFee)) + "</p>" +
                    "</div>" +
                    "<div class='footer-item'>" +
                    "<p>Tổng tiền đơn hàng:</p>" +
                    "<p class='total-order'>" + CurrencyFormatter.formatAmount(String.valueOf(orderRequest.getTotal()))
                    + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div style='text-align: center; margin-top: 40px'>" +
                    "<p>Chúc bạn luôn có những trải nghiệm tuyệt vời khi mua sắm tại SN Mobile.</p>" +
                    "<p>Tổng đài hỗ trợ miễn phí: <span style='color:#d70018;'>0392445255</span></p>" +
                    "<p>SN Mobile cảm ơn quý khách.</p>" +
                    "</div>" +
                    "</div>" +
                    " <div class='fotterne'></div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("nguyenminhco2964@gmail.com");
            helper.setTo(orderRequest.getUserEmail());
            helper.setSubject("Xác nhận đơn hàng #" + orderRequest.getOrderCode());
            helper.setText(emailContent, true); // true to send HTML email

            mailSender.send(message);
            return "Email xác nhận đã được gửi thành công!";
        } catch (Exception e) {
            return "Có lỗi xảy ra: " + e.getMessage();
        }
    }

}
