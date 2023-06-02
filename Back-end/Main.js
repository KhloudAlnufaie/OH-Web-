const readExcel = require('read-excel-file/node');
const reader = require('xlsx');
const nodemailer = require('nodemailer');
let Ta_list = []

class User{
  constructor(Fname, Sname, Tname, Lname, Email) { 
	this.Fname = Fname;
	this.Sname = Sname;
	this.Tname = Tname;
	this.Lname = Lname;
	this.Email = Email;
  }
	
}

class Student extends User{
  constructor(Fname, Sname, Tname, Lname, Email, Password) { 
	super(Fname, Sname, Tname, Lname, Email);
	this.Password = Password;
	this.Reservation_list = new Array();
  }
  
   Sign_in(){
	  
  }

   Sign_up(){
	  
  }
  Make_reservation(){
	  
  }
  Cancel_reservation(){
	  
  }
  Modify_my_information(){
	  
  }
  Search_byname_teacher(){
	  
  }
  Displaty_teacher_info(){
	  
  }
	
}



class Reservation{
	constructor(date, Day, Time, Section, Courseccode, Teacher_id, Student_id) { 
	this.Status = "Active";
	this.Day = Day;
	this.Time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
	this.date = date;
	this.Section = Section;
	this.Course_code = Course_code;
	this.Teacher_id = Teacher_id;
	this.Student_id = Student_id;
  }
  
  Send_Notification(){
	  
	  
  }
}

class Teacher extends User{
  constructor(Arabic_name, OfficeNumber, Email, Gender, Schedule) { 
	
	Arabic_name = Arabic_name.split(" ");
	let name = [null, null, null, null]
	
	for(let i =0; i< Arabic_name.length; i++){
		name[i] = Arabic_name[i];
	}
	
	super(name[0], name[1], name[2], name[3], Email);
	this.Office_Hours = null;
	this.Schedule = Schedule;
	this.OfficeNumber = OfficeNumber;
	this.Gender = Gender;
	this.full_name = Arabic_name;
  }
 
}



function Create_Teacher_list(data){
	
	data = JSON.parse(JSON.stringify(data, null, 0))
	console.log(data[0]);
	console.log(data.length);
	Ta_number = data.length;

	for (let i = 0; i < data.length; i++) {
		let one_obj = new Array();
		one_obj.push(data[i].Name_Arabic);
		one_obj.push(data[i].Name_English);
		one_obj.push(data[i].Office_number);
		one_obj.push(data[i].Email);
		one_obj.push(data[i].Gender);
		one_obj.push(data[i].URL);

	let obj = new Teacher(one_obj[0], one_obj[2], one_obj[3], one_obj[4], one_obj[5]);
	data[i] = obj;

}

return data;
	
}


function get_TA_name(){
	/*
	let names = [];
	let Ta_number = get_TA_number();
	
	for(let i =0; i<Ta_number; i++ ){
			names.push(Ta_list[i].full_name.toString());
	}

	return names;
	*/
	return "بسمة الصولي";
	}
	
function read_gender(){
	
	//get_teacher_info();
	/*
	let gender = [];
	let Ta_number = get_TA_number();
	
	for(let i =0; i<Ta_number; i++ ){
			gender.push(Ta_list[i].Gender);
	}

	return gender;
	*/
	
	
	return 'F';
	
	}

	
function get_office_number(){
	/*
		let office_number_list = [];
		let Ta_number = get_TA_number();
		for(let i =0; i<Ta_number; i++ ){
			office_number_list.push(Ta_list[i].OfficeNumber);
		}

		return office_number_list;
	*/
	return '3A-135';
}
	
function get_TA_email(){
	
	/*
		let email_list = [];
		let Ta_number = get_TA_number();
		for(let i =0; i<Ta_number; i++ ){
			email_list.push(Ta_list[i].Email);
		}

		return email_list;
	*/

return 'basoli@imamu.edu.sa'	
	}
	

function get_TA_number(){  
	/*
	let count = 0;
	
	for(i in Ta_list){
		count++;
	}
	
	//return Ta_number;
	return count;
	
	*/
	return 1;
	}
	
	
	
function get_teacher_info(){
	
	read_excel_file();
	
}


function read_excel_file(){
	
	// Reading our test file
const file = reader.readFile('C:/Users/Weaam/OneDrive/سطح المكتب/w.s/final.y in CS/ساعة مكتبية/TAinfo.xlsx')
 
let data = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])

   temp.forEach((res) => {
      data.push(res)
   })
}

Ta_list = Create_Teacher_list(data);

}


// define the zip() function
module.exports = function* zip(arrays) {
  let iterators = arrays.map(a => a[Symbol.iterator]());
  while (true) {
    let results = iterators.map(it => it.next());
    if (results.some(r => r.done)) return;
    yield results.map(r => r.value);
  }
}




/*
let newDate = new Date();

let obj1 = new User("وئام","خالد","صالح","الغيث","wksalghaith@sm.imamu.edu.sa");
let obj2 = new Student("وئام","خالد","صالح","الغيث","wksalghaith@sm.imamu.edu.sa", "123489");
let obj3 = new Teacher("Weaam Khaled Saleh Alghaith","wksalghaith@sm.imamu.edu.sa", "2A-143", "https://drive.google.com/file/d/1fhfmnSrGG0NvRYJGtNST8a8SZgWmAemh/view?usp=share_link");
	 
	  

let Res = new Reservation(newDate,"الاثنين", newDate.getTime(), "373", "CS-140", obj3);
console.log(Res);

console.log(obj1);
console.log(obj2);
console.log(obj3);



/*
for(let i =0; i< l.lenght; i++){
	
	console.log(l[i]);
	
}

let output = JSON.parse(JSON.stringify(list, null, 0))
console.log(typeof output[0].Name_Arabic)
console.log(typeof output[0].Name_English)
console.log(typeof output[0].Office_number)
console.log(typeof output[0].Email)
console.log(typeof output[0].Gender)
console.log(typeof String(output[0].URL))

get_teacher_info();
console.log(Ta_list);

console.log('#Teacher: ' + get_TA_number());

console.log('Emails: ' + get_TA_email());

console.log("Office Number: "+ get_office_number());

console.log("Names: "+ get_TA_name());

console.log('Gender: '+read_gender());


*/

