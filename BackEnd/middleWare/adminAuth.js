

const isAdmin = (req, res, next) => {
    // Check if the authenticated user has the admin role
    if (req.user.Role !== 'super admin') 
    {
        if(req.user.Role !== 'admin'){
        console.log(req.user.Role)
      return res.status(401).json({ error: 'Unauthorized' });
    }  }
    next();
  };

  module.exports =isAdmin