const hasPermission = (...permissionCodes) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Role not assigned",
        });
      }

      const userPermissions =
        req.user.role.permissions?.map((p) => p.code) || [];
      const allowed = permissionCodes.some((permission) =>
        userPermissions.includes(permission)
      );

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: "Permission Denied",
        });
      }

      next();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default hasPermission;


