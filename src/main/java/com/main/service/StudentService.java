package com.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.entities.Student;
import com.main.repository.StudentRepository;

@Service
public class StudentService {
	
	@Autowired
	private StudentRepository repo;
	
	public Student addStudent(Student student) {
		return repo.save(student);
	}
	
	public List<Student> getStudent() {
		List<Student> students = repo.findAll();
		return students;
	}
	
	public boolean deleteEmployee(int id) {
		Student student = repo.findById(id).get();
		repo.delete(student);
		return true;
	}
	
	public Student getStudentById(int id) {
		Student student = repo.findById(id).get();
		return student;
	}
	
	public Student updateStudent(int id, Student student) {
		Student stu1 = repo.findById(id).get();
		stu1.setName(student.getName());
		stu1.setStandard(student.getStandard());
		stu1.setSection(student.getSection());
		stu1.setRollno(student.getRollno());
		stu1.setEmail(student.getEmail());
		
		repo.save(stu1);
		return stu1;
	}

}
