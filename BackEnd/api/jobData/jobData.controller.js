const JOb = require('../../models/jobsModel')
const Job =require('../../models/jobsModel')
const user =require('../../models/usersModel')

//@desc create job
//@route /api/jobdata
//@access public
const createJob = async(req, res) => {
    try {
        const companyName =req.body.company;
        const jobLocation =req.body.location;
        const jobTitle =req.body.role;
        const jobPostion =req.body.position;
        const jobLevel =req.body.level;
        const jobContract =req.body.contract;
        const PostedAt =req.body.createdAt
        
        const jobOld = await  Job.find({$and:[{company:companyName},{location:jobLocation},{role:jobTitle},{position:jobPostion},{level:jobLevel},{contract:jobContract}]})

        
        if(jobOld.length>0){
            for (i=0;i<=jobOld.length;i++){

                const oldDate=jobOld[i].createdAt
                const date1 = new Date(PostedAt);
                const date2 = new Date(oldDate);
                const fifteenDaysBeforeDate2 = new Date(date2.getTime());
                fifteenDaysBeforeDate2.setDate(date2.getDate() - 15);
                
                if (!(date1.getTime() < fifteenDaysBeforeDate2.getTime())) {
                //   console.log('date1 is before 15 days before date2');
                  return res.status(400).json({msg:`you have posted this job before!`,jobOld})
                }
            }

            }
        if (!req.body.company||!req.body.logo||!req.body.position||!req.body.role||!req.body.level||!req.body.contract||!req.body.location||!req.body.languages||!req.body.tools) {
            res.status(400)
            throw new Error ('have no new job to post or create please fill out the form')
        }
        // if(typeof(req.body.company)||!req.body.logo||!req.body.position||!req.body.role||!req.body.level||!req.body.contract||!req.body.location||!req.body.languages||!req.body.tools)
      
        else{
           
            const job= await Job.create({       
                 ...req.body,
                user: req.user.id,})
            res.status(201).json({msg:"job created",job})
   
        }
        
    } catch (error) {
           console.log(error.message)
           res.status(500).json({message_err:error.message})
    }

}
//@desc get all job
//@route /api/jobdata
//@access public
const getJob = async(req, res) => {
    const perPage = parseInt(req.query.perPage) || 5; // Number of jobs per page, defaulting to 5
    const page = parseInt(req.query.page) || 1; // Page number, defaulting to 1
    try {
        const jobs = await  Job.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        res.status(201).json(jobs)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    } 
}
//@desc get job using company name
//@route /api/jobdata
//@access public
const filterJobs = async (req, res) => {
    const { company, location, role } = req.query;
  
    try {
      let query = Job.find();
  
      if (company) {
        query = query.where('company').equals(company);
      }
  
      if (location) {
        query = query.where('location').equals(location);
      }
  
      if (role) {
        query = query.where('role').equals(role);
      }
  
      const filteredJobs = await query.sort({ createdAt: -1 }).exec();
  
      console.log('Filtered Jobs:', filteredJobs);
      res.status(200).json(filteredJobs);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
//@desc  get job sorted by job title, company name, and job location.
//@route /api/jobdata
//@access public
const getSortedJob = async(req, res) => {
    const perPage = parseInt(req.query.perPage) || 5; // Number of jobs per page, defaulting to 5
    const page = parseInt(req.query.page) || 1; // Page number, defaulting to 1
    try {
             const sorted = await  Job.find({}).sort({company:'asc',position:'asc',location:'asc'})
             .skip((page - 1) * perPage)
             .limit(perPage)
              console.log('Sorted Jobs:', sorted);
              res.status(201).json(sorted)
  
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    } 
}
//@desc  get job sorted by posted date.
//@route /api/jobdata
//@access public
const getSortByDate = async(req, res) => {
    const perPage = parseInt(req.query.perPage) || 5; // Number of jobs per page, defaulting to 5
    const page = parseInt(req.query.page) || 1; // Page number, defaulting to 1
    try {
             const sorted = await  Job.find({}).sort({createdAt:1})
             .skip((page - 1) * perPage)
             .limit(perPage)
              console.log('Sorted Jobs:', sorted);
              res.status(201).json(sorted)
  
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    } 
}
//@desc get job using id
//@route /api/jobdata
//@access public
const getJobById = async(req, res) => {
    const id =req.params.id;
    try {
        const jobsById = await  Job.find({_id:id})
        if (!jobsById){
            res.status(400).json({msg:`job with id no ${id} not found `})
       }
        res.status(200).json({_id:id,jobsById})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    } 
}
//@desc update job
//@route /api/jobdata/id
//@access public
const updateJob = async(req, res) => {
    try {
        const id=req.params.id
        const update = await Job.findOneAndUpdate({ _id: id }, { $set: req.body });
        if (!update){
             res.status(400).json({msg:`job with id no ${id} not found `})
        }
        const Updated = await JOb.find({_id:id})
       res.status(200).json({msg:`job with id no ${id} is updated `,Updated})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }

}
//@desc delete job
//@route /api/jobdata/id
//@access public
const deleteJob =async (req, res) => {
    try {
        const id=req.params.id
        const deleted = await Job.findOneAndDelete({ _id: id });
        if (!deleted){
          return   res.status(400).json({msg:`job with id no ${id} not found `})
        }
       res.status(200).json({msg:`job with id no ${id} is Delated `,deleted})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
module.exports ={createJob,getJob,deleteJob,updateJob,filterJobs,getSortedJob,getJobById,getSortByDate}