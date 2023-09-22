const mongoose = require('mongoose')

const jobSchema =mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:'user',
        },
        company:
        {
            type:String,
            required:[true,'please Enter Company Name'],
        },
        logo:
        {
            type:String,
            required:[true,'please Enter Company Logo'],
        },
        new:
        {
            type:String,
            required:true,
        },
        featured:
        {
            type:String,
            required:true,
        },
        position:
        {
            type:String,
            required:[true,'please Enter Position'],
        },
        role:
        {
            type:String,
            required:[true,'please Enter Role'],
        },
        level:
        {
            type:String,
            required:[true,'please Enter Level of Expertise'],
        },
        contract:
        {
            type:String,
            required:[true,'please Enter Contract Type'],
        },
        location:
        {
            type:String,
            required:[true,'please Enter Location'],
        },
        languages:
        {
            type:Array,
            required:[true,'please Enter Languages '],
            default:[]

        },
        tools:
        {
            type:Array,
            default:[]
        },
    },
    {
        timestamps:true
    }
)

const JOb = mongoose.model('Job',jobSchema);
module.exports =JOb;
//var ago = moment.duration(moment().diff("2015-06-05")).humanize() + " ago";