const errormiddlewares = (err, req, res, next) => {
  try {
    let error = { ...err }
    error.message = err.message

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found"
      error = new Error(message)
      error.statusCode = 404
    }

    //Mongoose duplicate key
    if (err.name === 11000) {
      const message = "Duplicated fied value enterd"
      error = new Error(message)
      error.statusCode = 400
    }

    //Mongoose validate error
    if (err.name === "ValidateError") {
      const message = Object.values(err.errors).map((val) => val.message)
      error = new Error(message.join(", "))
      error.statusCode = 400
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" })
  } catch (error) {
    next(error)
  }
}

export default errormiddlewares
