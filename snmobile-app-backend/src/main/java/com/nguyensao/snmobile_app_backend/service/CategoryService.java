package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.entity.Category;

public interface CategoryService {
    List<Category> index();

    Category store(Category category);

    Category show(Long id);
}
