import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sms/students';

export const StudentService = {
  getAllStudents: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  deleteStudent: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  updateStudent: async (id, studentData) => {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
};