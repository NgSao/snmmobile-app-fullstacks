package com.nguyensao.snmobile_app_backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nguyensao.snmobile_app_backend.dto.ImageDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductColorDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductDTO;
import com.nguyensao.snmobile_app_backend.dto.ProductStockDTO;
import com.nguyensao.snmobile_app_backend.entity.Brand;
import com.nguyensao.snmobile_app_backend.entity.Category;
import com.nguyensao.snmobile_app_backend.entity.Color;
import com.nguyensao.snmobile_app_backend.entity.Image;
import com.nguyensao.snmobile_app_backend.entity.Product;
import com.nguyensao.snmobile_app_backend.entity.Stock;
import com.nguyensao.snmobile_app_backend.repository.BrandRepository;
import com.nguyensao.snmobile_app_backend.repository.CategoryRepository;
import com.nguyensao.snmobile_app_backend.repository.ProductRepository;
import com.nguyensao.snmobile_app_backend.service.ProductService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    @Override
    public List<Product> index() {
        return productRepository.findAll();

    }

    @Override
    public Product store(ProductDTO productDTO) {

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category with ID " + productDTO.getCategoryId() + " not found"));

        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(
                        () -> new IllegalArgumentException("Brand with ID " + productDTO.getBrandId() + " not found"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setCategory(category);
        product.setBrand(brand);
        product.setDiscount(productDTO.getDiscount());
        product.setStatus(productDTO.getStatus());
        product.setRating(productDTO.getRating());

        List<Image> images = productDTO.getImages().stream()
                .map(imageDTO -> {
                    Image image = new Image();
                    image.setProduct(product);
                    image.setImageUrl(imageDTO.getImageUrl());
                    return image;
                })
                .collect(Collectors.toList());
        product.setImages(images);

        return productRepository.save(product);
    }

    @Override
    public List<ProductStockDTO> getProductStocks() {
        List<Product> products = productRepository.findAll();
        List<ProductStockDTO> productStockDTOs = new ArrayList<>();
        for (Product product : products) {
            for (Stock stock : product.getStocks()) {
                for (Color color : stock.getColors()) {
                    ProductStockDTO dto = new ProductStockDTO();
                    dto.setColorId(color.getId());
                    dto.setId(product.getId());
                    dto.setName(product.getName());
                    dto.setCategoryId(product.getCategory().getId());
                    dto.setBrandId(product.getBrand().getId());
                    dto.setDiscount(product.getDiscount());
                    dto.setStatus(product.getStatus());
                    dto.setRating(product.getRating());
                    dto.setStockId(stock.getId());
                    dto.setSize(stock.getSize());
                    dto.setPrice(stock.getPrice());
                    List<ProductColorDTO> colorDTOs = new ArrayList<>();
                    ProductColorDTO colorDTO = new ProductColorDTO();
                    colorDTO.setColor(color.getColor());
                    colorDTO.setQuantity(color.getQuantity());
                    colorDTO.setImageUrl(color.getImage().getImageUrl());
                    colorDTOs.add(colorDTO);
                    dto.setColors(colorDTOs);
                    productStockDTOs.add(dto);
                }
            }
        }
        return productStockDTOs;
    }

    @Override
    public List<ImageDTO> getProductImagesById(Long productId) {
        return productRepository.findById(productId)
                .map(product -> product.getImages().stream()
                        .map(image -> new ImageDTO(
                                image.getProduct().getId(),
                                image.getImageUrl(),
                                image.getColor() != null ? image.getColor().getId() : null))
                        .collect(Collectors.toList()))
                .orElse(null);
    }

    @Override
    public ProductStockDTO getByColorId(Long colorId) {
        List<Product> products = productRepository.findAll();
        ProductStockDTO productStockDTO = null;
        for (Product product : products) {
            for (Stock stock : product.getStocks()) {
                for (Color color : stock.getColors()) {
                    if (color.getId().equals(colorId)) {
                        productStockDTO = new ProductStockDTO();
                        productStockDTO.setColorId(color.getId());
                        productStockDTO.setId(product.getId());
                        productStockDTO.setName(product.getName());
                        productStockDTO.setCategoryId(product.getCategory().getId());
                        productStockDTO.setBrandId(product.getBrand().getId());
                        productStockDTO.setDiscount(product.getDiscount());
                        productStockDTO.setStatus(product.getStatus());
                        productStockDTO.setRating(product.getRating());
                        productStockDTO.setStockId(stock.getId());
                        productStockDTO.setSize(stock.getSize());
                        productStockDTO.setPrice(stock.getPrice());
                        List<ProductColorDTO> colorDTOs = new ArrayList<>();
                        ProductColorDTO colorDTO = new ProductColorDTO();
                        colorDTO.setColor(color.getColor());
                        colorDTO.setQuantity(color.getQuantity());
                        colorDTO.setImageUrl(color.getImage().getImageUrl());
                        colorDTOs.add(colorDTO);
                        productStockDTO.setColors(colorDTOs);

                        return productStockDTO;
                    }
                }
            }
        }

        return null;
    }

}
