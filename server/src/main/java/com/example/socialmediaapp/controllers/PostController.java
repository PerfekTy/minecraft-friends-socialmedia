package com.example.socialmediaapp.controllers;

import com.example.socialmediaapp.models.Post;
import com.example.socialmediaapp.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService service;
    private final PostRepository postRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody PostResponse postResponse) throws Exception {
        Post post = service.createPost(postResponse.getPostBody(), postResponse.getPostImage());
        return ResponseEntity.ok("Post created successfully");
    }

    @GetMapping
    public ResponseEntity<Object> posts() {
        List posts = postRepository.findAll();
        return ResponseEntity.ok(posts);
    }
}
