package com.choco.backend.controller;

import com.choco.backend.model.Subscription;
import com.choco.backend.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createSubscription(
            @PathVariable Long userId,
            @Valid @RequestBody Subscription subscription) {
        try {
            Subscription created = subscriptionService.createSubscription(subscription, userId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Subscription created successfully");
            response.put("subscription", created);
            response.put("status", "success");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserSubscriptions(@PathVariable Long userId) {
        List<Subscription> subscriptions = subscriptionService.getUserSubscriptions(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("subscriptions", subscriptions);
        response.put("count", subscriptions.size());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubscription(
            @PathVariable Long id,
            @Valid @RequestBody Subscription subscriptionDetails) {
        try {
            Subscription updated = subscriptionService.updateSubscription(id, subscriptionDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Subscription updated successfully");
            response.put("subscription", updated);
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancelSubscription(@PathVariable Long id) {
        try {
            subscriptionService.cancelSubscription(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Subscription cancelled successfully");
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    private ResponseEntity<Map<String, String>> errorResponse(String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("status", "error");
        return ResponseEntity.status(status).body(error);
    }
}