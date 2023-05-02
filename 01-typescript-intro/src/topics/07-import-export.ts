import { Product, TaxCalculation } from './06-function-desestructuring';

const shoppingCart: Product[] = [
    {
        description: 'Nokia A11',
        price: 100,
    },

    {
        description: 'iPad Air',
        price: 250
    }
];

const tax: number = 0.15;
const [tarifa, total] = TaxCalculation({tax:tax, products:shoppingCart});

console.log('Total: ', total);
console.log('Tarifa: ', tarifa);