package com.example.socialmediaapp.repositories;

import com.example.socialmediaapp.models.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, ObjectId> {
    Comment findByIdd(String commentId);
}
