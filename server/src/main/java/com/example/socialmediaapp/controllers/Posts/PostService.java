package com.example.socialmediaapp.controllers;

import com.example.socialmediaapp.models.Post;
import com.example.socialmediaapp.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(String postBody, String postImage) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String loggedUser = authentication.getName();
            LocalDateTime createdAt = LocalDateTime.now();
            Random random = new Random();
            String randomId = String.valueOf(random.nextLong(Long.MAX_VALUE) + 1);


            Post post = new Post();
            post.setUsername(loggedUser);
            post.setIdd(randomId);
            post.setPostBody(postBody);
            post.setPostImage(postImage);
            post.setCreatedAt(createdAt);

            return postRepository.save(post);
        }
        throw new Exception("User is not authenticated");
    }
}
