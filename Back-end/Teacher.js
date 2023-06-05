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
	Gender:  {
		type: String,
		required:  [true, "الرجاء إدخال الجنس"],
	},
	OfficeNumber: {
		type: String,
		required:  [true, "الرجاء إدخال رقم المكتب"],
	},
	Schedule: {
		type: String,
		required:  [true, "الرجاء إدخال رابط الجدول"],
	},
	Office_Hours: {	
		Day_Time: {
			type: Object,
			required:  [true, "الرجاء إدخاال اليوم والوقت لساعة المكتبية"],
		}
	},
	Course:{
		Subject_Section: {
			type: Object,
			required:  [true, "الرجاء إدخال المادة والشعبة"],
		}
	}
	
	},
	{
		timestamps: true
	}
);
  
 const TeacherSchema = mongoose.model("Teacher", Schema);

 export default TeacherSchema;