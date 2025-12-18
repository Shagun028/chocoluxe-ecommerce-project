package com.choco.backend.controller;

import com.choco.backend.model.User;
import com.choco.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
// REMOVE @RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // ADD CONSTRUCTOR MANUALLY
    public AuthController(UserService userService) {
        System.out.println("=== AuthController: Constructor called ===");
        System.out.println("=== UserService: " + (userService != null ? "INJECTED" : "NULL") + " ===");
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        System.out.println("=== AuthController: /register endpoint called ===");
        try {
            User registeredUser = userService.registerUser(user);

            // Remove password from response
            registeredUser.setPassword(null);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", registeredUser);
            response.put("status", "success");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            System.out.println("=== AuthController: Error: " + e.getMessage() + " ===");
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            error.put("status", "error");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // ADD TEST ENDPOINT
    @GetMapping("/test")
    public String test() {
        return "AuthController is working!";
    }
}