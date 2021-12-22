const {User}=require('./user.model');
const jwt=require('jsonwebtoken')

const register = async(req,res) =>{
  console.log(req.body);
  console.log('querrr',User)
    const user = await User.query().insert(req.body);
    console.log('oooo',user)
    const token = jwt.sign(
        { user_id: user._id, },
        'test',
       
      );

      res.status(201).json({
          message:"user registered",
          data:user,
          token
      })
}

// user login
const login = async(req,res)=>{
    const user = await User.query()
    .select('email', 'name', 'lastName')
    .where('email', req.body.email)
    console.log("users",user)
  if(user.length==0){
    console.log('user not found')
    
  }else{
      console.log('user authenticatio')
      res.status(200).send()
  }
}
module.exports={
    register,
    login
}