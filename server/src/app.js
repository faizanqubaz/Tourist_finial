const {Hotel} =require('./Hotels/hotel.model')
const express =require('express');
const socketio = require('socket.io')
const cors=require('cors')
const http =require('http');
const routes=require('./route')
const app=express();
const multer = require('multer');
const PORT=4000;
const server=http.createServer(app);
const path = require('path');
const { Destination } = require('./Destinations/destination.model');
const { Portor } = require('./Portors/portors.model');
const { Room } = require('./Room/room.model');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/v1',routes);
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  app.use(express.static('public'));
  const upload = multer({ storage }).single('image');
  const multiUpload=multer({storage})
 
const STATIC_CHANNELS = ['global_notifications', 'global_chat'];
const io=socketio(server);

io.on('connection',(socket)=>{
  
    console.log(`new client connected ${socket.id}`);
    socket.emit('connection', {
        data:"heelo"
    });
    socket.on('join_room',(data)=>{
    socket.join(data)
    })
    socket.on('send_message',(data)=>{
        console.log('message',data)
       socket.to(data.room).emit('receive_message',data)
    })
    socket.on('disconnect',()=>{
        console.log('user disconect')
    })
})

// here we will add hotels
app.post('/api/hotels', async (req, res) => {
    console.log('rrrr',req.file)
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const { name, description,price,location,email } = req.body;
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('imageUrl',imageUrl)
      try {
        const hotel = await Hotel.query().insert({
          name,
          description,
          imageUrl: imageUrl,
          price:price,
          rating:'4',
          location:location,
          email:email
        });
        res.json(hotel);
      } catch (error) {
        console.error('Error adding hotel:', error);
        res.status(500).json({ error: 'Error adding hotel' });
      }
    });
  });

//   here we will add destinations

app.post('/api/destinations', async (req, res) => {
    console.log('rrrr',req.file)
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const { name, description,location,address,rating } = req.body;
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('imageUrl',imageUrl)
      try {
        const destinations = await Destination.query().insert({
          name,
          description,
          imageUrl: imageUrl,
          rating:rating,
          address:address,
          city:location
        });
        res.json(destinations);
      } catch (error) {
        console.error('Error adding destinations:', error);
        res.status(500).json({ error: 'Error adding destinations' });
      }
    });
  });

//   here we will add portors
app.post('/api/portor', async (req, res) => {
    console.log('rrrr',req.file)
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const { name, description,phonenumber,dob,address,selectedoption,city } = req.body;
      console.log('body',req.body)
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('imageUrl',imageUrl)
      try {
        const portors = await Portor.query().insert({
          name,
          phoneNumber:String(phonenumber),
          description,
          address,
          dob,
          imageUrl: imageUrl,
          selectedoption:selectedoption,
          address:address,
          city:city
        });
        res.json(portors);
      } catch (error) {
        console.error('Error adding destinations:', error);
        res.status(500).json({ error: 'Error adding destinations' });
      }
    });
  });

  // here is to save room
  app.post('/api/rooms/:hotelId', multiUpload.array('image', 5), async (req, res) => {
    const hotelId = req.params.hotelId;
    const formData = req.body;
  console.log('fff',formData)
    try {
      const savedRooms = [];

      for (let i = 0; i < formData.roomnumber.length; i++) {
        const room = await Room.query().insert({
          hotel_id: hotelId,
          name:formData.roomnumber[i],
          attachbath: formData.attachbath[i],
          availability: formData.availability[i],
          imageUrl: '/uploads/'+req.files[i].filename // Use the filename from the uploaded file
        });
        savedRooms.push(room);
      }
      res.json({ message: 'Form data saved successfully!', savedRooms });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'An error occurred while saving the form data.' });
    }
  });




server.listen(PORT,()=>{
    console.log('my server is listing on port '+PORT)
})
