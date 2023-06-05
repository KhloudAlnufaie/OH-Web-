import mongoose from 'mongoose';
const Schema = mongoose.Schema(

	{
		day: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الأول"],
		},
		time: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الثاني"],
		},
		code: {
			type: String,
			required: [true, "الرجاء إدخال الاسم الثالث"],
		},
		Section: {
			type: String,
			required: [true, "الرجاء إدخال اسم العائلة"],
		},
		Status: {
			type: String,
			required:  [true, "الرجاء إدخال البريد الإلكتروني"],
		},
		teacher_id: {
			type: String,
			required:  [true, "الرجاء إدخال معرف المعلم"],
		},
		student_id:{
			type: String,
			required:  [true, "الرجاء إدخال معرف الطالب"],
		}

	},
	{
		timestamps: true
	}
);
  
  const ReservationSchema = mongoose.model("Reservation", Schema);
    
 // export const schema = Reservation.schema;
  export default ReservationSchema;
  //module.exports = Reservation;
  
