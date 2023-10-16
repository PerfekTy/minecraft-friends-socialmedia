package socialconnection.app.service;

import socialconnection.app.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    List<User> getAllUsers();
    User getUserById(Long userId);
}
