const {User}=require('./user.model');
const {Hotel} = require('../Hotels/hotel.model')
const jwt=require('jsonwebtoken');
const axios =require('axios');

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

const getHotels = async(req,res) =>{
  try {
    const location = req.query.query;
    const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${location}&apikey=5ae2e3f221c38a28845f05b68fd3ce47c17556079c49fc8ffe97b425`);
   
    const { lon, lat } = response.data;
    console.log('lon',typeof lon,typeof lat)

     const hotelsResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${String(lon)}&lat=${String(lat)}&apikey=5ae2e3f221c38a28845f05b68fd3ce47c17556079c49fc8ffe97b425`);
    const hotels = hotelsResponse.data.features;
    console.log('hotels',hotels)

    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports={
    register,
    login,
    getHotels
}