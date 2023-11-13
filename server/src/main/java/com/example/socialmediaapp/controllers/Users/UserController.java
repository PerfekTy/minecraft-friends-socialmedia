package com.example.socialmediaapp.controllers;

import com.example.socialmediaapp.models.User;
import com.example.socialmediaapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Object> users() {
        List users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/current")
    public ResponseEntity<Object> current() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object user = authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{username}/edit")
    public ResponseEntity<Object> edit(@RequestBody EditResponse editResponse, @PathVariable String username) {
        return ResponseEntity.ok(service.edit(editResponse, username));
    }

    @DeleteMapping("/{username}/delete")
    public ResponseEntity<Object> delete(@PathVariable String username) {
        service.delete(username);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PatchMapping("/{username}/follow")
    public ResponseEntity<Object> toggleFollow(@PathVariable String username) {
        service.toggleFollowUser(username);
        return ResponseEntity.ok("User followed successfully");
    }
}
