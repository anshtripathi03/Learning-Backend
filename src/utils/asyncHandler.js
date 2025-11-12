const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.log("Async error:", error)

      const statusCode = 
      typeof error.statusCode === "number"
      ? error.statusCode :
      500 ;

      res.status(statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export { asyncHandler };
