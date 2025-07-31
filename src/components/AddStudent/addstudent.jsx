import './addstudent.css'
import React, { useState } from 'react';
import axios from 'axios';

const addstudent = () => {
  const [student, setStudent] = useState({
    name: '',
    standard: '',
    section: '',
    rollno: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!student.name.trim()) newErrors.name = 'Name is required';
    if (!student.standard) newErrors.standard = 'Standard is required';
    if (!student.section) newErrors.section = 'Section is required';
    if (!student.rollno) {
      newErrors.rollno = 'Roll number is required';
    } else if (isNaN(student.rollno)) {
      newErrors.rollno = 'Roll number must be a number';
    }
    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (validate()) {
      setIsLoading(true);
      
      try {
        const response = await axios.post('http://localhost:8080/api/sms/students', {
          name: student.name,
          standard: parseInt(student.standard),
          section: student.section,
          rollno: parseInt(student.rollno),
          email: student.email
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Student added successfully:', response.data);
        setIsSubmitted(true);
        // Reset form after successful submission
        setStudent({
          name: '',
          standard: '',
          section: '',
          rollno: '',
          email: ''
        });
      } catch (error) {
        console.error('Error adding student:', error);
        setErrorMessage(
          error.response?.data?.message || 
          error.message || 
          'Failed to add student. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Student Added Successfully!</h2>
        <button onClick={() => setIsSubmitted(false)}>Add Another Student</button>
      </div>
    );
  }

  return (
    <div className="student-form-container">
      <h1>Add New Student</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name*</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Standard*</label>
            <input
              type="number"
              name="standard"
              min="1"
              max="12"
              value={student.standard}
              onChange={handleChange}
              className={errors.standard ? 'error' : ''}
            />
            {errors.standard && <span className="error-text">{errors.standard}</span>}
          </div>

          <div className="form-group">
            <label>Section*</label>
            <select
              name="section"
              value={student.section}
              onChange={handleChange}
              className={errors.section ? 'error' : ''}
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            {errors.section && <span className="error-text">{errors.section}</span>}
          </div>

          <div className="form-group">
            <label>Roll Number*</label>
            <input
              type="number"
              name="rollno"
              min="1"
              value={student.rollno}
              onChange={handleChange}
              className={errors.rollno ? 'error' : ''}
            />
            {errors.rollno && <span className="error-text">{errors.rollno}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default addstudent;