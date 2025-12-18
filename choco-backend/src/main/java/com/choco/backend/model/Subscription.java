package com.choco.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String subscriptionType; // MONTHLY, QUARTERLY, YEARLY

    @Column(nullable = false)
    private Double price;

    private Integer chocolateBarsPerMonth;

    private String preferences; // JSON string or comma-separated

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, PAUSED, CANCELLED

    private LocalDateTime startDate;

    private LocalDateTime nextDeliveryDate;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        startDate = LocalDateTime.now();
        nextDeliveryDate = LocalDateTime.now().plusMonths(1);
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}