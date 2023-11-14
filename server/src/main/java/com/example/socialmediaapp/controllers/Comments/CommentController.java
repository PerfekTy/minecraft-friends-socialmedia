package com.example.socialmediaapp.controllers.Comments;

import com.example.socialmediaapp.models.Comment;
import com.example.socialmediaapp.models.Post;
import com.example.socialmediaapp.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentService service;
    private final CommentRepository commentRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createComment(@RequestBody CommentResponse commentResponse) throws Exception {
        service.createComment(commentResponse.getCommentBody(), commentResponse.getCommentImage());
        return ResponseEntity.ok("Comment created successfully");
    }

    @GetMapping
    public ResponseEntity<Object> comments() {
        List comments = commentRepository.findAll();
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Object> delete(@PathVariable String commentId) {
        Comment comment = commentRepository.findByIdd(commentId);
        commentRepository.delete(comment);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
