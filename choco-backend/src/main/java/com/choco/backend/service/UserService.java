package com.choco.backend.service;

import com.choco.backend.model.User;
import com.choco.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
// REMOVE @RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ADD CONSTRUCTOR MANUALLY
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        System.out.println("=== UserService: Constructor called ===");
        System.out.println("=== PasswordEncoder: " + (passwordEncoder != null ? "INJECTED" : "NULL") + " ===");
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User registerUser(User user) {
        System.out.println("=== UserService: registerUser called ===");
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}