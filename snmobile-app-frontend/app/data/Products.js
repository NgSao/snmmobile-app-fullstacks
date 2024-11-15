const Products = [
    {
        id: 1,
        category_id: 1,
        brand_id: 1,
        brandImage: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png',
        name: 'iPhone 11',
        discount: 10,
        status: null,
        rating: 0,
        images: [
            { id: 1, product_id: 1, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/230522042411-z4366856811574-f9b0bfeeb3dea70c38272e4da71d7227.jpg' },
            { id: 2, product_id: 1, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/210510021927-62831.jpg' },
            { id: 3, product_id: 1, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/210510021925-6283.jpg' },
            { id: 4, product_id: 1, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/210510021928-6283.jpg' },
        ],
        stocks: [
            {
                id: 1,
                product_id: 1,
                size: "128GB",
                price: '9690000',
                colos: [
                    {
                        id: 1,
                        stock_id: 1,
                        color: "Đen",
                        quantity: 10,
                        image: [
                            { id: 5, product_id: 1, color_id: 1, imageUrl: 'https://minhtuanmobile.com/uploads/products/230522042411-z4366856811574-f9b0bfeeb3dea70c38272e4da71d7227.jpg' }
                        ]
                    },
                    {
                        id: 2,
                        stock_id: 1,
                        color: "Trắng",
                        quantity: 10,
                        image: [
                            { id: 6, product_id: 1, color_id: 2, imageUrl: 'https://minhtuanmobile.com/uploads/products/230522042348-thiet-ke-chua-co-ten-2023-05-22t161529-447.png' }
                        ]
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        category_id: 1,
        brand_id: 1,
        brandImage: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png',
        name: 'iPhone 13',
        discount: 20,
        status: "Hot",
        rating: 5,
        images: [
            { id: 7, product_id: 2, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/210916114252-iphone-13-04.jpg' },
            { id: 8, product_id: 2, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240527023837-iphone-13-128gb.jpg' },
            { id: 9, product_id: 2, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240527023841-iphone-13-128gb.jpg' },
            { id: 10, product_id: 2, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240527023843-iphone-13-128gb.jpg' },
        ],
        stocks: [
            {
                id: 2,
                product_id: 2,
                size: "128GB",
                price: '13490000',
                colos: [
                    {
                        id: 3,
                        stock_id: 2,
                        color: "Đen",
                        quantity: 10,
                        image: [
                            { id: 11, product_id: 2, color_id: 3, imageUrl: 'https://minhtuanmobile.com/uploads/products/230522042411-z4366856811574-f9b0bfeeb3dea70c38272e4da71d7227.jpg' }
                        ]
                    },
                    {
                        id: 4,
                        stock_id: 2,
                        color: "Trắng",
                        quantity: 10,
                        image: [
                            { id: 12, product_id: 2, color_id: 4, imageUrl: 'https://minhtuanmobile.com/uploads/products/230522042348-thiet-ke-chua-co-ten-2023-05-22t161529-447.png' }
                        ]
                    },
                ]
            },
            {
                id: 3,
                product_id: 2,
                size: "248GB",
                price: '13590000',
                colos: [
                    {
                        id: 5,
                        stock_id: 3,
                        color: "Xanh Rừng Thông",
                        quantity: 10,
                        image: [
                            { id: 13, product_id: 2, color_id: 5, imageUrl: 'https://minhtuanmobile.com/uploads/products/220510023410-iphone-13-green-select-220309102417-220309102417-thumb.jpg' }
                        ]
                    },
                    {
                        id: 6,
                        stock_id: 3,
                        color: "Hồng",
                        quantity: 10,
                        image: [
                            { id: 14, product_id: 2, color_id: 6, imageUrl: 'https://minhtuanmobile.com/uploads/products/210916114155-iphone-13-02.jpg' }
                        ]
                    },
                ]
            }
        ]
    },
    // {
    //     id: 3,
    //     category_id: 2,
    //     brand_id: 2,
    //     brandImage: null,
    //     name: 'Samsung Galaxy Z Flip6',
    //     discount: 15,
    //     status: "Mới",
    //     rating: 5,
    //     images: [
    //         { id: 15, product_id: 3, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240914025511-samsung-galaxy-z-flip6-gray.png' },
    //         { id: 16, product_id: 3, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240716032352-sm-f741blbaxxv.png' },
    //         { id: 17, product_id: 3, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240716032353-sm-f741blbaxxv.png' },
    //     ],
    //     stocks: [
    //         {
    //             id: 4,
    //             product_id: 3,
    //             size: "128GB",
    //             price: '22990000',
    //             colos: [
    //                 {
    //                     id: 7,
    //                     stock_id: 4,
    //                     color: "Silver",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 18, product_id: 3, color_id: 7, imageUrl: 'https://minhtuanmobile.com/uploads/products/240914025511-samsung-galaxy-z-flip6-gray.png' }
    //                     ]
    //                 },
    //                 {
    //                     id: 8,
    //                     stock_id: 4,
    //                     color: "Light Green",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 19, product_id: 3, color_id: 8, imageUrl: 'https://minhtuanmobile.com/uploads/products/240914025503-samsung-galaxy-z-flip6-green.png' }
    //                     ]
    //                 },
    //             ]
    //         },
    //         {
    //             id: 5,
    //             product_id: 3,
    //             size: "256GB",
    //             price: '23990000',
    //             colos: [
    //                 {
    //                     id: 9,
    //                     stock_id: 5,
    //                     color: "Yellow",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 20, product_id: 3, color_id: 9, imageUrl: 'https://minhtuanmobile.com/uploads/products/220510023410-iphone-13-green-select-220309102417-220309102417-thumb.jpg' }
    //                     ]
    //                 },
    //                 {
    //                     id: 10,
    //                     stock_id: 5,
    //                     color: "Blue",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 21, product_id: 3, color_id: 10, imageUrl: 'https://minhtuanmobile.com/uploads/products/samsung-galaxy-z-flip6-blue-240914025445.png' }
    //                     ]
    //                 },
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: 4,
    //     category_id: 2,
    //     brand_id: 2,
    //     brandImage: null,
    //     name: 'Samsung Galaxy S24 FE ',
    //     discount: 5,
    //     status: null,
    //     rating: 5,
    //     images: [
    //         { id: 22, product_id: 4, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240427042821-samsung-galaxy-s24-5g-plus-den-minh-tuan-mobile.png' },
    //         { id: 23, product_id: 4, color_id: null, imageUrl: 'https://minhtuanmobile.com/uploads/products/240427042821-samsung-galaxy-s24-5g-plus-den-minh-tuan-mobile.png' },
    //     ],
    //     stocks: [
    //         {
    //             id: 6,
    //             product_id: 4,
    //             size: "128GB",
    //             price: '17990000',
    //             colos: [
    //                 {
    //                     id: 11,
    //                     stock_id: 6,
    //                     color: "Đen",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 24, product_id: 4, color_id: 11, imageUrl: 'https://minhtuanmobile.com/uploads/products/samsung-galaxy-s24-5g-plus-xam-minh-tuan-mobile-240427042742.png' }
    //                     ]
    //                 },
    //                 {
    //                     id: 12,
    //                     stock_id: 6,
    //                     color: "Xanh",
    //                     quantity: 10,
    //                     image: [
    //                         { id: 25, product_id: 4, color_id: 12, imageUrl: 'https://minhtuanmobile.com/uploads/products/240427042821-samsung-galaxy-s24-5g-plus-den-minh-tuan-mobile.png' }
    //                     ]
    //                 },
    //             ]
    //         }
    //     ]
    // },
];

export default Products;
// Csdl chưa tối ưu
// const Products = [
//     {
//         // Trường hợp 1 đủ tất cả
//         id: 1,
//         category_id: 1,
//         brand_id: 1,
//         name: 'iPhone 11',
//         discount: 10,
//         hot: 'Hot',//Hot thoai :()
//         rating: 0,
//         // Ảnh mà Chính hoặc phụ kiện kèm + qh: 1 - nhiều
//         images: [
//             {
//                 id: 1,
//                 product_id: 1,
//                 color_id: null, //ảnh chính khi xét color_id==null là hắn
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             },
//             {
//                 id: 2,
//                 product_id: 1,
//                 color_id: null,//ảnh chính khi xét color_id==null là hắn tt
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             }
//         ],
//         // Kho của sp đấy: qh: 1 - nhiều
//         stocks: [
//             {
//                 id: 1,
//                 prdocut_id: 1,
//                 size: "24GB",
//                 //1 size có nhiều màu: qh: 1 - nhiều
//                 colos: [
//                     {
//                         id: 1,
//                         stock_id: 1,
//                         color: "Xanh",
//                         quantity: 10,
//                         price: '23290000', //giá của mỗi màu
//                         image: [ //quan hệ 1 với 1
//                             {
//                                 id: 3,
//                                 product_id: 1,
//                                 color_id: 1,
//                                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-blue-minh-tuan-mobile-231215085234-231215085234_thumb.png',
//                             }
//                         ]
//                     },
//                     {
//                         id: 2,
//                         stock_id: 1,
//                         color: "Hồng",
//                         quantity: 10,
//                         price: '23890000',
//                         image: [
//                             {
//                                 id: 4,
//                                 product_id: 1,
//                                 color_id: 2,
//                                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-blue-minh-tuan-mobile-231215085234-231215085234_thumb.png',
//                             }
//                         ]
//                     },
//                 ]
//             },
// // TỔNG KẾT
// //Tên: product.name
// //Giá: product.price
// //Hình ảnh chính: product.image[0].imageUrl
// //Màu: product.stock.colos[0].color
// //Ảnh của màu: product.stock.colos[0].image[0]
// //Số lượng: product.stock.colos[0].quantity
// //Giá màu: product.stock.colos[0].price



//             {
//                 id: 2,
//                 prdocut_id: 1,
//                 size: "126GB",
//                 colos: [
//                     {
//                         id: 1,
//                         stock_id: 1,
//                         color: "Xanh",
//                         quantity: 10,
//                         price: 23290000,
//                         image: [
//                             {
//                                 id: 1,
//                                 product_id: 1,
//                                 color_id: 1,
//                                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-blue-minh-tuan-mobile-231215085234-231215085234_thumb.png',
//                             }
//                         ]
//                     }

//                 ]
//             },
//         ]
//     },
//     {
//         id: 2,
//         category_id: 2,
//         name: 'SamSung Galaxy',
//         imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//         resellerUrl: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png',
//         hot: 'Mới',
//         discount: 28,

//         rating: 2,
//         images: [
//             {
//                 id: 5,
//                 product_id: 1,
//                 color_id: null,
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             },
//             {
//                 id: 6,
//                 color_id: null,
//                 product_id: 1,
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             }
//         ],
//         stocks: [
//             {
//                 id: 3,
//                 prdocut_id: 1,
//                 size: 'null',
//                 colos: [
//                     {
//                         id: 8,
//                         stock_id: 1,
//                         color: "Xanh",
//                         quantity: 10,
//                         price: 23290000,
//                         discount: 15,
//                         image: [
//                             {
//                                 id: 1,
//                                 product_id: 2,
//                                 color_id: 8,
//                                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-blue-minh-tuan-mobile-231215085234-231215085234_thumb.png',
//                             }
//                         ]
//                     }
//                 ]
//             },
//         ]
//     },
//     {
//         id: 3,
//         category_id: 2,
//         name: 'SamSung Galaxy',
//         imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//         resellerUrl: 'https://minhtuanmobile.com/assets/front/img/apple-authorized-reseller.png',
//         hot: null,
//         rating: 2,
//         discount: 28,
//         images: [
//             {
//                 id: 5,
//                 product_id: 1,
//                 color_id: null,
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             },
//             {
//                 id: 6,
//                 color_id: null,
//                 product_id: 1,
//                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-black-minh-tuan-mobile-231215085417-231215085417_thumb.png',
//             }
//         ],
//         stocks: [
//             {
//                 id: 3,
//                 prdocut_id: 1,
//                 size: 'null',
//                 colos: [
//                     {
//                         id: 8,
//                         stock_id: 1,
//                         color: "Xanh",
//                         quantity: 10,
//                         price: 23290000,
//                         discount: 15,
//                         image: [
//                             {
//                                 id: 1,
//                                 product_id: 2,
//                                 color_id: 8,
//                                 imageUrl: 'https://minhtuanmobile.com/uploads/products/iphone-15-blue-minh-tuan-mobile-231215085234-231215085234_thumb.png',
//                             }
//                         ]
//                     }
//                 ]
//             },
//         ]
//     },

// ];

// export default Products;
