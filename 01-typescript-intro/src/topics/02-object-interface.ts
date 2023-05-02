
//** Declaración de arreglos **
// Estricta
const Arreglo1: string[] = ['Alpha', 'Omega', 'Begginnig'];
// Multiples tipos
const Arreglo2: (number | string)[] = [404, 500, 'NotFound', 204 ];
const Arreglo3: (number | boolean | string)[] = [45, true, 'Camara'];

// ** Declaracion de objetos **
// Estricto a traves de interfaz
interface Character{
    name: string;
    hp: number;
    skills: string[];
    hometown?: string; // ? Indica que un atributo puede ser nulo
}

const Strider: Character = {
    name: 'Strider',
    hp: 95,
    skills: ['Bash', 'Counter']
}

// Asignacion de atributos

Strider.hometown = 'Rivendell';

console.table(Strider);

export {};