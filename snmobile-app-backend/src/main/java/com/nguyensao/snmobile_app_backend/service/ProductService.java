package com.nguyensao.snmobile_app_backend.service;

import java.util.List;

import com.nguyensao.snmobile_app_backend.dto.ImageDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductStockDTO;
import com.nguyensao.snmobile_app_backend.entity.Product;

public interface ProductService {
    List<Product> index();

    Product store(ProductDTO productDTO);

    List<ProductStockDTO> getProductStocks();

    List<ImageDTO> getProductImagesById(Long productId);

    ProductStockDTO getByColorId(Long colorId);

}
