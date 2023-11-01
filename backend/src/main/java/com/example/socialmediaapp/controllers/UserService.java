package com.example.socialmediaapp.controllers;

import com.example.socialmediaapp.models.User;
import com.example.socialmediaapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ResponseEntity<Object> edit(EditResponse editResponse, String username) {
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();

            userToUpdate.setName(editResponse.getName());
            userToUpdate.setEmail(editResponse.getEmail());
            userToUpdate.setProfileImage(editResponse.getProfileImage());
            userToUpdate.setCoverImage(editResponse.getCoverImage());
            userToUpdate.setDescription(editResponse.getDescription());

            User updated = userRepository.save(userToUpdate);
            return ResponseEntity.ok(updated);
        } else {
            throw new RuntimeException("User does not exist!");
        }
    }

    public void delete(String username) {
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            userRepository.delete(existingUser.get());
        } else {
            throw new RuntimeException("User does not exist!");
        }
    }
}
