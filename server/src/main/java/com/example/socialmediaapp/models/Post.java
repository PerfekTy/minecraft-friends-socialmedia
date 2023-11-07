package com.example.socialmediaapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Document(collection = "posts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    private ObjectId id;

    @Field
    private String username;

    @Field
    private String postBody;

    @Field
    private String postImage;

    @Field
    private LocalDateTime createdAt;
}
