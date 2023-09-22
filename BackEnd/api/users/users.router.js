const router =require('express').Router()
const {registerUser,LoginUser,getUser,updateUser,deleteUser,getAllUser} = require('./users.controller')
const auth =require('../../middleWare/auth')
const requireSuperAdmin =require('../../middleWare/SuperAdminAuth')




router.post('/',auth,requireSuperAdmin,registerUser)
router.put('/:id',auth,requireSuperAdmin, updateUser);
router.delete('/:id',auth,requireSuperAdmin, deleteUser);
router.post('/login',LoginUser)
router.get('/me',auth,getUser)
router.get('/all',requireSuperAdmin,getAllUser)

module.exports = router
