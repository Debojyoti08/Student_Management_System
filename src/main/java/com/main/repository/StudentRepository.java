package com.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> 
{

}
