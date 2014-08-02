(function() {
	var grid = {
		thirdLineWidth: 0.2,
		thirdStrokeStyle: "black",
		
		minorLineWidth: 0.25,
		minorStrokeStyle: "black",
		minorDotSize: 1,
		minorFillStyle: "black",
		
		majorLineWidth: 0.5,
		majorStrokeStyle: "black",
		majorDotSize: 2,
		majorFillStyle: "black",

		square: function(context, x, y, w, h, majorRes, minorRes, thirdRes) {
			this._predraw(context);
			if(thirdRes) {
				this._useThird(context);
				context.beginPath();
				for(var i = x; i <= x + w; i += thirdRes) {
					context.moveTo(i, y);
					context.lineTo(i, y + h);
				}
				for(i = y; i <= y + h; i += thirdRes) {
					context.moveTo(x, i);
					context.lineTo(x + w, i);
				}
				context.stroke();
			}

			if(minorRes) {
				context.beginPath();
				this._useMinor(context);
				for(var i = x; i <= x + w; i += minorRes) {
					context.moveTo(i, y);
					context.lineTo(i, y + h);
				}
				for(i = y; i <= y + h; i += minorRes) {
					context.moveTo(x, i);
					context.lineTo(x + w, i);
				}
				context.stroke();
			}

			context.beginPath();
			this._useMajor(context);
			for(i = x; i <= x + w; i += majorRes) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			for(i = y; i <= y + h; i += majorRes) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}
			context.stroke();
			this._postDraw(context);
		},

		rect: function(context, x, y, w, h, resx, resy) {
			this._predraw(context);

			context.beginPath();
			this._useMajor(context);
			for(i = x; i <= x + w; i += resx) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			for(i = y; i <= y + h; i += resy) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}
			context.stroke();
			this._postDraw(context);
		},

		isometric: function(context, x, y, w, h, res) {
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.beginPath();
			this._useMinor(context);
			for(i = x; i <= x + w; i += res) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			context.stroke();

			context.beginPath();
			this._useMajor(context);

			var max = Math.sqrt(w*w+h*h),
				cos30 = Math.cos(Math.PI / 6),
				sin30 = Math.sin(Math.PI / 6),
				cos150 = Math.cos(Math.PI * 5 / 6)
				sin150 = Math.sin(Math.PI * 5 / 6);
			for(i = x; i <= x + w; i += res * 2) {
				context.moveTo(i, y);
				context.lineTo(i + cos30 * max,  y + sin30 * max);

				context.moveTo(i, y);
				context.lineTo(i + cos150 * max,  y + sin150 * max);
			}
			var dy = res / cos30;
			for(i = y + dy; i <= y + h; i += dy) {
				context.moveTo(x, i);
				context.lineTo(x + cos30 * max, i + sin30 * max);

				context.moveTo(x + w, i);
				context.lineTo(x + w + cos150 * max, i + sin150 * max);
			}
			context.stroke();
			this._postDraw(context);
		},

		dimetric: function(context, x, y, w, h, res) {
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.beginPath();
			context.lineWidth = this.minorLineWidth;
			context.strokeStyle = this.minorStrokeStyle;
			for(i = x; i <= x + w; i += res) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			context.stroke();

			context.beginPath();
			this._useMajor(context);

			var max = Math.sqrt(w*w+h*h),
				angle26 = Math.atan(.5);
				angle153 = Math.PI - angle26;
				cos30 = Math.cos(angle26),
				sin30 = Math.sin(angle26),
				cos150 = Math.cos(angle153)
				sin150 = Math.sin(angle153);
			for(i = x; i <= x + w; i += res * 2) {
				context.moveTo(i, y);
				context.lineTo(i + cos30 * max,  y + sin30 * max);

				context.moveTo(i, y);
				context.lineTo(i + cos150 * max,  y + sin150 * max);
			}
			for(i = y + res; i <= y + h; i += res) {
				context.moveTo(x, i);
				context.lineTo(x + cos30 * max, i + sin30 * max);

				context.moveTo(x + w, i);
				context.lineTo(x + w + cos150 * max, i + sin150 * max);
			}
			context.stroke();
			this._postDraw(context);
		},

		polar: function(context, x, y, w, h, res, degrees, cx, cy) {
			if(cx == null) cx = w / 2;
			if(cy == null) cy = h / 2;
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.translate(x + cx, y + cy);

			var maxRadius = Math.sqrt(w * w + h * h);
			for(var r = res; r <= maxRadius; r += res) {
				context.beginPath();
				context.arc(0, 0, r, 0, Math.PI * 2, false);
				context.stroke();
			}
			this._useMinor(context);
			context.beginPath();
			for(var a = 0; a < Math.PI * 2 - .0001; a += degrees / 180 * Math.PI) {
				context.moveTo(0, 0);
				context.lineTo(Math.cos(a) * maxRadius, Math.sin(a) * maxRadius);
			}
			context.stroke();
			this._postDraw(context);

		},

		hex: function(context, x, y, w, h, res) {
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();


			context.beginPath();
			var angle = Math.PI * 2 / 6;
			for(var i = x; i <= x + w + res; i += res * 1.5) {
				for(var j = y; j <= y + h + res; j += Math.sin(angle) * res) {
					for(var k = -1; k < 5; k++) {
						var xpos = i + Math.cos(angle * k) * res / 2,
							ypos = j + Math.sin(angle * k) * res / 2;
						if(k < 0) {
							context.moveTo(xpos, ypos);
						}
						if(k === 3) {
							context.lineTo(xpos, ypos);
							context.lineTo(xpos - res / 2, ypos);
							context.moveTo(xpos, ypos);
						}
						else {
							context.lineTo(xpos, ypos);
						}
					}
				}
			}
			context.stroke();
			this._postDraw(context);
		},

		dots: function(context, x, y, w, h, majorRes, minorRes) {
			this._predraw(context);
			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			if(minorRes) {
				context.beginPath();
				this._useMinor(context);
				for(var i = x; i <= x + w; i += minorRes) {
					for(var j = y; j <= y + h; j += minorRes) {
						context.rect(i - this.minorDotSize * .5, j - this.minorDotSize * .5, this.minorDotSize, this.minorDotSize);
					}
				}
				context.fill();
			}

			this._useMajor(context);
			context.beginPath();
			for(var i = x; i <= x + w; i += majorRes) {
				for(var j = y; j <= y + h; j += majorRes) {
					context.rect(i - this.majorDotSize * .5, j - this.majorDotSize * .5, this.majorDotSize, this.majorDotSize);
				}
			}
			context.fill();
			this._postDraw(context);

		},

		hexDots: function(context, x, y, w, h, res) {
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();


			context.beginPath();
			var angle = Math.PI * 2 / 6;
			for(var i = x; i <= x + w + res; i += res * 1.5) {
				for(var j = y; j <= y + h + res; j += Math.sin(angle) * res) {
					for(var k = 0; k < 4; k++) {
						var xpos = i + Math.cos(angle * k) * res / 2,
							ypos = j + Math.sin(angle * k) * res / 2;
						context.rect(xpos - this.majorDotSize * .5, ypos - this.majorDotSize * .5, this.majorDotSize, this.majorDotSize);
					}
				}
			}
			context.fill();
			this._postDraw(context);

		},

		plus: function(context, x, y, w, h, plusSize, res) {
			this._predraw(context);
			this._useMajor(context);
			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.beginPath();
			for(var i = x; i <= x + w; i += res) {
				for(var j = y; j <= y + h; j += res) {
					context.moveTo(i - plusSize / 2, j);
					context.lineTo(i + plusSize / 2, j);
					context.moveTo(i, j - plusSize / 2);
					context.lineTo(i, j + plusSize / 2);
				}
			}
			context.stroke();
			this._postDraw(context);
		},

		triangle: function(context, x, y, w, h, res) {
			this._predraw(context);

			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.beginPath();

			context.beginPath();
			this._useMajor(context);

			var max = Math.sqrt(w*w+h*h),
				cos60 = Math.cos(Math.PI / 3),
				sin60 = Math.sin(Math.PI / 3),
				cos120 = Math.cos(Math.PI * 2 / 3)
				sin120 = Math.sin(Math.PI * 2 / 3);
			for(i = x; i <= x + w; i += res) {
				context.moveTo(i, y);
				context.lineTo(i + cos60 * max,  y + sin60 * max);

				context.moveTo(i, y);
				context.lineTo(i + cos120 * max,  y + sin120 * max);
			}
			var dy = sin60 * res,
				maxX = Math.ceil(w / res) * res + x;
			for(i = y; i <= y + h; i += dy) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}

			for(i = y + dy * 2; i <= y + h; i += dy * 2) {
				if(i > 0) {
					context.moveTo(x, i);
					context.lineTo(x + cos60 * max, i + sin60 * max);
				}
				
				context.moveTo(maxX, i);
				context.lineTo(maxX + cos120 * max, i + sin120 * max);
			}
			context.stroke();
			this._postDraw(context);

		},

		diamond: function(context, x, y, w, h, res) {
			this._predraw(context);
			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			var max = Math.sqrt(w*w+h*h),
				cos45 = Math.cos(Math.PI / 4),
				sin45 = Math.sin(Math.PI / 4),
				cos135 = Math.cos(Math.PI * 3/4),
				sin135 = Math.sin(Math.PI * 3/4);

			context.beginPath();
			this._useMajor(context);
			for(var i = x; i <= x + w; i += res) {
				context.moveTo(i + res / 2, y);
				context.lineTo(i + res / 2 + cos45 * max, y + sin45 * max);
				context.moveTo(i + res / 2, y);
				context.lineTo(i + res / 2 + cos135 * max, y + sin135 * max);
			}
			for(i = y; i <= y + h; i += res) {
				context.moveTo(x, i + res / 2);
				context.lineTo(x + cos45 * max, i + res / 2 + sin45 * max);
				maxX = Math.ceil(w / res) * res + x;
				context.moveTo(maxX, i + res * 1.5);
				context.lineTo(maxX + cos135 * max, i + res * 1.5 + sin135 * max);
			}
			context.stroke();
			this._postDraw(context);
		},

		celtic: function(context, x, y, w, h, res) {
			this._predraw(context);
			context.beginPath();
			context.rect(x, y, w, h);
			context.clip();

			context.beginPath();
			this._useMinor(context);
			for(var i = x; i <= x + w; i += res) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			for(i = y; i <= y + h; i += res) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}
			context.stroke();
			this._postDraw(context);
			this.diamond(context, x, y, w, h, res);
		},






		_predraw: function(context) {
			context.save();
			context.translate(-0.5, -0.5);
			this._useMajor(context);
		},

		_postDraw: function(context) {
			context.restore();
		},

		_useThird: function(context) {
			context.lineWidth = this.thirdLineWidth;
			context.strokeStyle = this.thirdStrokeStyle;
		},

		_useMinor: function(context) {
			context.lineWidth = this.minorLineWidth;
			context.strokeStyle = this.minorStrokeStyle;
			context.fillStyle = this.minorFillStyle;
		},

		_useMajor: function(context) {
			context.lineWidth = this.majorLineWidth;
			context.strokeStyle = this.majorStrokeStyle;
			context.fillStyle = this.majorFillStyle;
		}

	}


	if (typeof define === "function" && define.amd) {
	    define(grid);
	} else {
	   window.grid = grid;
	}

}());
