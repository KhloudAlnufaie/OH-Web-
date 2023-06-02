const zip_path = require.resolve('./assets/js/Main');
const zip = require(zip_path);

const message_booking = "";
const message_canclation = "";

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
		
		let student = await Student.find({_id : studentID});
		console.log(student[0]);
		
		student = student[0];
		//const name = ;
		//let student_name = ;
		const student_full_name = student.user.Fname +" "+ student.user.Sname +" "+ student.user.Tname +" "+ student.user.Lname;
		const student_email = student.user.email;
		
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
	
//===========
		
	const userEmail  = "wksalghaith@sm.imamu.edu.sa";

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
            name : teacher_names[teacherID],
            intro: "تم حجز موعد في ساعتك المكتبية",
            table : {
                data : [
                    {
                        "أسم الطالب/ة" : student_full_name,
                        "المقرر": code,
						"الشعبة": Section,
                        "اليوم" : day,
						"الوقت" : time,
						"بريد الطالب" : student_email,
						
                    }
                ]
            },
            outro: "شاكرين لك وقتك"
        }
    }

    let mail = MailGenerator.generate(response)
	
	console.log(mail);

    let message =  
	{
        from : 'imam.cs.oh@gmail.com',
        to : userEmail,
        subject: "تطبيق ساعة مكتبية (Office Hour Application)",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <style type="text/css" rel="stylesheet" media="all">
@media only screen and (max-width: 600px) {
  .email-body_inner,
.email-footer {
    width: 100% !important;
  }
}
@media only screen and (max-width: 500px) {
  .button {
    width: 100% !important;
  }
}
</style>
</head>
<body dir="ltr" style="height: 100%; margin: 0; line-height: 1.4; background-color: #F2F4F6; color: #74787E; -webkit-text-size-adjust: none; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%;">
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0; padding: 0; background-color: #F2F4F6;" bgcolor="#F2F4F6">
    <tr>
      <td align="center" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0; padding: 0;">
          <!-- Logo -->
          <tr>
            <td class="email-masthead" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 25px 0; text-align: center;" align="center">
              <a class="email-masthead_name" href="https://mailgen.js/" target="_blank" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; font-size: 16px; font-weight: bold; color: #2F3133; text-decoration: none; text-shadow: 0 1px 0 white;">

                  ساعة مكتبية

                </a>
            </td>
          </tr>
          <!-- Email Body -->
          <tr>
            <td class="email-body" width="100%" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0; padding: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2; background-color: #FFF;" bgcolor="#FFF">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 570px; margin: 0 auto; padding: 0;">
                <!-- Body content -->
                <tr>
                  <td class="content-cell" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 35px;">

                      <h1 style="margin-top: 0; color: #2F3133; font-size: 19px; font-weight: bold; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">استاذنا العزيز نفيدك علماً أنه</h1>


                                              <p style="margin-top: 0; color: #74787E; font-size: 16px; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">تم حجز موعد في ساعتك المكتبية</p>


                    <!-- Dictionary -->


                    <!-- Table -->

                                            <h1 class="data-table-title" style="margin-top: 0; color: #2F3133; font-weight: bold; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0; font-size: 17px; padding: 20px 0 15px 0;"></h1>
                      <table class="data-wrapper" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0; padding: 0 0 35px 0;">
                        <tr>
                          <td colspan="2" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">
                            <table class="data-table" width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; margin: 0;">
                              <tr>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">أسم الطالب/ة</p>
                                  </th>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">المقرر</p>
                                  </th>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">الشعبة</p>
                                  </th>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">اليوم</p>
                                  </th>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">الوقت</p>
                                  </th>

                                  <th style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; text-align: left; padding: 0px 5px; padding-bottom: 8px; border-bottom: 1px solid #EDEFF2;" align="left">
                                    <p style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; color: #9BA2AB; font-size: 12px;">بريد الطالب</p>
                                  </th>

                              </tr>

                              <tr>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + student_full_name + `
                                  </td>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + code + `
                                  </td>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + Section + `
                                  </td>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + day + `
                                  </td>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + time + `
                                  </td>

                                  <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 10px 5px; color: #74787E; font-size: 15px; line-height: 18px;">
                                    ` + student_email + `
                                  </td>

                              </tr>

                            </table>
                          </td>
                        </tr>
                      </table>



                    <!-- Action -->


                    <!-- Support for Gmail Go-To Actions -->



                                              <p style="margin-top: 0; color: #74787E; font-size: 16px; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">شاكرين لك وقتك</p>



                      <p style="margin-top: 0; color: #74787E; font-size: 16px; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;"></p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; width: 570px; margin: 0 auto; padding: 0; text-align: center;">
                <tr>
                  <td class="content-cell" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 35px;">
                    <p class="sub center" style="margin-top: 0; line-height: 1.5em; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box; color: #AEAEAE; font-size: 12px; text-align: center;">
                      &copy; 2023 <a href="https://mailgen.js/" target="_blank" style="color: #3869D4; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-box-sizing: border-box; box-sizing: border-box;">ساعة مكتبية </a>. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    }
	
    transporter.sendMail(message).catch(error => {
        return res.status(500).json({ error })
    })
//===========		
		

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

