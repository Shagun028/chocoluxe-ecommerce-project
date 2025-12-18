package com.choco.backend.service;

import com.choco.backend.model.CustomBox;
import com.choco.backend.model.Product;
import com.choco.backend.model.User;
import com.choco.backend.repository.CustomBoxRepository;
import com.choco.backend.repository.ProductRepository;
import com.choco.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomBoxService {

    private final CustomBoxRepository customBoxRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CustomBox createCustomBox(CustomBox customBox, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Calculate total price
        double totalPrice = customBox.getItems().stream()
                .mapToDouble(item -> item.getPricePerItem() * item.getQuantity())
                .sum();

        customBox.setUser(user);
        customBox.setTotalPrice(totalPrice);
        customBox.setTotalItems(customBox.getItems().size());

        return customBoxRepository.save(customBox);
    }

    public List<CustomBox> getUserBoxes(Long userId) {
        return customBoxRepository.findByUserId(userId);
    }

    public CustomBox updateBoxStatus(Long id, String status) {
        CustomBox box = customBoxRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom box not found"));

        box.setStatus(status);
        return customBoxRepository.save(box);
    }

    public CustomBox addItemToBox(Long boxId, CustomBox.BoxItem item) {
        CustomBox box = customBoxRepository.findById(boxId)
                .orElseThrow(() -> new RuntimeException("Custom box not found"));

        // Verify product exists
        Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        item.setProductName(product.getName());
        item.setPricePerItem(product.getPrice());

        box.getItems().add(item);
        box.setTotalItems(box.getItems().size());
        box.setTotalPrice(calculateTotalPrice(box));

        return customBoxRepository.save(box);
    }

    private double calculateTotalPrice(CustomBox box) {
        return box.getItems().stream()
                .mapToDouble(item -> item.getPricePerItem() * item.getQuantity())
                .sum();
    }
}