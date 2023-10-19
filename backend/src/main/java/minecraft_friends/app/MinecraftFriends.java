package minecraft_friends.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MinecraftFriends {

	public static void main(String[] args) {
		SpringApplication.run(MinecraftFriends.class, args);
	}

}
