package com.nguyensao.snmobile_app_backend.controller;

import com.nguyensao.snmobile_app_backend.entity.Category;
import com.nguyensao.snmobile_app_backend.service.CategoryService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> index() {
        List<Category> categories = categoryService.index();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> store(@RequestBody Category category) {
        Category savedCategory = categoryService.store(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping("/show/{id}")
    public ResponseEntity<Category> show(@PathVariable Long id) {
        Category categories = categoryService.show(id);
        if (categories == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categories);
    }

}
