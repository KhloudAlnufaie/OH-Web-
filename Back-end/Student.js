import mongoose from 'mongoose';
const Schema = mongoose.Schema(

	{
	user: {
		Fname: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الأول"],
		},
		Sname: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الثاني"],
		},
		Tname: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الثالث"],
		},
		Lname: {
			type: String,
			required: [true, "الرجاء إدخال اسم العائلة"],
		},
		email: {
			type: String,
			required:  [true, "الرجاء إدخال البريد الإلكتروني"],
		}
	},
	password: {
		type: String,
		required:  [true, "الرجاء إدخال كلمة السر"],
	},
	ReservationList: {
		type: Array,
		required:  false,
	}
	
	},
	{
		timestamps: true
	}
);
  
  const StudentSchema = mongoose.model("Student", Schema);
  
 // export const schema = Student.schema;
  export default StudentSchema;
 // module.exports = Student;
  
  
		