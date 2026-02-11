const express = require('express');

const {handleGetAllStudents, 
    handleCreateStudent, 
    handleUpdateStudent,
    handleDeleteStudentById} = require('../controllers/student');

const router = express.Router();

router.route('/').get(handleGetAllStudents)
.post( handleCreateStudent)

router.route('/:id')
.patch(handleUpdateStudent)
.delete(handleDeleteStudentById)

module.exports = {router};