package com.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.entities.Student;
import com.main.service.StudentService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/sms/")
public class StudentController {
	
	@Autowired
	private StudentService service;

	public StudentController(StudentService service) {
		this.service = service;
	}
	
	@PostMapping("/students")
	public Student createStudent(@RequestBody Student student) {
		return service.addStudent(student);
	}
	
	@GetMapping("/students")
	public List<Student> getAllStudent() {
		return service.getStudent();
	}
	
	@DeleteMapping("/students/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable int id) {
		boolean deleted = false;
		deleted = service.deleteEmployee(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", deleted);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/students/{id}")
	public ResponseEntity<Student> getEmployeeById(@PathVariable int id) {
		Student stu = null;
		stu = service.getStudentById(id);
		return ResponseEntity.ok(stu);
	}
	
	@PutMapping("/students/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
		student = service.updateStudent(id, student);
		return ResponseEntity.ok(student);
	}
}
