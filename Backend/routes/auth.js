const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult  } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Faradayisagoodb$oy';

// const user = require('../models/User');



//Route 1 Create a user using: POST "/api/auth/creatuser" .



router.post('/SignUp', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  try{
    let user = await User.findOne({email: req.body.email});
    if (user)
    return res.status(400).json({success, errors: "Sorry a user with this email is already exists" });


    const salt =  await bcrypt.genSalt(10);

    const secPass =  await bcrypt.hash(req.body.password,salt);

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    
    const data = {
      user : {
        id:user.id
      }
    }
    // const jwtData =  jwt.sign(data, JWT_SECRET);
    //   console.log(jwtData);

    // res.json(user)

    const authtoken =  jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})
    
  } catch (error) {
      console.error(error.message);    
      // Duplicate key error
      return res.status(500).send( "Internel server error");
    }


  });





//Route 2 Authenticate a user using: POST "/api/auth/login" . no login required


    router.post('/login', [
      body('email', "Enter a valid Email").isEmail(),
      body('password', 'Password Cannot be blank').exists(),
    ], async (req, res) => {

      let success = false
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
    
        return res.status(400).json({ errors: errors.array() });
    
      };

      const {email,password} = req.body;

    try {
      let user = await User.findOne({email});
    if (!user)
    return res.status(400).json({ errors: "Please login with correct credentials" });

    const passwordcompare = await bcrypt.compare(password , user.password)

    if (!passwordcompare) {
       success = false;
      return res.status(400).json({success, errors: "Please login with correct credentials" });
    }

    const data = {
      user : {
        id:user.id
      }
    }

    const authtoken =  jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})



    } catch (error) {

      console.error(error.message);    
      // Duplicate key error
      return res.status(500).send( "Internel server error");
      
    }
    

  });


    // Router 3 Get loggedin user detail  using: POST "/api/auth/get user" . Login required

    router.post('/getuser', fetchuser, async (req, res) => {

    
try {

 userId = req.user.id;
  const user =  await User.findById(userId).select("-password")
  res.send (user);
} catch (error) {
  console.error(error.message);    
      // Duplicate key error
       res.status(500).send( "Internel server error");
      
}

})
  
  
  // .then(user => res.json(user))
  // .catch(err=> {console.log(err)
  // res.json({error : "Please enter a valid email", message: err.message})})

  
 
  // if (result.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() }) 
  // }

  // res.send({ errors: result.array() });
  
  // else{
     
  // }

  // try {
  //   const user = await User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   });
  //   res.json(user);
  // } catch (error) {
  //   if (error.code === 11000) {
  //     // Duplicate key error
  //     return res.status(400).json({ error: 'Email already exists' });
  //   }
  //   console.error(error);
  //   res.status(500).json({ error: 'Server error' });
  // }


// res.send(req.body)






 module.exports = router