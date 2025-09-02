package com.bankofapis.user.controller;

import com.bankofapis.user.model.User;
import com.bankofapis.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id, Authentication authentication) {
        String usernameFromToken = authentication.getName();

        User currentUser = userRepository.findByUsername(usernameFromToken)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        if (!currentUser.getUserId().equals(id)) {
            return ResponseEntity.status(403).build();  // Forbidden if user tries to access other user's data
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<User> getUserByUsername(@RequestParam String username, Authentication authentication) {
        String usernameFromToken = authentication.getName();

        if (!usernameFromToken.equals(username)) {
            return ResponseEntity.status(403).build(); // Prevent users accessing other users' data
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }
}
