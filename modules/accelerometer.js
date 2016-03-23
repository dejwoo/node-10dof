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
	i2c1 = i2c.open(this.i2c_num, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("I2C inicialized.")
  	});
  	i2c1.writeByte(this.address, LSM303_ACCEL_CTRL_REG1_A, this.reg1_a_cmd, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("LSM303 Accelerometer inicialized.")
  	});
  	i2c1.writeByte(this.address, LSM303_ACCEL_CTRL_REG4_A, this.reg4_a_cmd, function (err) {
  		if (err) {
  			throw err;
  		}
  		console.log("LSM303 Accelerometer resolution and scale successfuly set.")
  	});
}

i2c1 = i2c.open(1, function (err) {
  if (err) throw err;

  (function readTempHigh() {
    i2c1.readWord(DS1621_ADDR, DS1621_CMD_ACCESS_TH, function (err, tempHigh) {
      if (err) throw err;
      console.log(tempHigh);
      readTempHigh();
    });
  }());

  (function readId() {
    i2c1.readByte(TSL2561_ADDR, TSL2561_CMD | TSL2561_REG_ID, function (err, id) {
      if (err) throw err;
      console.log(id);
      readId();
    });
  }());
});