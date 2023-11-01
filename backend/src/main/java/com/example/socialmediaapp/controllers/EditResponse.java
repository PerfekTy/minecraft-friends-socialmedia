package com.example.socialmediaapp.controllers;

import lombok.Data;

@Data
public class EditResponse {
    private String profileImage;
    private String coverImage;
    private String description;
    private String email;
    private String name;
}
