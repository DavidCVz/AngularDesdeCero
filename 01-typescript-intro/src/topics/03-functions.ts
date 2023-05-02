
// Funcion con argumentos obligatorios
function AddNumbers(a: number, b: number){
    return a + b;
}

// Funcion de flecha
const AddNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`
}

//Funcion con parametros opcionales y por defecto
function MultipyNumbers(firstNumber: number, secondNumber?: number, base:number = 10){
    return firstNumber + base;
}

// Tipado estricto
const result: string = AddNumbers(1,2).toString();
const result2: string = AddNumbersArrow(5, 4);
const multiply: number = MultipyNumbers(8);

console.log({result});
console.log({result2});
console.log({multiply});


// * FUNCION CON PARAMETROS DE TIPO OBJETO*
interface Character{
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = ( character: Character, amount: number ) =>{
    character.hp += amount;
    console.log(`Character healed: + ${amount}`);
}

const strider: Character = {
    name: "Strider",
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`);
    },
}


healCharacter(strider, 20);
healCharacter(strider, 30);
console.log({strider});

export {};