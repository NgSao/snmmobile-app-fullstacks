package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.entity.Category;
import com.nguyensao.snmobile_app_backend.repository.CategoryRepository;
import com.nguyensao.snmobile_app_backend.service.CategoryService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> index() {
        return categoryRepository.findAll();

    }

    @Override
    public Category show(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category store(Category category) {
        return categoryRepository.save(category);
    }

}
