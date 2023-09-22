

const requireSuperAdmin  = (req, res, next) => {
    // Check if the authenticated user has the super admin role
    if (req.user.Role !== 'super admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };

  module.exports =requireSuperAdmin 