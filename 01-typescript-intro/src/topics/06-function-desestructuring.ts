// Modelo
export interface Product {
    description: string;
    price: number;
}

// Funcion de calculo

interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}

//function TaxCalculation ( options:TaxCalculationOptions ): [number, number]{
export function TaxCalculation ( {tax, products}:TaxCalculationOptions ): [number, number]{
    let total = 0;

    products.forEach(element => {
        total += element.price;
    });

    return [total * tax, total]
}

// Objetos
const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet: Product = {
    description: 'iPad Air',
    price: 500.0
}

const shoppingCart = [phone, tablet];
const tax = 0.15;
const [tarifa, total] = TaxCalculation({tax: tax, products: shoppingCart});

console.log('Tarifa:', tarifa);
console.log('Resultado:', total);

export {};
