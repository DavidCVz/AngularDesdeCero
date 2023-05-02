
let name = 'Strider';
let hpPoints: number | string = 89; // Indica que una variables puede tener valores de distintos tipos
let hpPoints2: number | 'FULL' = 70; // Indica que una variables puede tener valor de un tipo o algo definido.
let isAlive: boolean = true;

hpPoints2 = 'FULL';

console.log({name, hpPoints2, isAlive});

export {}; // Exportando objeto - Temporalmente para evitar errores