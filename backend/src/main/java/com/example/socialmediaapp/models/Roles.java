package com.example.socialmediaapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "roles")
@AllArgsConstructor
@NoArgsConstructor
public class Roles {
    @org.springframework.data.annotation.Id
    private ObjectId Id;
    private String name;
}
