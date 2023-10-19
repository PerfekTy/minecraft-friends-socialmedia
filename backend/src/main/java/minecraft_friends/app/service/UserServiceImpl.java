package minecraft_friends.app.service;

import minecraft_friends.app.model.User;
import minecraft_friends.app.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Long userId) {
        return userRepo.findById(userId).orElse(null);
    }

}
