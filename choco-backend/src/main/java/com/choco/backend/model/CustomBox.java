package com.choco.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "custom_boxes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomBox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String boxName;

    private String occasion; // Birthday, Anniversary, Gift, etc.

    private String message;

    @Column(nullable = false)
    private Integer totalItems;

    @Column(nullable = false)
    private Double totalPrice;

    @Column(nullable = false)
    private String status = "DRAFT"; // DRAFT, ORDERED, SHIPPED, DELIVERED

    @ElementCollection
    @CollectionTable(name = "box_items", joinColumns = @JoinColumn(name = "box_id"))
    private List<BoxItem> items = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Inner class for box items
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoxItem {
        private Long productId;
        private String productName;
        private Integer quantity;
        private Double pricePerItem;
    }
}