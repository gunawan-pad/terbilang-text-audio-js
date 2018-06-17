# terbilang.indonesia.text.audio.js

terbilang.indonesia.text.audio.js adalah librari javascript untuk mengubah string angka menjadi string terbilang dan juga membangkitkan audio.


## Contoh

```javascript
var config = {
	audioDir : 'audio',
	audioExt : 'mp3'
};
var ot = new Terbilang(config),
    angka = "123,001",
    delay = 1;// tunda 1 detik

var outString = ot.terbilangFloat(angka); // text
ot.terbilangAudio(outString, delay); // audio

```

## License
Dibuat oleh Gunawan Padnanto, dibawah lisensi GPL