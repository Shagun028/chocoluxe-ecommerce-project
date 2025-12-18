package com.choco.backend.controller;

import com.choco.backend.model.CustomBox;
import com.choco.backend.service.CustomBoxService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/custom-boxes")
@RequiredArgsConstructor
public class CustomBoxController {

    private final CustomBoxService customBoxService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createCustomBox(
            @PathVariable Long userId,
            @Valid @RequestBody CustomBox customBox) {
        try {
            CustomBox created = customBoxService.createCustomBox(customBox, userId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Custom box created successfully");
            response.put("customBox", created);
            response.put("status", "success");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserBoxes(@PathVariable Long userId) {
        List<CustomBox> boxes = customBoxService.getUserBoxes(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("boxes", boxes);
        response.put("count", boxes.size());
        response.put("status", "success");

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateBoxStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            CustomBox updated = customBoxService.updateBoxStatus(id, status);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Box status updated successfully");
            response.put("customBox", updated);
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{boxId}/items")
    public ResponseEntity<?> addItemToBox(
            @PathVariable Long boxId,
            @RequestBody CustomBox.BoxItem item) {
        try {
            CustomBox updated = customBoxService.addItemToBox(boxId, item);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Item added to box successfully");
            response.put("customBox", updated);
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return errorResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    private ResponseEntity<Map<String, String>> errorResponse(String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("status", "error");
        return ResponseEntity.status(status).body(error);
    }
}