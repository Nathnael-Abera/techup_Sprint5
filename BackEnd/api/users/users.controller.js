   const user = require('../../models/usersModel')
   const jwt = require('jsonwebtoken')
   const bcrypt = require('bcryptjs')
   //@desc register user
    //@route post /api/user
    //@access public
    const registerUser= async (req,res)=>{
        const {name,email,password,Role}=req.body;
        try {
            if(!name||!email||!password){
                return   res.status(400).json({msg:'please fill out all form'})
            }
            const userExists = await user.findOne({email});
            if(userExists){
                return  res.status(400).json({msg:'There is already a user with this email'})
            }
            const salt = await bcrypt.genSalt(10)
            const hasshedPassword =await bcrypt.hash(password,salt)

            const newUser =await user.create({
                name,
                email,
                password:hasshedPassword,
                Role:Role||"candidate"
            })
            if (newUser){
                res.status(201).json({
                message:'User Successfully Registered',
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                token:generateToken(newUser._id)
            })}        
            else{
                return   res.status(400).json({msg:'invaid user data'})

            }    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message11:error.message})
        }

    }
    //@desc login user
    //@route post /api/user/login
    //@access public
    const  LoginUser= async(req,res)=>{
        const {email,password}=req.body;
        
        try {
            if(!email||!password){
                return   res.status(400).json({msg:'please fill out all form'})
            }
            const userExists = await user.findOne({email});
            if(userExists){
            const pass = await bcrypt.compare(password,userExists.password)
            

            if(userExists&&pass){
                res.status(200).json({
                    message:'User Successfully logged',
                    _id:userExists._id,
                    name:userExists.name,
                    email:userExists.email,
                    token:generateToken(userExists._id)

                })
            }   }     
        else{
                return   res.status(400).json({msg:'invaid user credintial'})

            }    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message1login:error.message})
        }


    }
    const  getAllUser = async (req,res)=>{
        try {
            const allUser = await user.find()
            res.json({
              message: 'users',
                allUser
            });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
          }
    }
    //@desc get user

    //@route get /api/user/me
    //@access private
    const  getUser = async (req,res)=>{
        try {
            const { _id, name, email,Role } = await user.findOne({ _id: req.user.id })
            res.json({
              message: 'Hello',
              id: _id,
              name,
              email,
              Role
            });
          } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
          }
    }
    const updateUser = async (req, res) => {
        const { name, email, password, Role } = req.body;
        const userId = req.params.id;
      
        try {
            const update = await user.findOneAndUpdate({ _id: userId }, { $set: req.body });
            if (!update){
                 res.status(400).json({msg:`user with id no ${userId} not found `})
            }
            const Updated = await user.find({_id:userId})
           res.status(200).json({msg:`user with id no ${userId} is updated `,Updated})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message:error.message})
        }
      };
    const deleteUser = async (req, res) => {
        const userId = req.params.id;
      
        try {
          const userDeleted = await user.findOneAndDelete({_id:userId});
          if (!userDeleted) {
            return res.status(404).json({ msg: 'User not found' });
          }
          res.json({ message: 'User successfully deleted' });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
        }
      };
      
    const generateToken=(id)=>{

        return  jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
    } 
    

module.exports = {
registerUser,LoginUser,getUser,updateUser,deleteUser,getAllUser
}