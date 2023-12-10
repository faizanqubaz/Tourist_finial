const {Hotel} =require('./Hotels/hotel.model')
const express =require('express');
const cookie = require('cookie');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const cron = require('node-cron')
const socketio = require('socket.io')
const cors=require('cors');
const webpush = require('web-push');
const http =require('http');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client('157698735716-9mm9u6eg3t7sfip697emcucaaopjgpd0.apps.googleusercontent.com');
const routes=require('./route')
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51HMC3KGcv7U58JGet3osWd9FFoLPW0eQneu87sYPxsSmaQug5No99W2ZUwPunVsifYE1iEilXih5Um1kWAAb3nEu00XBpRUsJs');
const app=express();
const multer = require('multer');
const axios = require('axios')
const PORT=4000;
const server=http.createServer(app);
const path = require('path');
const { Destination } = require('./Destinations/destination.model');
const { Portor } = require('./Portors/portors.model');
const { Room } = require('./Room/room.model');
const { User } = require('./Users/user.model');
const { Bookings } = require('./Bookings/booking.model');
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


// Set up VAPID keys
webpush.setVapidDetails(
  'mailto:faizanquba1@gmail.com',
  'BD_skaSbpFW3bqN_T3UdKteF1OIm1SgEm1AMZlxZp0zebVzKcjQDXy9U0STezJLPc7OExX45RFsVIRlOJ4LLpM0',
  '1RmSSbanZCB6buKgIGDtNj0oqwhJ6EJOFo6Kq6fQwys'
);


// Array to store user subscriptions
const subscriptions = [];

// Subscribe route to store user's subscription details
app.post('/v1/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});


async function updateBookingStatus(bookingId) {
  try {
    const roomsToUpdate = await Room.query().whereIn('guest_id', [bookingId]);
console.log('roomtoupdate',roomsToUpdate)
    if (roomsToUpdate.length === 0) {
      console.log('No rooms found for the given booking IDs.');
      return;
    }

    // Update the availability status to 'no' for each room
    await Promise.all(
      roomsToUpdate.map(async room => {
        await Room.query().findById(room.id).patch({ availability: 'yes' });
      })
    );

    console.log('Room availability updated for the specified booking IDs.');
  } catch (error) {
    console.error(`Error updating booking status for booking ${bookingId}:`, error);
  }
}

// Simulated function to check out bookings with same check-in and check-out dates
async function checkoutSameDayBookings() {
  // const currentRoomData = JSON.parse(localStorage.getItem('hotelInfo'));
  const bookings = await Bookings.query();
  const today = new Date().toISOString().substr(0, 10);
  
  bookings.forEach(booking => {
  
  
    if (booking.checkIn_date === today && booking.checkOut_date === today) {
 
      updateBookingStatus(booking.id);
    }
  });
}

// Schedule the cron job to run every day at a specific time (e.g., midnight)
// Schedule the cron job to run every 10 seconds

cron.schedule('0 0 * * *', () => {
  checkoutSameDayBookings();
});


// Send push notifications route
app.post('/send-notification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'Booking Successful!',
      body: 'Your room booking has been confirmed.',
      icon: 'icon-url', // URL to an icon image
    },
  };

  subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
      .catch(error => {
        console.error('Error sending push notification:', error);
      });
  });

  res.status(200).json({});
});

// Configure nodemailer transporter (use your email service provider settings)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'faizanquba1@gmail.com',
    pass: 'lgwf gdbq oyrf rcla'
  }
})

// here we will add hotels
app.post('/api/hotels', async (req, res) => {
    console.log('rrrr',req.file)
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const { name, description,price,location,email,whatsapp } = req.body;
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
          email:email,
          whatsapp_number:whatsapp
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
          price:parseInt(formData.roomprice[i]),
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


  // send mesasae
  app.post('/v1/api/sendemail', async (req, res) => {
    try {
      const { hotelEmail, bookingDetails } = req.body;
  console.log('bk',bookingDetails)
  console.log('ck',hotelEmail)
      // Send email to the hotel
      const queryParams = new URLSearchParams(bookingDetails).toString();
  // HTML content for the email
  const bookingLink=`http://localhost:4000/v1/confirmbooking?${queryParams}`
  const emailHtml = `
  <p>You have a new booking request for Room ${bookingDetails.roomname}:</p>
  <ul>
    <li>Name: ${bookingDetails.name}</li>
    <li>Email: ${bookingDetails.email}</li>
    <li>CNIC: ${bookingDetails.cnic}</li>
    <li>Country: ${bookingDetails.country}</li>
    <li>CheckInDate: ${bookingDetails.checkInDate}</li>
    <li>CheckOutDate: ${bookingDetails.checkOutDate}</li>
    <li>Price For Room: ${bookingDetails.price}</li>
    <!-- Add more booking details here -->
  </ul>
  <p><a href="${bookingLink}"><button>Confirm Booking</button></a></p>
`;

      const mailOptions = {
        from: bookingDetails.email,
        to: hotelEmail,
        subject: 'New Booking Request',
        html:emailHtml
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Booking request email sent and data saved successfully.' });
    } catch (error) {
      console.error('Error sending booking email:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  });
  

  app.post('/v1/api/booked', async (req, res) => {
    try {
      const { hotelEmail, bookingDetails } = req.body;
  console.log('bk',bookingDetails)
  console.log('ck',hotelEmail)
      // Send email to the hotel
      const queryParams = new URLSearchParams(bookingDetails).toString();
  // HTML content for the email
  const bookingLink=`http://localhost:4000/v1/confirmbooking?${queryParams}`
  const emailHtml = `
  <p>You have a new booking request for Room ${bookingDetails.roomname}:</p>
  <ul>
    <li>Name: ${bookingDetails.name}</li>
    <li>Email: ${bookingDetails.email}</li>
    <li>CNIC: ${bookingDetails.cnic}</li>
    <li>Country: ${bookingDetails.country}</li>
    <li>CheckInDate: ${bookingDetails.checkInDate}</li>
    <li>CheckOutDate: ${bookingDetails.checkOutDate}</li>
    <li>Price For Room: ${bookingDetails.price}</li>
    <!-- Add more booking details here -->
  </ul>
  <p><a href="${bookingLink}"><button>Confirm Booking</button></a></p>
`;

      const mailOptions = {
        from: bookingDetails.email,
        to: hotelEmail,
        subject: 'New Booking Request',
        html:emailHtml
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Booking request email sent and data saved successfully.' });
    } catch (error) {
      console.error('Error sending booking email:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  });
  

  // Create a route for confirming bookings
app.get('/v1/confirmbooking', async (req, res) => {
  try {
    console.log('req..qqqq',req.query)
    // const bookingUserData = req.body;
    const queryParams = new URLSearchParams(req.query).toString();
  //   // HTML content for the email
    const bookingLinks=`http://localhost:4000/v1/addpaymentpage?${queryParams}`
    const emailHtml = `
    <p>Click to proceed</p>
  <h2>Hi ${req.query.name} , We on the behalf of ${req.query.hotelName} have accepted your offer for ${req.query.price}  for you. We booked your room number ${req.query.roomname} on the date from ${req.query.checkInDate} to ${req.query.checkOutDate}, for confirm Please click the PAYMENT BELOW!!THANKS</h2>
    <p><a href="${bookingLinks}"><button>Go For Payment Integration</button></a></p>
  `;
    // Send booking confirmation email to user
    await transporter.sendMail({
      from: req.query.hotelEmail,
      to: req.query.email,
      subject: 'Booking Confirmation',
      html: emailHtml,
    });
res.send('confirmed')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Booking confirmation failed' });
  }
});
  
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
console.log('amount',req.body)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    console.log('hhhh',paymentIntent.client_secret )
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 
  
app.get('/v1/addpaymentpage',(req,res)=>{
  try {
    console.log('i want here ',req.query)
    const bookingData = req.query;
    const encodedBookingData = encodeURIComponent(JSON.stringify(bookingData));
    res.redirect(`http://localhost:3000/success/?bookingdata=${encodedBookingData}`);
  } catch (error) {
    
  }
})


app.post('/v1/google-signin', async (req, res) => {
  const { token } = req.body;
 

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: '157698735716-9mm9u6eg3t7sfip697emcucaaopjgpd0.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;

    // You can use the userId to identify and manage user sessions on your backend.

    res.status(200).send('Google Sign-In Successful');
  } catch (error) {
    res.status(401).send('Google Sign-In Failed');
  }
});


app.get('/v1/callback',async(req,res)=>{
  console.log('req.code',req.query.code)
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: '157698735716-v65d39mm2m0mjgakscpd707g8lm21cpv.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:4000/v1/callback',
      grant_type: 'authorization_code',
      code:req.query.code,
    },
  });
  const access_token=data.access_token;
  const profile= await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userData = profile.data;

    // Set the user data in a cookie
    localStorage.setItem('userData', JSON.stringify({
      username: userData.name,
      email: userData.email,
      picture:userData.picture
    }));

  req.userData=userData
const userEmail=userData.email;
const present=await isEmailPresent(userEmail);
if(!present){
  try {
    const newUser = await User.query().insert({
      email: userEmail,
      name:userData.name
    });
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    res.redirect(`http://localhost:3000/dashboard/?userdata=${encodedUserData}`);
    console.log('New user saved:', newUser);
  } catch (error) {
    console.error('Error saving new user:', error);
  }

 
}
const encodedUserData = encodeURIComponent(JSON.stringify(userData));
res.redirect(`http://localhost:3000/dashboard/?userdata=${encodedUserData}`);

  // if the user email save in the User table


})

async function isEmailPresent(email) {
  try {
    const userWithEmail = await User.query().findOne({ email });
    return !!userWithEmail; // If userWithEmail is truthy, email is present
  } catch (error) {
    console.error('Error checking email presence:', error);
    return false; // Return false in case of an error
  }
}

app.get('/v1/userdata', (req, res) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  res.json(userData);
});

server.listen(PORT,()=>{
    console.log('my server is listing on port '+PORT)
})
