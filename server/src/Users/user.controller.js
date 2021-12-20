const {User}=require('./user.model');
const jwt=require('jsonwebtoken')

const register = async(req,res) =>{
    const user = await User.query().insert(req.body);
    const token = jwt.sign(
        { user_id: user._id, email },
        'test',
       
      );

      res.json({
          message:"user registered",
          data:user,
          token
      })
}

// user login
const login = async(req,res)=>{
    const user = await Person.query()
    .select('email', 'firstName', 'lastName')
    .where('email', req.body.email)
  if(user.length==0){
    console.log('user not found')
  }else{
      console.log('user authenticatio')
  }
}
module.exports={
    register,
    login
}