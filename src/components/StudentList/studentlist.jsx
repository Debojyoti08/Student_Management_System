import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../index.css'
import { StudentService } from '../../services/StudentService';
import { useNavigate } from 'react-router-dom';


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await StudentService.getAllStudents();
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await StudentService.deleteStudent(id);
        loadStudents(); // Refresh the list
      } catch (err) {
        setError('Failed to delete student');
        console.error(err);
      }
    }
  };

  const handleUpdate = (id) => {
  navigate(`/students/update/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="student-app-container">
      <h2 className='student-text-center'>Student List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Standard</th>
            <th>Section</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.standard}</td>
              <td>{student.section}</td>
              <td>{student.rollno}</td>
              <td>{student.email}</td>
              <td>
                <button 
                  onClick={() => handleUpdate(student.id)}
                  className="student-btn student-btn-primary student-btn-sm student-mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(student.id)}
                  className="student-btn student-btn-danger student-btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;