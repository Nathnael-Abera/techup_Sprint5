const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
name:{
    type:String,
    require :[ true, 'please enter name']
},
email:{
    type:String,
    require :[ true, 'please enter email']
},
password:{
    type:String,
    require :[ true, 'please enter password']
},
Role: {
    type: String,
    enum: ['candidate', 'admin', 'super admin'],
  },

},
{
    timestamps:true
})
module.exports = mongoose.model( 'user',userSchema)