package com.nguyensao.snmobile_app_backend.utils;

import java.text.DecimalFormat;

public class CurrencyFormatter {
    public static String formatAmount(String amountString) {
        try {
            double amount = Double.parseDouble(amountString);
            DecimalFormat formatter = new DecimalFormat("#,###");
            return formatter.format(amount) + " VNĐ";
        } catch (NumberFormatException e) {
            return "Invalid amount";
        }
    }
}
