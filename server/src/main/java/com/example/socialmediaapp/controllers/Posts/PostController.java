package com.example.socialmediaapp.controllers.Posts;

import com.example.socialmediaapp.models.Comment;
import com.example.socialmediaapp.models.Post;
import com.example.socialmediaapp.repositories.CommentRepository;
import com.example.socialmediaapp.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService service;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestBody PostResponse postResponse) throws Exception {
        service.createPost(postResponse.getPostBody(), postResponse.getPostImage());
        return ResponseEntity.ok("Post created successfully");
    }

    @GetMapping
    public ResponseEntity<Object> posts() {
        List posts = postRepository.findAll();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Object> post(@PathVariable String postId) {
       Post post = postRepository.findByIdd(postId);
       return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Object> delete(@PathVariable String postId) {
        Post post = postRepository.findByIdd(postId);
        List<Comment> postComments = commentRepository.findByUsername(post.getUsername());

        commentRepository.deleteAll(postComments);
        postRepository.delete(post);

        return ResponseEntity.ok("Post with comments deleted successfully");
    }
}
