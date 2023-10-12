package socialconnection.socialmedialapp.student;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class  StudentService {
    public List<Student> getStudents() {
		return List.of(
			new Student(1L, "Seba", LocalDate.of(2001, Month.DECEMBER, 31), "seba@gmail.com", 21)
		);
	}
}
