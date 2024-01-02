package com.example.socialmediaapp.repositories;

import com.example.socialmediaapp.models.Post;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, Long> {
    List<Post> findByUsername(String username);
    Post findByIdd(String idd);
    Page<Post> findAll(Pageable pageable);
}
