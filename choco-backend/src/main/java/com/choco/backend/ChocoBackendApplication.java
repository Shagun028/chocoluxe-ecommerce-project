package com.choco.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController  // ADD THIS LINE
public class ChocoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChocoBackendApplication.class, args);
	}

	// ADD THIS METHOD
	@GetMapping("/ping")
	public String ping() {
		return "pong";
	}
}