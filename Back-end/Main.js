
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
	super(Fname, Sname, Tname, Lname, Email, Password);
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

class Teacher extends User{
  constructor(Fname, Sname, Tname, Lname, Email, OfficeNumber, Schedule) { 
	super(Fname, Sname, Tname, Lname, Email, OfficeNumber, Schedule);
	this.Office_Hours = null;
	this.Schedule = Schedule;
	this.OfficeNumber = OfficeNumber;
  }
 
}

class Reservation{
	constructor(date, Day, Time, Section, Course_code, Teacher) { 
	this.Status = "Active";
	this.Day = Day;
	this.Time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
	this.date = date;
	this.Section = Section;
	this.Course_code = Course_code;
	this.Teacher = Teacher;
  }
  
  Send_Notification(){
	  
	  
  }
}

let newDate = new Date();

let obj1 = new User("وئام","خالد","صالح","الغيث","wksalghaith@sm.imamu.edu.sa");
let obj2 = new Student("وئام","خالد","صالح","الغيث","wksalghaith@sm.imamu.edu.sa", "123489");
let obj3 = new Teacher("وئام","خالد","صالح","الغيث","wksalghaith@sm.imamu.edu.sa", "2A-143", "https://drive.google.com/file/d/1fhfmnSrGG0NvRYJGtNST8a8SZgWmAemh/view?usp=share_link");
let Res = new Reservation(newDate,"الاثنين", newDate.getTime(), "373", "CS-140", obj3);

console.log(obj1);
console.log(obj2);
console.log(obj3);
console.log(Res);