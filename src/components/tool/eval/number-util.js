/* eslint-disable */
var fix = 10;
var maxOrd = 10000;
var numRegExp = /^-?\d+.?\d*$/;

function power(a, b) {
	a = '' + a;
	b = '' + b;
	if (!numRegExp.test(a)) {
		throw (a + '不是一个数字');
		return ''
	}
	if (!/^\d+$/.test(b)) {
		throw (b + '不是一个正整数');
		return ''
	}
	b = Number(b);
	var c = [1];
	var d = {
		1: a
	};
	if (b == 0) {
		return 1
	}
	var e = maxOrd;
	do {
		var t = b - c[0];
		for (var i = 0; i < c.length; i++) {
			if (t >= c[i]) {
				var g = c[0] + c[i];
				var h = multiply(d[c[0]], d[c[i]]);
				if (e < h.length) {
					console.log('输出结果超出最大位数' + e + '位');
				}
				d[g] = h;
				c.unshift(g);
				break
			}
		}
	} while (b != c[0]);
	if (b == c[0]) {
		return d[c[0]]
	}
};

function multiply(a, b) {
	a = '' + a;
	b = '' + b;
	if (!numRegExp.test(a)) {
		throw (a + '不是一个数字');
		return ''
	}
	if (!numRegExp.test(b)) {
		throw (b + '不是一个数字');
		return ''
	}
	var c = 1;
	if (a.charAt(0) == '-') {
		a = a.substring(1);
		c *= -1
	}
	if (b.charAt(0) == '-') {
		b = b.substring(1);
		c *= -1
	}
	var d = 0;
	var e = a.indexOf('.');
	var f = b.indexOf('.');
	var g = a.split('').reverse();
	var h = b.split('').reverse();
	if (e != -1) {
		var k = a.length - e - 1;
		d += k;
		g.splice(k, 1)
	}
	if (f != -1) {
		var l = b.length - f - 1;
		d += l;
		h.splice(l, 1)
	}
	var m = [];
	for (var i = 0; i < h.length; i++) {
		var n = [];
		for (var j = 0; j < i; j++) {
			n.push(0)
		}
		for (var j = 0; j < g.length; j++) {
			n.push(h[i] * g[j])
		}
		m.push(tosingle(n))
	}
	var o = tosingle(arrplus(m));
	var p = d - o.length + 1;
	if (p > 0) {
		for (var i = 0; i < p; i++) {
			o.push(0)
		}
	}
	if (d) {
		o.splice(d, 0, '.');
		var t = 0;
		for (var i = 0; i < d; i++) {
			if (!o[0]) {
				o.shift();
				t++
			} else {
				break
			}
		}
		if (t == d) {
			o.shift()
		}
	}
	o.reverse();
	var result = o.join('');
	if (c == -1) {
		result = '-' + result
	}
	if (result == '') {
		return 0
	} else {
		return result
	}
};

function minus(a, b) {
	a = '' + a;
	b = '' + b;
	if (!numRegExp.test(a)) {
		throw (a + '不是一个数字');
		return ''
	}
	if (!numRegExp.test(b)) {
		throw (b + '不是一个数字');
		return ''
	}
	if (a.charAt(0) == '-' && b.charAt(0) != '-') {
		a = a.substring(1);
		return '-' + plus(a, b)
	} else if (a.charAt(0) == '-' && b.charAt(0) == '-') {
		a = a.substring(1);
		b = b.substring(1);
		return minus(b, a)
	} else if (a.charAt(0) != '-' && b.charAt(0) == '-') {
		b = b.substring(1);
		return plus(a, b)
	} else if (a.charAt(0) != '-' && b.charAt(0) != '-') {
		var c = 0;
		var d = a.indexOf('.');
		var e = b.indexOf('.');
		var f = a.split('').reverse();
		var g = b.split('').reverse();
		if (d == -1 && e == -1) { } else if (d != -1 && e == -1) {
			var h = c = a.length - d - 1;
			f.splice(h, 1);
			for (var i = 0; i < c; i++) {
				g.unshift(0)
			}
		} else if (d == -1 && e != -1) {
			var j = c = b.length - e - 1;
			g.splice(j, 1);
			for (var i = 0; i < c; i++) {
				f.unshift(0)
			}
		} else if (d != -1 && e != -1) {
			var h = a.length - d - 1;
			var j = b.length - e - 1;
			f.splice(h, 1);
			g.splice(j, 1);
			if (h > j) {
				c = h;
				for (var i = 0; i < h - j; i++) {
					g.unshift(0)
				}
			} else {
				c = j;
				for (var i = 0; i < j - h; i++) {
					f.unshift(0)
				}
			}
		}
		var k;
		var z = contrast(f, g);
		if (z) {
			k = arrminute(f, g)
		} else {
			k = arrminute(g, f)
		}
		var l = c - k.length + 1;
		if (l > 0) {
			for (var i = 0; i < l; i++) {
				k.push(0)
			}
		}
		if (c) {
			k.splice(c, 0, '.');
			var t = 0;
			for (var i = 0; i < c; i++) {
				if (!k[0]) {
					k.shift();
					t++
				} else {
					break
				}
			}
			if (t == c) {
				k.shift()
			}
		}
		k.reverse();
		var result = k.join('');
		if (!z) {
			result = '-' + result
		}
		if (result == '') {
			return 0
		} else {
			return result
		}
	}
};

function plus(a, b) {
	a = '' + a;
	b = '' + b;
	if (!numRegExp.test(a)) {
		throw (a + '不是一个数字');
		return ''
	}
	if (!numRegExp.test(b)) {
		throw (b + '不是一个数字');
		return ''
	}
	if (a.charAt(0) == '-' && b.charAt(0) != '-') {
		a = a.substring(1);
		return minus(b, a)
	} else if (a.charAt(0) == '-' && b.charAt(0) == '-') {
		a = a.substring(1);
		b = b.substring(1);
		return '-' + plus(a, b)
	} else if (a.charAt(0) != '-' && b.charAt(0) == '-') {
		b = b.substring(1);
		return minus(a, b)
	} else if (a.charAt(0) != '-' && b.charAt(0) != '-') {
		var c = 0;
		var d = a.indexOf('.');
		var e = b.indexOf('.');
		var f = a.split('').reverse();
		var g = b.split('').reverse();
		if (d == -1 && e == -1) { } else if (d != -1 && e == -1) {
			var h = c = a.length - d - 1;
			f.splice(h, 1);
			for (var i = 0; i < c; i++) {
				g.unshift(0)
			}
		} else if (d == -1 && e != -1) {
			var j = c = b.length - e - 1;
			g.splice(j, 1);
			for (var i = 0; i < c; i++) {
				f.unshift(0)
			}
		} else if (d != -1 && e != -1) {
			var h = a.length - d - 1;
			var j = b.length - e - 1;
			f.splice(h, 1);
			g.splice(j, 1);
			if (h > j) {
				c = h;
				for (var i = 0; i < h - j; i++) {
					g.unshift(0)
				}
			} else {
				c = j;
				for (var i = 0; i < j - h; i++) {
					f.unshift(0)
				}
			}
		}
		var k = tosingle(arrplus([f, g]));
		var l = c - k.length + 1;
		if (l > 0) {
			for (var i = 0; i < l; i++) {
				k.push(0)
			}
		}
		if (c) {
			k.splice(c, 0, '.');
			var t = 0;
			for (var i = 0; i < c; i++) {
				if (!k[0]) {
					k.shift();
					t++
				} else {
					break
				}
			}
			if (t == c) {
				k.shift()
			}
		}
		k.reverse();
		var result = k.join('');
		if (result == '') {
			return 0
		} else {
			return result
		}
	}
};

function divide(a, b, c) {
	c = (typeof c == 'undefined') ? fix : c;
	if (b == 0) {
		throw ('被除数不可以为0');
		return ''
	}
	a = '' + a;
	b = '' + b;
	if (!numRegExp.test(a)) {
		throw (a + '不是一个数字');
		return ''
	}
	if (!numRegExp.test(b)) {
		throw (b + '不是一个数字');
		return ''
	}
	var d = 1;
	if (a.charAt(0) == '-') {
		a = a.substring(1);
		d *= -1
	}
	if (b.charAt(0) == '-') {
		b = b.substring(1);
		d *= -1
	}
	var e = 0;
	var f = a.indexOf('.');
	var g = b.indexOf('.');
	var h = a.split('').reverse();
	var j = b.split('').reverse();
	if (f != -1) {
		var k = a.length - f - 1;
		e += k;
		h.splice(k, 1)
	}
	if (g != -1) {
		var l = b.length - g - 1;
		e -= l;
		j.splice(l, 1)
	}
	var m = [];
	if (e > 0) {
		for (var i = 0; i < e; i++) {
			j.unshift(0)
		}
	} else if (e < 0) {
		for (var i = 0; i < -e; i++) {
			h.unshift(0)
		}
	}
	while (h[h.length - 1] == 0) {
		h.pop()
	}
	while (j[j.length - 1] == 0) {
		j.pop()
	}
	var n = c;
	var o = n;
	for (var i = 0; i < o; i++) {
		h.unshift(0)
	}
	var p = true;
	while (p) {
		var q = h.length;
		var r = j.length;
		if (q > r) {
			var t = q - r;
			var s = [];
			if (Number(h[q - 1]) > Number(j[r - 1])) {
				for (var i = 0; i < t; i++) {
					s.push(0)
				}
				s.push(1)
			} else {
				for (var i = 0; i < t - 1; i++) {
					s.push(0)
				}
				s.push(1)
			}
			m.push(s);
			var u = s.slice(0, s.length - 1).concat(j);
			h = tosingle2(arrminute(h, u))
		} else if (q == r) {
			var v = 0;
			for (var i = 0; i < q; i++) {
				if (h[q - 1 - i] > j[r - 1 - i]) {
					m.push([1]);
					h = tosingle2(arrminute(h, j));
					break
				} else if (h[q - 1 - i] == j[r - 1 - i]) {
					v++
				} else if (h[q - 1 - i] < j[r - 1 - i]) {
					p = false;
					m.push([0]);
					break
				}
			}
			if (v == q) {
				m.push([1]);
				h = tosingle2(arrminute(h, j));
				p = false
			}
		} else if (q < r) {
			m.push([0]);
			p = false
		}
	}
	var w = tosingle2(arrplus(m));
	var x = n - w.length + 1;
	if (x > 0) {
		for (var i = 0; i < x; i++) {
			w.push(0)
		}
	}
	if (n) {
		w.splice(n, 0, '.');
		var t = 0;
		for (var i = 0; i < n; i++) {
			if (!w[0]) {
				w.shift();
				t++
			} else {
				break
			}
		}
		if (t == n) {
			w.shift()
		}
	}
	w.reverse();
	var result = w.join('');
	if (d == -1) {
		result = '-' + result
	}
	if (result == '') {
		return 0
	} else {
		return result
	}
};

function w(a) {
	var b = a.slice(0);
	b.reverse();
	return b.join('')
}

function arrMul(a, b) {
	var c = [];
	for (var i = 0; i < a.length; i++) {
		var d = [];
		for (var j = 0; j < i; j++) {
			d.push(0)
		}
		for (var j = 0; j < a.length; j++) {
			d.push(b[i] * a[j])
		}
		c.push(tosingle(d))
	}
	return tosingle(arrplus(c))
};

function tosingle(a) {
	var b = [];
	var c = 0;
	for (var i = 0; i < a.length; i++) {
		b.push((a[i] + c) % 10);
		c = parseInt((a[i] + c) / 10)
	}
	while (c > 9) {
		b.push(c % 10);
		c = parseInt(c / 10)
	}
	if (c != 0) b.push(c);
	return b
};

function arrplus(a) {
	var b = [];
	var c = 0;
	var d = a.length;
	var e = 0;
	while (e < d) {
		var f = 0;
		e = 0;
		for (var i = 0; i < d; i++) {
			if (!a[i][c] && a[i][c] != 0) e++;
			f += a[i][c] ? Number(a[i][c]) : 0
		}
		if (e < d) b.push(f);
		c++
	}
	return b
}

function tosingle2(a) {
	var b = [];
	var c = 0;
	for (var i = 0; i < a.length; i++) {
		var d = a[i] + c;
		if (d >= 0) {
			b.push(d % 10);
			c = parseInt(d / 10)
		} else {
			if (d % 10 == 0) {
				b.push(d % 10);
				c = parseInt(d / 10)
			} else {
				b.push(10 + (d % 10));
				c = parseInt((d / 10) - 1)
			}
		}
	}
	while (c > 9 || c < -9) {
		var d = a[i] + c;
		if (d >= 0) {
			b.push(d % 10);
			c = parseInt(d / 10)
		} else {
			if (d % 10 == 0) {
				b.push(d % 10);
				c = parseInt(d / 10)
			} else {
				b.push(10 + (d % 10));
				c = parseInt((d / 10) - 1)
			}
		}
	}
	if (c != 0) b.push(c);
	while (b[b.length - 1] == 0) {
		b.pop()
	}
	return b
}

function arrminute(c, d) {
	var e = [];
	var f = c.length > d.length ? c.length : d.length;
	for (var i = 0; i < f; i++) {
		if (!c[i] && c[i] != 0) {
			var a = 0
		} else {
			var a = Number(c[i])
		}
		if (!d[i] && d[i] != 0) {
			var b = 0
		} else {
			var b = Number(d[i])
		}
		e.push(a - b)
	}
	return tosingle2(e)
}

function contrast(a, b) {
	var c = a.length;
	var d = b.length;
	if (c < d) {
		return false
	} else if (c == d) {
		for (var i = c - 1; i > -1; i--) {
			if (Number(a[i]) < Number(b[i])) {
				return false
			} else if (Number(a[i]) > Number(b[i])) {
				return true
			}
		}
	}
	return true
}
export default {
	power: power, // 幂次方
	multiply: multiply, // 乘法
	minus: minus, // 减法
	plus: plus,  // 加法
	divide: divide // 除法
}
// //数字运算
// (function(m) {
// 	var spt = String.prototype;
// 	var npt = Number.prototype;
// 	/**
// 	 * 四舍五入
// 	 */
// 	npt.rund = function(w) {
// 		if(typeof w != "undefined") {
// 			if(w > 0) {
// 				var i = parseInt(Math.pow(10, w));
// 				return(Math.round(this * i) / i);
// 			} else if(w == 0) {
// 				return parseInt(this);
// 			} else {
// 				var i = parseInt(Math.pow(10, Math.abs(w)));
// 				return(Math.round(this / i) * i);
// 			}
// 		}
// 		return this;
// 	};
// 	spt.rund = function(w) {
// 		return Number(this).rund(w);
// 	};
// 	//除法
// 	spt.div = npt.div = function(num, w) {
// 		return m.divide(this, num).rund(w);
// 	}
// 	//加法
// 	spt.add = npt.add = function(num, w) {
// 		return m.plus(this, num).rund(w);
// 	}
// 	//减法
// 	spt.sub = npt.sub = function(num, w) {
// 		return m.minus(this, num).rund(w);
// 	}
// 	spt.mul = npt.mul = function(num, w) {
// 		return m.multiply(this, num).rund(w);
// 	}
// 	spt.pow = npt.pow = function(num, w) {
// 		return m.power(this, num).rund(w);
// 	}
// })(function() {
// 	var fix = 10;
// 	var maxOrd = 10000;
// 	var numRegExp = /^-?\d+.?\d*$/;

// 	function power(a, b) {
// 		a = '' + a;
// 		b = '' + b;
// 		if(!numRegExp.test(a)) {
// 			throw(a + '不是一个数字');
// 			return ''
// 		}
// 		if(!/^\d+$/.test(b)) {
// 			throw(b + '不是一个正整数');
// 			return ''
// 		}
// 		b = Number(b);
// 		var c = [1];
// 		var d = {
// 			1: a
// 		};
// 		if(b == 0) {
// 			return 1
// 		}
// 		var e = maxOrd;
// 		do {
// 			var t = b - c[0];
// 			for(var i = 0; i < c.length; i++) {
// 				if(t >= c[i]) {
// 					var g = c[0] + c[i];
// 					var h = multiply(d[c[0]], d[c[i]]);
// 					if(e < h.length) {
// 						console.log('输出结果超出最大位数' + e + '位');
// 					}
// 					d[g] = h;
// 					c.unshift(g);
// 					break
// 				}
// 			}
// 		} while (b != c[0]);
// 		if(b == c[0]) {
// 			return d[c[0]]
// 		}
// 	};

// 	function multiply(a, b) {
// 		a = '' + a;
// 		b = '' + b;
// 		if(!numRegExp.test(a)) {
// 			throw(a + '不是一个数字');
// 			return ''
// 		}
// 		if(!numRegExp.test(b)) {
// 			throw(b + '不是一个数字');
// 			return ''
// 		}
// 		var c = 1;
// 		if(a.charAt(0) == '-') {
// 			a = a.substring(1);
// 			c *= -1
// 		}
// 		if(b.charAt(0) == '-') {
// 			b = b.substring(1);
// 			c *= -1
// 		}
// 		var d = 0;
// 		var e = a.indexOf('.');
// 		var f = b.indexOf('.');
// 		var g = a.split('').reverse();
// 		var h = b.split('').reverse();
// 		if(e != -1) {
// 			var k = a.length - e - 1;
// 			d += k;
// 			g.splice(k, 1)
// 		}
// 		if(f != -1) {
// 			var l = b.length - f - 1;
// 			d += l;
// 			h.splice(l, 1)
// 		}
// 		var m = [];
// 		for(var i = 0; i < h.length; i++) {
// 			var n = [];
// 			for(var j = 0; j < i; j++) {
// 				n.push(0)
// 			}
// 			for(var j = 0; j < g.length; j++) {
// 				n.push(h[i] * g[j])
// 			}
// 			m.push(tosingle(n))
// 		}
// 		var o = tosingle(arrplus(m));
// 		var p = d - o.length + 1;
// 		if(p > 0) {
// 			for(var i = 0; i < p; i++) {
// 				o.push(0)
// 			}
// 		}
// 		if(d) {
// 			o.splice(d, 0, '.');
// 			var t = 0;
// 			for(var i = 0; i < d; i++) {
// 				if(!o[0]) {
// 					o.shift();
// 					t++
// 				} else {
// 					break
// 				}
// 			}
// 			if(t == d) {
// 				o.shift()
// 			}
// 		}
// 		o.reverse();
// 		result = o.join('');
// 		if(c == -1) {
// 			result = '-' + result
// 		}
// 		if(result == '') {
// 			return 0
// 		} else {
// 			return result
// 		}
// 	};

// 	function minus(a, b) {
// 		a = '' + a;
// 		b = '' + b;
// 		if(!numRegExp.test(a)) {
// 			throw(a + '不是一个数字');
// 			return ''
// 		}
// 		if(!numRegExp.test(b)) {
// 			throw(b + '不是一个数字');
// 			return ''
// 		}
// 		if(a.charAt(0) == '-' && b.charAt(0) != '-') {
// 			a = a.substring(1);
// 			return '-' + plus(a, b)
// 		} else if(a.charAt(0) == '-' && b.charAt(0) == '-') {
// 			a = a.substring(1);
// 			b = b.substring(1);
// 			return minus(b, a)
// 		} else if(a.charAt(0) != '-' && b.charAt(0) == '-') {
// 			b = b.substring(1);
// 			return plus(a, b)
// 		} else if(a.charAt(0) != '-' && b.charAt(0) != '-') {
// 			var c = 0;
// 			var d = a.indexOf('.');
// 			var e = b.indexOf('.');
// 			var f = a.split('').reverse();
// 			var g = b.split('').reverse();
// 			if(d == -1 && e == -1) {} else if(d != -1 && e == -1) {
// 				var h = c = a.length - d - 1;
// 				f.splice(h, 1);
// 				for(var i = 0; i < c; i++) {
// 					g.unshift(0)
// 				}
// 			} else if(d == -1 && e != -1) {
// 				var j = c = b.length - e - 1;
// 				g.splice(j, 1);
// 				for(var i = 0; i < c; i++) {
// 					f.unshift(0)
// 				}
// 			} else if(d != -1 && e != -1) {
// 				var h = a.length - d - 1;
// 				var j = b.length - e - 1;
// 				f.splice(h, 1);
// 				g.splice(j, 1);
// 				if(h > j) {
// 					c = h;
// 					for(var i = 0; i < h - j; i++) {
// 						g.unshift(0)
// 					}
// 				} else {
// 					c = j;
// 					for(var i = 0; i < j - h; i++) {
// 						f.unshift(0)
// 					}
// 				}
// 			}
// 			var k;
// 			var z = contrast(f, g);
// 			if(z) {
// 				k = arrminute(f, g)
// 			} else {
// 				k = arrminute(g, f)
// 			}
// 			var l = c - k.length + 1;
// 			if(l > 0) {
// 				for(var i = 0; i < l; i++) {
// 					k.push(0)
// 				}
// 			}
// 			if(c) {
// 				k.splice(c, 0, '.');
// 				var t = 0;
// 				for(var i = 0; i < c; i++) {
// 					if(!k[0]) {
// 						k.shift();
// 						t++
// 					} else {
// 						break
// 					}
// 				}
// 				if(t == c) {
// 					k.shift()
// 				}
// 			}
// 			k.reverse();
// 			result = k.join('');
// 			if(!z) {
// 				result = '-' + result
// 			}
// 			if(result == '') {
// 				return 0
// 			} else {
// 				return result
// 			}
// 		}
// 	};

// 	function plus(a, b) {
// 		a = '' + a;
// 		b = '' + b;
// 		if(!numRegExp.test(a)) {
// 			throw(a + '不是一个数字');
// 			return ''
// 		}
// 		if(!numRegExp.test(b)) {
// 			throw(b + '不是一个数字');
// 			return ''
// 		}
// 		if(a.charAt(0) == '-' && b.charAt(0) != '-') {
// 			a = a.substring(1);
// 			return minus(b, a)
// 		} else if(a.charAt(0) == '-' && b.charAt(0) == '-') {
// 			a = a.substring(1);
// 			b = b.substring(1);
// 			return '-' + plus(a, b)
// 		} else if(a.charAt(0) != '-' && b.charAt(0) == '-') {
// 			b = b.substring(1);
// 			return minus(a, b)
// 		} else if(a.charAt(0) != '-' && b.charAt(0) != '-') {
// 			var c = 0;
// 			var d = a.indexOf('.');
// 			var e = b.indexOf('.');
// 			var f = a.split('').reverse();
// 			var g = b.split('').reverse();
// 			if(d == -1 && e == -1) {} else if(d != -1 && e == -1) {
// 				var h = c = a.length - d - 1;
// 				f.splice(h, 1);
// 				for(var i = 0; i < c; i++) {
// 					g.unshift(0)
// 				}
// 			} else if(d == -1 && e != -1) {
// 				var j = c = b.length - e - 1;
// 				g.splice(j, 1);
// 				for(var i = 0; i < c; i++) {
// 					f.unshift(0)
// 				}
// 			} else if(d != -1 && e != -1) {
// 				var h = a.length - d - 1;
// 				var j = b.length - e - 1;
// 				f.splice(h, 1);
// 				g.splice(j, 1);
// 				if(h > j) {
// 					c = h;
// 					for(var i = 0; i < h - j; i++) {
// 						g.unshift(0)
// 					}
// 				} else {
// 					c = j;
// 					for(var i = 0; i < j - h; i++) {
// 						f.unshift(0)
// 					}
// 				}
// 			}
// 			var k = tosingle(arrplus([f, g]));
// 			var l = c - k.length + 1;
// 			if(l > 0) {
// 				for(var i = 0; i < l; i++) {
// 					k.push(0)
// 				}
// 			}
// 			if(c) {
// 				k.splice(c, 0, '.');
// 				var t = 0;
// 				for(var i = 0; i < c; i++) {
// 					if(!k[0]) {
// 						k.shift();
// 						t++
// 					} else {
// 						break
// 					}
// 				}
// 				if(t == c) {
// 					k.shift()
// 				}
// 			}
// 			k.reverse();
// 			result = k.join('');
// 			if(result == '') {
// 				return 0
// 			} else {
// 				return result
// 			}
// 		}
// 	};

// 	function divide(a, b, c) {
// 		c = (typeof c == 'undefined') ? fix : c;
// 		if(b == 0) {
// 			throw('被除数不可以为0');
// 			return ''
// 		}
// 		a = '' + a;
// 		b = '' + b;
// 		if(!numRegExp.test(a)) {
// 			throw(a + '不是一个数字');
// 			return ''
// 		}
// 		if(!numRegExp.test(b)) {
// 			throw(b + '不是一个数字');
// 			return ''
// 		}
// 		var d = 1;
// 		if(a.charAt(0) == '-') {
// 			a = a.substring(1);
// 			d *= -1
// 		}
// 		if(b.charAt(0) == '-') {
// 			b = b.substring(1);
// 			d *= -1
// 		}
// 		var e = 0;
// 		var f = a.indexOf('.');
// 		var g = b.indexOf('.');
// 		var h = a.split('').reverse();
// 		var j = b.split('').reverse();
// 		if(f != -1) {
// 			var k = a.length - f - 1;
// 			e += k;
// 			h.splice(k, 1)
// 		}
// 		if(g != -1) {
// 			var l = b.length - g - 1;
// 			e -= l;
// 			j.splice(l, 1)
// 		}
// 		var m = [];
// 		if(e > 0) {
// 			for(var i = 0; i < e; i++) {
// 				j.unshift(0)
// 			}
// 		} else if(e < 0) {
// 			for(var i = 0; i < -e; i++) {
// 				h.unshift(0)
// 			}
// 		}
// 		while(h[h.length - 1] == 0) {
// 			h.pop()
// 		}
// 		while(j[j.length - 1] == 0) {
// 			j.pop()
// 		}
// 		var n = c;
// 		var o = n;
// 		for(var i = 0; i < o; i++) {
// 			h.unshift(0)
// 		}
// 		var p = true;
// 		while(p) {
// 			var q = h.length;
// 			var r = j.length;
// 			if(q > r) {
// 				var t = q - r;
// 				var s = [];
// 				if(Number(h[q - 1]) > Number(j[r - 1])) {
// 					for(var i = 0; i < t; i++) {
// 						s.push(0)
// 					}
// 					s.push(1)
// 				} else {
// 					for(var i = 0; i < t - 1; i++) {
// 						s.push(0)
// 					}
// 					s.push(1)
// 				}
// 				m.push(s);
// 				var u = s.slice(0, s.length - 1).concat(j);
// 				h = tosingle2(arrminute(h, u))
// 			} else if(q == r) {
// 				var v = 0;
// 				for(var i = 0; i < q; i++) {
// 					if(h[q - 1 - i] > j[r - 1 - i]) {
// 						m.push([1]);
// 						h = tosingle2(arrminute(h, j));
// 						break
// 					} else if(h[q - 1 - i] == j[r - 1 - i]) {
// 						v++
// 					} else if(h[q - 1 - i] < j[r - 1 - i]) {
// 						p = false;
// 						m.push([0]);
// 						break
// 					}
// 				}
// 				if(v == q) {
// 					m.push([1]);
// 					h = tosingle2(arrminute(h, j));
// 					p = false
// 				}
// 			} else if(q < r) {
// 				m.push([0]);
// 				p = false
// 			}
// 		}
// 		var w = tosingle2(arrplus(m));
// 		var x = n - w.length + 1;
// 		if(x > 0) {
// 			for(var i = 0; i < x; i++) {
// 				w.push(0)
// 			}
// 		}
// 		if(n) {
// 			w.splice(n, 0, '.');
// 			var t = 0;
// 			for(var i = 0; i < n; i++) {
// 				if(!w[0]) {
// 					w.shift();
// 					t++
// 				} else {
// 					break
// 				}
// 			}
// 			if(t == n) {
// 				w.shift()
// 			}
// 		}
// 		w.reverse();
// 		result = w.join('');
// 		if(d == -1) {
// 			result = '-' + result
// 		}
// 		if(result == '') {
// 			return 0
// 		} else {
// 			return result
// 		}
// 	};

// 	function w(a) {
// 		var b = a.slice(0);
// 		b.reverse();
// 		return b.join('')
// 	}

// 	function arrMul(a, b) {
// 		var c = [];
// 		for(var i = 0; i < a.length; i++) {
// 			var d = [];
// 			for(var j = 0; j < i; j++) {
// 				d.push(0)
// 			}
// 			for(var j = 0; j < a.length; j++) {
// 				d.push(b[i] * a[j])
// 			}
// 			c.push(tosingle(d))
// 		}
// 		return tosingle(arrplus(c))
// 	};

// 	function tosingle(a) {
// 		var b = [];
// 		var c = 0;
// 		for(var i = 0; i < a.length; i++) {
// 			b.push((a[i] + c) % 10);
// 			c = parseInt((a[i] + c) / 10)
// 		}
// 		while(c > 9) {
// 			b.push(c % 10);
// 			c = parseInt(c / 10)
// 		}
// 		if(c != 0) b.push(c);
// 		return b
// 	};

// 	function arrplus(a) {
// 		var b = [];
// 		var c = 0;
// 		var d = a.length;
// 		var e = 0;
// 		while(e < d) {
// 			var f = 0;
// 			e = 0;
// 			for(var i = 0; i < d; i++) {
// 				if(!a[i][c] && a[i][c] != 0) e++;
// 				f += a[i][c] ? Number(a[i][c]) : 0
// 			}
// 			if(e < d) b.push(f);
// 			c++
// 		}
// 		return b
// 	}

// 	function tosingle2(a) {
// 		var b = [];
// 		var c = 0;
// 		for(var i = 0; i < a.length; i++) {
// 			var d = a[i] + c;
// 			if(d >= 0) {
// 				b.push(d % 10);
// 				c = parseInt(d / 10)
// 			} else {
// 				if(d % 10 == 0) {
// 					b.push(d % 10);
// 					c = parseInt(d / 10)
// 				} else {
// 					b.push(10 + (d % 10));
// 					c = parseInt((d / 10) - 1)
// 				}
// 			}
// 		}
// 		while(c > 9 || c < -9) {
// 			var d = a[i] + c;
// 			if(d >= 0) {
// 				b.push(d % 10);
// 				c = parseInt(d / 10)
// 			} else {
// 				if(d % 10 == 0) {
// 					b.push(d % 10);
// 					c = parseInt(d / 10)
// 				} else {
// 					b.push(10 + (d % 10));
// 					c = parseInt((d / 10) - 1)
// 				}
// 			}
// 		}
// 		if(c != 0) b.push(c);
// 		while(b[b.length - 1] == 0) {
// 			b.pop()
// 		}
// 		return b
// 	}

// 	function arrminute(c, d) {
// 		var e = [];
// 		var f = c.length > d.length ? c.length : d.length;
// 		for(var i = 0; i < f; i++) {
// 			if(!c[i] && c[i] != 0) {
// 				var a = 0
// 			} else {
// 				var a = Number(c[i])
// 			}
// 			if(!d[i] && d[i] != 0) {
// 				var b = 0
// 			} else {
// 				var b = Number(d[i])
// 			}
// 			e.push(a - b)
// 		}
// 		return tosingle2(e)
// 	}

// 	function contrast(a, b) {
// 		var c = a.length;
// 		var d = b.length;
// 		if(c < d) {
// 			return false
// 		} else if(c == d) {
// 			for(var i = c - 1; i > -1; i--) {
// 				if(Number(a[i]) < Number(b[i])) {
// 					return false
// 				} else if(Number(a[i]) > Number(b[i])) {
// 					return true
// 				}
// 			}
// 		}
// 		return true
// 	}
// 	return {
// 		power: power,
// 		multiply: multiply,
// 		minus: minus,
// 		plus: plus,
// 		divide: divide
// 	};;
// }());