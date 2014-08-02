require(["grid"], function(grid) {

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	// colorMinMaj();
	// square();
	// rect();
	// isometric();
	// dimetric();
	// isodimetric();
	// hex();
	// polar();
	// dots();
	// hexDots();
	// plus();
	// celtic();
	// triangle();
	all();

	function colorMinMaj() {
		grid.majorStrokeStyle = "blue";
		grid.minorStrokeStyle = "red";
		grid.thirdStrokeStyle = "green";

		grid.majorFillStyle = "blue";
		grid.minorFillStyle = "red";	
	}

	function square() {
		grid.square(context, 0, 0, width, height, 50, 25, 12.5);
	}

	function rect() {
		grid.rect(context, 0, 0, width, height, 50, 25);
	}

	function isometric() {
		grid.isometric(context, 0, 0, width, height, 50);
	}

	function dimetric() {
		grid.dimetric(context, 0, 0, width, height, 50);
	}

	function isodimetric() {
		grid.isometric(context, 0, 0, width / 2, height, 50);
		grid.dimetric(context, width / 2, 0, width / 2, height, 50);		
	}

	function hex() {
		grid.hex(context, 0, 0, width, height, 50);
	}

	function polar() {
		grid.polar(context, 0, 0, width, height, 50, 10);
	}

	function dots() {
		grid.dots(context, 0, 0, width, height, 30, 15);
	}

	function hexDots() {
		grid.hexDots(context, 0, 0, width, height, 50);
	}

	function plus() {
		grid.plus(context, 0, 0, width, height, 10, 50);
	}

	function celtic() {
		grid.celtic(context, 0, 0, width, height, 50);
	}

	function triangle() {
		grid.triangle(context, 0, 0, width, height, 50);
	}

	
	function all() {
		var w = width / 4,
			h = height / 3,
			x = 0,
			y = 0;
		grid.square(context, x, y, w, h, 50, 25, 12.5);
		x += w;
		grid.rect(context, x, y, w, h, 50, 25);
		x += w;
		grid.isometric(context, x, y, w, h, 50);
		x += w;
		grid.dimetric(context, x, y, w, h, 50);
		x = 0;
		y += h;
		grid.hex(context, x, y, w, h, 50);
		x += w;
		grid.polar(context, x, y, w, h, 20, 20, w / 2, h / 2);
		x += w;
		grid.dots(context, x, y, w, h, 50, 25);
		x += w;
		grid.hexDots(context, x, y, w, h, 50);
		x = 0;
		y += h;
		grid.plus(context, x, y, w, h, 10, 50);
		x += w;
		grid.celtic(context, x, y, w, h, 50);
		x += w;
		grid.triangle(context, x, y, w, h, 50);
		x += w;
		grid.diamond(context, x, y, w, h, 50);
	}

});