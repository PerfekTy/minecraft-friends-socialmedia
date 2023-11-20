package com.example.socialmediaapp.controllers.Users;

import com.example.socialmediaapp.models.Comment;
import com.example.socialmediaapp.models.Post;
import com.example.socialmediaapp.models.User;
import com.example.socialmediaapp.repositories.CommentRepository;
import com.example.socialmediaapp.repositories.PostRepository;
import com.example.socialmediaapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

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

    public void delete(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            List<Post> userPosts = postRepository.findByUsername(username);
            for (Post post : userPosts) {
                List<Comment> userComments = commentRepository.findByUsername(post.getUsername());
                commentRepository.deleteAll(userComments);
            }
            postRepository.deleteAll(userPosts);
            userRepository.delete(user);
        }
    }
}
