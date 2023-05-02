
/// Manejo de objetos genericos
// Donde T representa un tipo de objeto
export function WhatsMyType<T>(argument: T): T{

    return argument;

}

const amIString = WhatsMyType<string>('Cadena de texto');
const amINumber = WhatsMyType<number>(45682);
const amIArray = WhatsMyType<number[]>([1,2,3,4,5]);

console.log( amIString.split(' ') );
console.log( amINumber.toFixed() );
console.log( amIArray.join('-') );