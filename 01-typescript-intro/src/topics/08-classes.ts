
// Forma clasica (No tradicional de usar)
class Person1{
    public name: string;
    public address: string;

    constructor() {
        this.name = 'Default name';
        this.address = 'Default address';
    }
}

// Forma tradicional
export class Person{
    constructor(
        public name: string,
        private address: string = 'Default address' // Valor por defecto
    ){}
}

export class Hero extends Person{
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string
    ){
        super(realName, 'New York'); // Se manda a llamar para inicializar los atributos de la herencia
    };
}

// Recibe los datos de la clase Hero
const persona = new Hero('Massive', 24, 'David');

console.log(persona);
