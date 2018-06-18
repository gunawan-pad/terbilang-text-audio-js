# terbilang.indonesia.text.audio.js

terbilang.indonesia.text.audio.js adalah librari javascript untuk mengubah string angka menjadi string terbilang dan juga membangkitkan audio.


## Contoh

```javascript
var config = {
	audioDir : 'audio', // path ke direktori file audio
	audioExt : 'mp3' // ekstensi file audio
};
var ot = new Terbilang(config),
    angka = "10513,001",
    delay = 1000;// tunda 1 detik

ot.floatMaxLen = 5; // batas digit di belakang yang akan diproses
// ot.comma = ","; // karakter koma, bisa diganti titik

var outString = ot.terbilangFloat(angka); // text terbilang
ot.terbilangAudio(outString, delay); // audio terbilang
outString = ot.sambungSe(outString); // menyambung se puluh menjadi sepuluh

```

## Lisensi
Dibuat oleh Gunawan Padnanto, dibawah lisensi MIT