package com.example.socialmediaapp.repositories;

import com.example.socialmediaapp.models.Roles;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Roles, ObjectId> {
    Optional<Roles> findByName(String name);
}
