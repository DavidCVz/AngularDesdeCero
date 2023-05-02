interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 70,
    songDuration: 35,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
}

/// OBTENCION DE ATRIBUTOS A TRAVES DEL OBJETO
console.log('Volumne: ', audioPlayer.audioVolume);
console.log('Duracion: ', audioPlayer.songDuration);
console.log('Cancion: ', audioPlayer.song);
console.log('Autor: ', audioPlayer.details.author);


/// OBTENCION DE ATRIBUTOS A TRAVES DE DESESTRUCTURACION

//Desestructuracion
const {audioVolume, songDuration} = audioPlayer;

console.log('Volumen d: ', audioVolume);
console.log('Song duretaion d: ', songDuration);

//Desestructuracion con renombramiento
//-- En caso que exista alguna variable con el mismo nombre que 
//   el atributo de un objeto el cual se desestructurara o se desee renombrar
const song = 'New song';

const {song:anotherSong, audioVolume:anotherVolume} = audioPlayer;
console.log('Nueva cancion:', song);
console.log('Otra cancion:', anotherSong);
console.log('Otro volumen:', anotherVolume);

//Desestructuracion de objetos anidados
//-- Obtencion de atributo principal
const {details} = audioPlayer;

//-- Obtencion de atributos anidados
const {author, year} = details;

console.log('Autor: ', author);
console.log('Año de publicacion: ', year);


/// DESESTRUCTURACION DE ARREGLOS
const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];

const [ , , trunks, gohan = 'Por defecto'] = dbz; //Obteniendo el tercer elemento y asignando un valor por defecto en caso de no existir

console.log(trunks);
console.log(gohan);

