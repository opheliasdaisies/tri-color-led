var five = require("johnny-five"), board;

board = new five.Board();

board.on("ready", function() {
	var red = new five.Led(9);
	var green = new five.Led(10);
	var blue = new five.Led(11);

	var color = [
		red,
		green,
		blue,
	];

	var pressure = new five.Sensor({
		pin: "A1",
		freq: 100
	});

	pressure.on("read", function(err, value) {
		console.log(value);
		color.cycle(100, 1000, value);
	});

	color.cycle = function(min, max, value) {
		var range = max - min;
		var val = value - min;
		var seg = range/5;
		if (val < min) {
			color.off();
		} else if (val < seg) {
			green.on();
			var percentage = val/seg;
			red.brightness(1-(255*percentage));
			blue.brightness(255*percentage);
		} else if (val < seg*2) {
			blue.on();
			var percentage = (val-seg)/seg;
			green.brightness(1-(255*percentage));
			red.brightness(255*percentage);
		} else if (val < seg*3) {
			red.on();
			var percentage = (val-(seg*2))/seg;
			blue.brightness(1-(255*percentage));
			green.brightness(255*percentage);
		} else if (val < seg*4) {
			green.on();
			var percentage = (val-(seg*3))/seg;
			red.brightness(1-(255*percentage));
			blue.brightness(255*percentage);
		} else {
			blue.on();
			var percentage = (val-(seg*4))/seg;
			green.brightness(1-(255*percentage));
			red.brightness(255*percentage);
		}
	};


	color.off = function() {
		this.forEach(function(color){
			color.on();
		});
	};

/*	color.white = function() {
		this.forEach(function(color){
			color.off();
		});
	};

	color.red = function() {
		red.off();
		green.on();
		blue.on();
	};

	color.green = function() {
		red.on();
		green.off();
		blue.on();
	}

	color.blue = function() {
		red.on();
		green.on();
		blue.off();
	}

	color.cyan = function() {
		red.on();
		green.off();
		blue.off();
	}

	color.magenta = function() {
		red.off();
		green.on();
		blue.off();
	}

	color.yellow = function() {
		red.off();
		green.off();
		blue.on();
	}

	board.repl.inject({
		color: color,
		red: red,

	}); */

});
