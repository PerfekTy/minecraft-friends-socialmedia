package com.example.socialmediaapp.repositories;

import com.example.socialmediaapp.models.Comment;
import com.example.socialmediaapp.models.Post;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, ObjectId> {
    Comment findByIdd(String commentId);
    List<Comment> findByUsername(String username);
}
