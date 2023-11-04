package com.example.socialmediaapp.repositories;

import com.example.socialmediaapp.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    User getUserByUsername(String username);
}
