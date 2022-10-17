const express = require('express');
const router = express.Router();
const {authenticate} = require('../functions/global/globalFunctions')
const {searchStudents,updateStudent,createStudent,deleteStudent,listStudents} = require('../functions/students/studentsFunctions')

/* GET for search student */
router.get(`/:id`,async function(req, res, next) {
  try{
    await authenticate(req.headers.authorization)
    try{
      const datausers = await searchStudents(req.params)
      res.status(200).json({
        studentd: datausers
      });
    }catch(error){
      if(error && error.name === 'InvalidArgumentError'){
        res.status(404).json({error: error.message})
      }
      res.status(500).json({ error: error.message })
    }
  }catch(error){
    res.status(401).json({ error: error.message })
  }
});

/* GET for list students */
router.get(`/`,async function(req, res, next) {
  try{
    await authenticate(req.headers.authorization)
    try{
      const datausers = await listStudents(req.query)
      res.status(200).json({
        students: datausers
      });
    }catch(error){
      res.status(500).json({ error: error.message })
    }
  }catch(error){
    res.status(401).json({ error: error.message })
  }
});

/* POST create a new user */
router.post('/', async function(req,res,next){
  try{
    await authenticate(req.headers.authorization)
    try{
      const response = await createStudent(req.body)
    res.status(200).json({
      status: response
    })
    }catch(error){
      if (error && error.name === 'UniqueViolation') {
        return res.status(409).json({ error: error.message });
      }else if(error && error.name === 'InvalidArgumentError'){
        res.status(417).json({error: error.message})
      }else{
        res.status(500).json({error: error.message})
      }
    }
  }catch(error){
    res.status(401).json({ error: error.message })
  }
})
/* PUT edit a user */
router.put('/:id', async function(req,res,next){
  try{
    await authenticate(req.headers.authorization)
    try{
      const response = await updateStudent(req.params.id,req.body)
      res.status(200).json({
        status: response
      })
    }catch(error){
      if (error && error.name === 'InvalidArgumentError') {
        return res.status(404).json({ error: error.message });
      }else{
        res.status(500).json({error: error.message})
      }
    }
  }catch(error){
    res.status(401).json({ error: error.message })
  }
 
})
router.delete('/:id', async function(req,res,next){
  try{
    await authenticate(req.headers.authorization)
    try{
      const response = await deleteStudent(req.params.id)
      res.status(200).json({
        status: response
      })
    }catch(error){
      if (error && error.name === 'InvalidArgumentError') {
        return res.status(404).json({ error: error.message });
      }else{
        res.status(500).json({error: error.message})
      }
    }
  }catch(error){
    res.status(401).json({ error: error.message })
  }
})

module.exports = router;