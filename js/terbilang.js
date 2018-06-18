var Terbilang = (function() {	

"use strict";

function Terbilang(config) {
	this._init(config);
}

Terbilang.prototype.comma = ',';
Terbilang.prototype.floatMaxLen = 2;
Terbilang.prototype.strComma = 'koma';

Terbilang.prototype.audioDir = '';
Terbilang.prototype.audioExt = 'mp3';

Terbilang.prototype.arrSatuan = ["nol", "se", "dua", "tiga", "empat", 
	"lima", "enam", "tujuh", "delapan", "sembilan"];

Terbilang.prototype._3an = ["", "ribu", "juta", "miliar", 
	"triliun ", "kuadriliun ", "kuantiliun ", "sekstiliun ",
	"septiliun ", "oktiliun ", "noniliun ", "desiliun "
];

Terbilang.prototype._an = ["", "puluh ", "ratus "];


Terbilang.prototype._init = function(config) {
	if (config) 
		for (var k in config) 
			if (k in this) this[k] = config[k];
	
	return this;
}

/*
eg: se belas > sebelas
*/
Terbilang.prototype.sambungSe = function(strInput) {
	return strInput.replace(/se\s+/mg, 'se');
}

Terbilang.prototype.RES = function(strInput) {
	// remove extra spaces
	return strInput.replace(/\s+/mg, ' ').trim();
}

Terbilang.prototype.cleanInput = function(strInput) {
	// clean input from non digit and non comma chars
	var re = new RegExp("[^\\d" + this.comma + "]+", "mg");
	return strInput.replace(re, '');
}

/*
parse, split to int and float value array
*/
Terbilang.prototype.parseInput = function(strInput) {
	// cek is valid input (numbers and comma only)
	var re = new RegExp("[^\\d" + this.comma + "]+", "mg");
	if (strInput !== strInput.replace(re, '')) return [];

	return strInput.split(this.comma).map(function(elem, i) {
		return elem === "" ? "0" : elem;
	})
}

Terbilang.prototype.terbilangFloat = function(strInput) {
	// terbilang with decimal value
	// eg: 123,02
	var arrVals = this.parseInput(strInput),
		arrAll = [], fval;

	if (arrVals.length === 0) return '';

	// process int val
	arrAll.push(this.terbilang(arrVals[0]));

	if (fval = arrVals[1] ) {
		arrAll.push(this.strComma);
		arrAll.push(fval.startsWith('0') ? this.terbilangPlain(fval) : this.terbilang(fval));
	}

	return this.RES(arrAll.join(" ")).replace(/^satu ribu/, "se ribu");
}

/*
untuk nilai float yg dimulai dengan angka nol
*/
Terbilang.prototype.terbilangPlain = function(strInput) {
	var _as = this.arrSatuan;
	return this.RES(
		strInput.split("").map(function(elem, i) {
			return elem === '1' ? 'satu' : _as[parseInt(elem)];
		}).join(' ')
	);
}

Terbilang.prototype.processGrp3 = function(g3) {

	var arrRes = [],
		i = 0,
		x, c;

	while (i < 3) {
		c = parseInt(g3[i]);

		if (c === 0) {
			i++;
			continue
		};

		if (i === 1 && c === 1) {
			// belasan
			x = parseInt(g3[i + 1]);
			arrRes.push(0 === x ? 'se puluh' : this.arrSatuan[x] + ' belas');

			break;
		} else
			arrRes.push((c === 1 && i === 2 ? 'satu' : this.arrSatuan[c]) + ' ' + this._an[3 - 1 - i]);

		i++;
	}

	return arrRes.join(" ");
}

Terbilang.prototype.terbilang = function(strInput) {

	// console.log(strInput);
	// add zero padding if necessary, eg: 3182 > 003182
	while ((strInput.length % 3) !== 0)
		strInput = '0'.concat(strInput);

	var v3, ret = [], _3step = 0, inpLen = strInput.length;

	for (var i = 0; i < inpLen; i += 3) 
		v3 = this.processGrp3(strInput.substring(i, i + 3)).trim(),
		ret.push(v3.length === 0 ? v3 : v3 + ' ' + this._3an[(inpLen / 3) - _3step - 1]),
		_3step++;

	return ret = ret.join(" ").trim(), 
	this.RES(ret === '' ? 'nol ' : ret); //.replace(/se\s/mg, 'se');

}

Terbilang.prototype.terbilangAudio = function(strTerbilang, iDelay) {
	var audioDir = this.audioDir, // audio directory
		audioExt = this.audioExt, // audio extension
		words = strTerbilang.split(" ").filter(function(item) {
			return item.trim() !== ''
		}),
		i = 0, snd;

	! function SPS() {
		if (i >= words.length) return;
		snd = new Audio(audioDir + '/' + words[i] + '.' + audioExt),
		snd.addEventListener('ended', function() {setTimeout(SPS, iDelay)});
		snd.play(), i++
	}();
}

return Terbilang;

})();