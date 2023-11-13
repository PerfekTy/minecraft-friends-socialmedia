package com.example.socialmediaapp.controllers;

import com.example.socialmediaapp.models.User;
import com.example.socialmediaapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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

    public ResponseEntity<Object> toggleFollowUser(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String loggedInUsername = authentication.getName();
            User loggedInUser = userRepository.getUserByUsername(loggedInUsername);

            if (loggedInUser != null) {
                User userToFollow = userRepository.getUserByUsername(username);

                if (userToFollow != null) {
                    if (userToFollow.getFollowers().contains(loggedInUser.getUsername())) {
                        userToFollow.getFollowers().remove(loggedInUser.getUsername());
                        loggedInUser.getOwnFollowers().remove(userToFollow.getUsername());
                    } else {
                        userToFollow.getFollowers().add(loggedInUsername);
                        loggedInUser.getOwnFollowers().add(userToFollow.getUsername());
                    }

                    userRepository.save(loggedInUser);
                    userRepository.save(userToFollow);

                    return ResponseEntity.status(HttpStatus.OK).body("Toggle follow successful");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User to follow not found");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Logged in user not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }
}
