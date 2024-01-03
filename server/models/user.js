const {model,Schema} = require("mongoose")

const emailRegex=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// defining schema
const userSchema = new Schema({
    userName: {type:String,required:[true,"name must not be empty"]},
    email: {
        type:String,
        unique:true,
        required:[true,"email must not be empty"],
        validate:{
            validator:(email)=>emailRegex.test(email),
            message:(props)=>`${props.value} is not a valid email`
        }
    },
    message: {
        type:String,
        required:[true,"message must not be empty"],
    },
    
},{timestamps:true});

const User = model("User", userSchema);

module.exports = User;