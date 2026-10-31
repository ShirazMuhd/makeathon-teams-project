import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,lowercase:true,trim:true,unique:true,index:true},passwordHash:{type:String,required:true,select:false},role:{type:String,enum:['admin','staff','customer'],default:'customer'},customerId:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},isActive:{type:Boolean,default:true},resetTokenHash:String,resetTokenExpires:Date},{timestamps:true});
schema.index({email:1},{unique:true});export default mongoose.model('User',schema);
