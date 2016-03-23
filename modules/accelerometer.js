var i2c = require('i2c-bus'),
  i2c1;


function Accelerometer(options) {
	if (options) {
		this.i2c_num= options.num ? options.num : 1;
		this.address= options.address ? options.address : LSM303_ADDRESS_ACCEL_DEFAULT;
		this.reg1_a_cmd = options.reg1_a_cmd ? options.reg1_a_cmd : LSM303_ACCEL_CTRL_REG1_AXIS_Z_Y_X | LSM303_ACCEL_CTRL_REG1_RATE_100HZ
		this.reg4_a_cmd = options.reg4_a_cmd ? options.reg4_a_cmd : LSM303_ACCEL_CTRL_REG4_FS_16G | LSM303_ACCEL_CTRL_REG4_HR
	}
}
Accelerometer.prototype.init = function() {
	this.i2c1 = i2c.open(this.i2c_num, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("I2C inicialized.")
  	});
  	this.i2c1.writeByte(this.address, LSM303_ACCEL_CTRL_REG1_A, this.reg1_a_cmd, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("LSM303 Accelerometer inicialized.")
  	});
  	this.i2c1.writeByte(this.address, LSM303_ACCEL_CTRL_REG4_A, this.reg4_a_cmd, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("LSM303 Accelerometer resolution and scale successfuly set.")
  	});
}
Accelerometer.prototype.read = function(done) {
	this.i2c1.readByte(this.address, 0x28, )
	this.i2c1.i2cRead(addr, length, buffer, cb)
};

