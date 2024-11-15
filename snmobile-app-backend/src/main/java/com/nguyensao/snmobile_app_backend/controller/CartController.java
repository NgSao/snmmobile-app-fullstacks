package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.dto.CartDetailDTO;
import com.nguyensao.snmobile_app_backend.entity.Cart;
import com.nguyensao.snmobile_app_backend.entity.CartDetail;
import com.nguyensao.snmobile_app_backend.service.CartService;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Cart>> getCartAll() {
        List<Cart> carts = cartService.getCartAll();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartDetail>> getCartDetailByUserId(@PathVariable Long cartId) {
        List<CartDetail> cartDetail = cartService.getCartDetailsByCartId(cartId);
        return ResponseEntity.ok(cartDetail);
    }

    @PostMapping
    public ResponseEntity<CartDetail> createCartDetail(@RequestBody CartDetailDTO cartDetailDTO) {
        CartDetail cartDetail = cartService.createCartDetail(cartDetailDTO);
        return ResponseEntity.ok(cartDetail);
    }

    @PostMapping("/remove")
    public ResponseEntity<CartDetail> removeCartDetail(@RequestBody CartDetailDTO cartDetailDTO) {
        CartDetail cartDetail = cartService.removeCartDetail(cartDetailDTO);
        return ResponseEntity.ok(cartDetail);
    }

    // @GetMapping("/remove/{id}")
    // public ResponseEntity<CartDetail> removeCartDetail(@PathVariable Long id) {
    // CartDetail cartDetail = cartService.removeCartDetail(id);
    // return ResponseEntity.ok(cartDetail);
    // }
    @PostMapping("/delete")
    public ResponseEntity<CartDetail> deleteCartDetail(@RequestBody CartDetailDTO cartDetailDTO) {
        CartDetail cartDetail = cartService.deleteCartDetail(cartDetailDTO);
        return ResponseEntity.ok(cartDetail);
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<CartDetail> deleteCartDetail(@PathVariable Long id) {
    // CartDetail cartDetail = cartService.deleteCartDetail(id);
    // return ResponseEntity.ok(cartDetail);
    // }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<List<CartDetail>> clearByUserId(@PathVariable Long userId) {
        List<CartDetail> cartDetail = cartService.clearByUserId(userId);
        return ResponseEntity.ok(cartDetail);
    }

    // @DeleteMapping("/{cartId}")
    // public ResponseEntity<Void> deleteCart(@PathVariable Long cartId) {
    // cartService.deleteCart(cartId);
    // return ResponseEntity.noContent().build();
    // }

    // @PutMapping("/{cartId}/details/{cartDetailId}")
    // public ResponseEntity<Cart> updateQuantity(
    // @PathVariable Long cartId,
    // @PathVariable Long cartDetailId,
    // @RequestParam Integer quantity) {
    // Cart updatedCart = cartService.updateQuantity(cartId, cartDetailId,
    // quantity);
    // if (updatedCart != null) {
    // return ResponseEntity.ok(updatedCart);
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    // Khai báo lỗi
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // Khai báo đã có
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
