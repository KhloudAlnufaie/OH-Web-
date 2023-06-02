const zip_path = require.resolve('./assets/js/Main');
const zip = require(zip_path);

const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

// to process connection request and response.
const express = require('express');

// to help us with mongodb 
const mongoose = require('mongoose');

const morgan = require('morgan');

//const ejs = require('ejs');

// used to parse incoming bodies.
const bodyParser = require('body-parser');

const Student = require('./models/Student');
const Reservation = require('./models/Reservation');
const Teacher = require('./models/Teacher');

const path = require('path');

// connect to mangoDB (start)=============================================

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});

// connect to mangoDB (end)=============================================


// create app (start) ==================================================
const app = express();

// to read bady of the request
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let port = 8080;
app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create app (end) ==================================================


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/mail', async function(req, res) {
	

			//===========
		  /** testing account */
		  
		  	/*
		let testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }

	   //console.log(message);
        transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })*/
	

	
});

app.get('/mybooking', async function(req, res) {
	try{	
		
		Reservation.find({}).then( async function(reservations){
		
		//consol.log('reservations.teacher_id: ', reservations);  { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
		let ids = [];
		
		reservations.forEach(e => {ids.push(e.teacher_id)});
		
		let Ta_ids = await Teacher.find({"_id": { $in: Array.from(ids) } });

		let teacher_names = {}

		
		for (let [x, y] of zip([ids, Ta_ids])) {
			let name = y.user.Fname + " " +y.user.Lname;
			teacher_names[x] = name;
		}
		

		for (const prop in teacher_names) {
			console.log(`key: ${prop}, value: ${teacher_names[prop]}`);
		}
	
		

		res.render('mybooking', {reserv_list: reservations, teacher_id_names:  teacher_names}).catch(function(err){console.log(err);})
	

		}).catch(function(err){
		console.log(err);
		});

	
	} catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

app.post('/booking', async function(req, res) {
	try{	
		let time = req.body.time;
		let code = req.body.code;
		let day = req.body.day;
		let Section = req.body.Section;
		
		let teacherID = "6473a03a3fc0e469ac27af03";
		let studentID = "647320b0800866dd71d7f804";
		
		let Status = "active";

		const reservation = await Reservation.create({'day': day, 'time': time, "code": code, "Section": Section, "Status": Status, "teacher_id": teacherID, "student_id": studentID});
		
		const student = await Student.find({_id : studentID});
		console.log(student);
		const name = student.user;
		let student_name = name.Fname;
		console.log(student_name);
		
//===========
		
	const userEmail  = "xanope8975@ratedane.com";

    let config = {
        service : 'gmail',
        auth : {
            user: 'imam.cs.oh@gmail.com',
            pass: 'f p g c o n k s d n n l t w x i'
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new mailgen({
        theme: "default",
        product : {
            name: "ساعة مكتبية ",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Dr. Basma",
            intro: "حجز موعد",
            table : {
                data : [
                    {
                        "أسم الطالب/ة" : "Nodemailer Stack Book",
                        "المقرر": "A Backend application",
						"الشعبة": "A Backend application",
                        "اليوم" : "$10.99",
						"الوقت" : "$10.99",
						"بريد الطالب" : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : 'imam.cs.oh@gmail.com',
        to : userEmail,
        subject: "تطبيق ساعة مكتبية (Office Hour Application)",
        html: mail
    }

    transporter.sendMail(message).catch(error => {
        return res.status(500).json({ error })
    })
//===========		
		
		Reservation.find({}).then( async function(reservations){
		
		//consol.log('reservations.teacher_id: ', reservations);  { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
		let ids = [];
		
		reservations.forEach(e => {ids.push(e.teacher_id)});
		
		let Ta_ids = await Teacher.find({"_id": { $in: Array.from(ids) } });

		let teacher_names = {}

		
		for (let [x, y] of zip([ids, Ta_ids])) {
			let name = y.user.Fname + " " +y.user.Lname;
			teacher_names[x] = name;
		}
		

		for (const prop in teacher_names) {
			console.log(`key: ${prop}, value: ${teacher_names[prop]}`);
		}
		

		res.render('mybooking', {reserv_list: reservations, teacher_id_names:  teacher_names}).catch(function(err){console.log(err);})

		}).catch(function(err){
		console.log(err);
		});

	
	} catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

app.get('/:id', async function(req, res) {
	try{	
		await Reservation.deleteOne({_id: req.params.id})
		
		Reservation.find({}).then( async function(reservations){
		

		let ids = [];
		
		reservations.forEach(e => {ids.push(e.teacher_id)});
		
		let Ta_ids = await Teacher.find({"_id": { $in: Array.from(ids) } });

		let teacher_names = {}

		
		for (let [x, y] of zip([ids, Ta_ids])) {
			let name = y.user.Fname + " " +y.user.Lname;
			teacher_names[x] = name;
		}
		

		for (const prop in teacher_names) {
			console.log(`key: ${prop}, value: ${teacher_names[prop]}`);
		}
		

		res.render('mybooking', {reserv_list: reservations, teacher_id_names:  teacher_names}).catch(function(err){console.log(err);})

		}).catch(function(err){
		console.log(err);
		});
		
	} catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

app.get('/booking.html', async function(req, res) {
	try{	
		const reservation = await Reservation.find({});
		res.status(200).json(reservation);

		
	} catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

/*
app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/myinfo.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/myinfo.html'));
});

app.get('/mybooking.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/mybooking.html'));
});

app.get('/about.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/about.html'));
});

app.get('/about.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/about.html'));
});

app.get('/signin.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/signin.html'));
});
*/



app.listen(port)

