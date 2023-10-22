package minecraft_friends.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/current")
    public ResponseEntity<String> current() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            return new ResponseEntity<>("Zalogowany", HttpStatus.OK);
        }

        return new ResponseEntity<>("Nie zalogowany", HttpStatus.BAD_REQUEST);
    }

}