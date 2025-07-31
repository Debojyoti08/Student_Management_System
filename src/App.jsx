import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddStudent from './components/AddStudent/addstudent'
import StudentList from './components/StudentList/studentlist'
import UpdateStudent from './components/UpdateStudent/updatestudent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<StudentList />} />
          <Route path='/' element={<StudentList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path='/addstudent' element={<AddStudent />} />
          <Route path="/students/update/:id" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
