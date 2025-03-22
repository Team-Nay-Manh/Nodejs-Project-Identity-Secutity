class ReturnData {
  constructor(
    success = false,
    message = "Something went wrong, please try again later!",
    data = null
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  defaultMessage() {
    return "Something went wrong, please try again later!";
  }

  toObject() {
    return this.success
      ? {
          success: true,
          ...(this.message !== this.defaultMessage() && {
            message: this.message,
          }),
          data: this.data,
        }
      : { success: false, message: this.message, data: this.data };
  }

  toString() {
    return JSON.stringify(this.toObject());
  }
}

export default ReturnData;
