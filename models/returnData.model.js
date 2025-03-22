module.exports = class ReturnData {
    constructor() {
      this.success = false;
      this.message = this.defaultMessage();
      this.data = null;
    }
  
    defaultMessage() {
      return "Something went wrong, please try again later!";
    }
  
    toObject() {
      if (this.success && this.message === this.defaultMessage()) {
        return {
          success: true,
          data: this.data,
        };
      } else {
        return {
          success: this.success,
          message: this.message,
          data: this.data,
        };
      }
    }
  
    toString() {
      return JSON.stringify(this.toObject());
    }
  };