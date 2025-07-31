import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentService } from '../../services/StudentService';
import '../../index.css'

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    standard: '',
    section: '',
    rollno: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await StudentService.getStudentById(id);
        setStudent({
          name: data.name,
          standard: data.standard.toString(),
          section: data.section,
          rollno: data.rollno.toString(),
          email: data.email
        });
      } catch (err) {
        setError('Failed to load student data');
        console.error('Error fetching student:', err);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!student.name.trim()) newErrors.name = 'Name is required';
    if (!student.standard) newErrors.standard = 'Standard is required';
    else if (isNaN(student.standard)) newErrors.standard = 'Must be a number';
    if (!student.section) newErrors.section = 'Section is required';
    if (!student.rollno) newErrors.rollno = 'Roll number is required';
    else if (isNaN(student.rollno)) newErrors.rollno = 'Must be a number';
    if (!student.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(student.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await StudentService.updateStudent(id, {
        name: student.name,
        standard: parseInt(student.standard),
        section: student.section,
        rollno: parseInt(student.rollno),
        email: student.email
      });
      setSuccess('Student updated successfully!');
      setTimeout(() => {
        navigate('/students');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
      console.error('Update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="student-app-container">
      <div className="student-form">
        <h2 className="student-text-center">Update Student</h2>
        
        {error && (
          <div className="student-alert student-alert-danger">
            {error}
          </div>
        )}
        
        {success && (
          <div className="student-alert student-alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="student-form-group">
            <label className="student-form-label">Full Name</label>
            <input
              type="text"
              className={`student-form-control ${errors.name ? 'student-is-invalid' : ''}`}
              name="name"
              value={student.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="student-invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>

          <div className="student-form-row">
            <div className="student-form-group">
              <label className="student-form-label">Standard</label>
              <input
                type="number"
                className={`student-form-control ${errors.standard ? 'student-is-invalid' : ''}`}
                name="standard"
                min="1"
                max="12"
                value={student.standard}
                onChange={handleChange}
              />
              {errors.standard && (
                <div className="student-invalid-feedback">
                  {errors.standard}
                </div>
              )}
            </div>

            <div className="student-form-group">
              <label className="student-form-label">Section</label>
              <select
                className={`student-form-control ${errors.section ? 'student-is-invalid' : ''}`}
                name="section"
                value={student.section}
                onChange={handleChange}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              {errors.section && (
                <div className="student-invalid-feedback">
                  {errors.section}
                </div>
              )}
            </div>
          </div>

          <div className="student-form-row">
            <div className="student-form-group">
              <label className="student-form-label">Roll Number</label>
              <input
                type="number"
                className={`student-form-control ${errors.rollno ? 'student-is-invalid' : ''}`}
                name="rollno"
                min="1"
                value={student.rollno}
                onChange={handleChange}
              />
              {errors.rollno && (
                <div className="student-invalid-feedback">
                  {errors.rollno}
                </div>
              )}
            </div>

            <div className="student-form-group">
              <label className="student-form-label">Email</label>
              <input
                type="email"
                className={`student-form-control ${errors.email ? 'student-is-invalid' : ''}`}
                name="email"
                value={student.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="student-invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="student-form-actions">
            <button
              type="button"
              className="student-btn student-btn-secondary"
              onClick={() => navigate('/students')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="student-btn student-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;