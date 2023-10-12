package socialconnection.socialmedialapp.student;

import java.time.LocalDate;

import jakarta.persistence.Id;

public class Student {
    @Id
    private Long id;
    private String name;
    private LocalDate dob;
    private String email;
    private Integer age;

    public Student() {
    }

    public Student(Long id, String name, LocalDate dob, String email, Integer age) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.age = age;
    }

    public Student(String name, LocalDate dob, String email, Integer age) {
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.age = age;
    }

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Integer getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
         this.id = id;
    }

    // SETTERS

    public void setName(String name) {
         this.name = name;
    }

    public void setDob(LocalDate dob) {
         this.dob = dob;
    }

    public void setAge(Integer age) {
         this.age = age;
    }

    public void setEmail(String email) {
         this.email = email;
    }
}

