package com.example.socialmediaapp.controllers.Comments;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private String username;
    private String commentImage;
    private String commentBody;
    private LocalDateTime createdAt;
}
