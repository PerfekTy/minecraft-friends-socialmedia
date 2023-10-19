package minecraft_friends.app.service;

import minecraft_friends.app.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(Long userId);
}
