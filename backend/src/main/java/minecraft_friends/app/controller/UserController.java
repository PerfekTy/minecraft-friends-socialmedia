package minecraft_friends.app.controller;

import minecraft_friends.app.model.User;
import org.springframework.http.ResponseEntity;
import minecraft_friends.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/new")
    public String add(@RequestBody User user) {
        userService.saveUser(user);
        return "User has been added";
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
