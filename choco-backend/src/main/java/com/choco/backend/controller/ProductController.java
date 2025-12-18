package com.choco.backend.controller;

import com.choco.backend.model.Product;
import com.choco.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Create
    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
        try {
            Product createdProduct = productService.createProduct(product);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product created successfully");
            response.put("product", createdProduct);
            response.put("status", "success");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return errorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Read All
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = productService.getAllProducts();

        Map<String, Object> response = new HashMap<>();
        response.put("products", products);
        response.put("count", products.size());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @Valid @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Product updated successfully");
            response.put("product", updatedProduct);
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Product deleted successfully");
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Filter by Category
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);

        Map<String, Object> response = new HashMap<>();
        response.put("category", category);
        response.put("products", products);
        response.put("count", products.size());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    // Search
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);

        Map<String, Object> response = new HashMap<>();
        response.put("keyword", keyword);
        response.put("products", products);
        response.put("count", products.size());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    // Helper method for error responses
    private ResponseEntity<Map<String, String>> errorResponse(String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("status", "error");
        return ResponseEntity.status(status).body(error);
    }
}