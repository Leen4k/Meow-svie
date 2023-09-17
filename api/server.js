const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const admin = require('firebase-admin');
const credentials = require('./key.json');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdash2eirh2i";
const cookieParser = require("cookie-parser")



app.use(cors({ 
    credentials: true,
    origin: "http://localhost:3000",
})) ;

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore(); 



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

//logout
app.post("/logout-admin",(req,res) => {
    res.cookie("token","").json(true);
})

app.get("/admin-profile", async (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err,data)=>{
            if (err) throw err;
            res.json(data); 
        })
    }else{
        res.json(null);
    }
})


app.get("/admins", async (req, res) => {
    try{
        const adminRef = db.collection("admins");
        const response = await adminRef.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        res.json(responseArr);
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.post("/login-admin", async (req, res) => {
    const {email, password} = req.body;
    const adminDoc = db.collection("admins");
    const response = await adminDoc.where("email","==",email).get();
    if(!response.empty){
        
        const responseArr = [];
        let adminPassword;
        let userDoc;
        
        response.forEach(doc => {
            responseArr.push(doc.data());   
            userDoc = doc.data();    
            adminPassword = doc.data().password;
        })            
        
        const passOk = bcrypt.compareSync(password,adminPassword)

        if(passOk){
            jwt.sign({email:userDoc.email, id:userDoc.admin_id, name:userDoc.name, photo:userDoc.photo}, jwtSecret, {}, (err,token) => {
                 if(err) throw err;
                 res.cookie("token", token).json(userDoc);
            })
        }else{ 
            res.status(422).json("pass not ok")
        }

    }else{
        res.status(422).json("no user found");
        console.log("hikhik")
    }
})


app.post("/register-admin", async (req, res) => {
    try {
        const { name, email, password, photo } = req.body
        const bcryptSalt = await bcrypt.genSalt(10);

        const response = await db.collection("admins").where("email","==",email).get();
        if(!response.empty){
            console.log(response);
            res.status(409).json("user already registered");        
        }else{
            const documentRef = admin.firestore()
            .collection("admins")
            .doc();

            const adminDoc = await admin.firestore()
                .collection("admins")
                .doc(documentRef.id)
                .set({
                    admin_id: documentRef.id,
                    name,
                    email,
                    photo,
                    password: bcrypt.hashSync(password, bcryptSalt)
                });

            res.status(200).json("ok");
        }


    } catch (err) {
        res.status(422).json(err);
        console.log(err)
    }
});

app.delete("/event/:event_id", async (req, res) => {
    const {event_id} = req.params
    try{
        const response = await db.collection("events").doc(event_id).delete();
        res.json(response);
    }catch(err){
        console.log(err);
        res.json(err);
    }
})


app.put('/event/:id', async(req, res) => {
    try {
      const {id} = req.params;
      console.log(id)
      const newSeats = req.body.seatInfo;
      const booking_id = req.body.booking_id;
      const showTime = req.body.showTime;
      console.log(newSeats)
      const eventRef = await db.collection("events").doc(id)
      .update({
        seats: newSeats,
        booking_id,
      });
      res.json(eventRef);
    } catch(error) {
      console.log(error)
      res.json(error)
    }
  });


  app.put('/event_time/:id', async(req, res) => {
    try {
      const {id} = req.params;
      console.log(id)
      const showTime = req.body.showTime;
      const eventRef = await db.collection("events").doc(id)
      .update({
        showTime
      });
      res.json(eventRef);
    } catch(error) {
      console.log(error)
      res.json(error)
    }
  });


app.get("/event", async (req,res) =>{
    try{
        const eventRef = db.collection("events");
        const response = await eventRef.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        res.json(responseArr);
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.get("/event/:event_id", async (req, res) => {
    try{
        const {event_id} = req.params
        const eventRef = db.collection("events").doc(event_id);
        const response = await eventRef.get();
        res.json(response.data());
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.post("/event", async (req, res) => {
    try{
        // const eventData = {
        //     title: req.body.title,
        //     date: req.body.date,
        //     cinema: req.body.cinema,
        // }
        const {cinema, date, movie_title, time, movie_id, movieImg, seats, startingRow, endingRow, seatsPerRow} = req.body;

        const documentRef = admin.firestore()
        .collection("events")
        .doc()

        const response = await admin.firestore()
        .collection("events")
        .doc(documentRef.id)
        .set({cinema, date, movie_title, showTime:time, movie_id, movieImg, seats, startingRow, endingRow, seatsPerRow, event_id: documentRef.id })

        res.json(response)
        console.log(response)
    }catch(err){
        console.log(err)
    }
})

app.post("/movie", async (req,res)=>{

    // try{
    //     const movieData = {
    //         movies: req.body.movies,
    //     }
        
    //     const response = await db.collection("movies").add(movieData);
    //     res.json(response)
    //     console.log(response)
    // }catch(err){
    //     res.json(err);
    //     console.log(err)
    // }

    //mapping data from the api's
    // try {
    //     let fdata = req.body.results;
    //     console.log(fdata)
    //     for (const obj of req.body.results) {
    //       // Add each object as a document to a Firestore collection
    //       await db.collection('movies').add(obj);
    //     }
    //     console.log('Documents added to Firestore');
    //   } catch (error) {
    //     console.error('Error adding documents:', error);
    // }
})

app.post("/booking", async (req, res) => {
    try{
        const {bookingInfo} = req.body;
        // bookingInfo.map(booking => (booking.total))
        console.log(bookingInfo)



        const documentRef = admin.firestore()
        .collection("bookings")
        .doc()

        const bookingWithId = { ...bookingInfo[0], booking_id: documentRef.id };

        const response = await admin.firestore()
        .collection("bookings")
        .doc(documentRef.id)
        .set(bookingWithId)
        
        // const response = await db.collection('bookings').add(bookingInfo[0]);
        res.json({booking_id: documentRef.id});
    }catch(err){
        console.log(err)
    }
})

app.get("/booking", async (req,res) =>{
    try{
        const bookingRef = db.collection("bookings");
        const response = await bookingRef.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        res.json(responseArr);
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.post("/cinema", async (req,res)=>{
    try{


        const documentRef = admin.firestore()
        .collection("events")
        .doc()

        const cinemaData = {
            cinema: req.body.cinema,
            screen: req.body.screen,
            location: req.body.location,
            seats: req.body.seats,
            cinema_id: documentRef.id,
            imageUrls: req.body.downloadUrls,
            startingRow:req.body.startingRow, 
            endingRow:req.body.endingRow, 
            seatsPerRow:req.body.seatsPerRow
        }

        const response = await admin.firestore()
        .collection("cinemas")
        .doc(documentRef.id)
        .set(cinemaData)
        res.json(response);

        // const response = await db.collection("cinemas").add(movieData);
        // res.json(response)
        // console.log(response)
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.get("/cinema", async (req, res)=>{
    try{
        const movieRef = db.collection("cinemas");
        const response = await movieRef.get();
        const responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        })
        res.json(responseArr);
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.get("/cinema/:cinema_id", async (req, res) => {
    try{
        const {cinema_id} = req.params
        const cinemaRef = db.collection("cinemas").doc(cinema_id);
        const response = await cinemaRef.get();
        res.json(response.data());
    }catch(err){
        res.json(err);
        console.log(err)
    }
})

app.put('/cinema/:cinema_id', async(req, res) => {
    try {
      const {cinema_id} = req.params;
    //   const newCinema = req.body.cinema;
      const {cinema,location,screen,downloadUrls,seats,startingRow, endingRow, seatsPerRow} = req.body;
      const cinemaRef = await db.collection("cinemas").doc(cinema_id)
      .update({
        cinema,location,screen,imageUrls:downloadUrls,seats,startingRow, endingRow, seatsPerRow
      });
      res.json(cinemaRef);
    } catch(error) {
      console.log(error)
      res.json(error)
    }
  });

app.delete("/cinema/:cinema_id", async (req, res) => {
    const {cinema_id} = req.params
    try{
        const response = await db.collection("cinemas").doc(cinema_id).delete();
        res.json(response);
    }catch(err){
        console.log(err);
        res.json(err);
    }
})

app.listen(port,(req,res)=>{
    console.log("listening to port " + port);
});