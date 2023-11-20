package com.example.socialmediaapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "comments")
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    private ObjectId id;

    @Field
    private String username;

    @Field
    private String commentBody;

    @Field
    private String commentImage;

    @Field
    private LocalDateTime createdAt;

    @Field
    private String idd;

    @DBRef
    private Post post;
}
