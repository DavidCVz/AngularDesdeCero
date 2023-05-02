
export interface Passenger{
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: "David"
}

const passenger2: Passenger = {
    name: "Mei",
    children: ['Desiree', 'Kaori', 'Armin']
}

const PrintChildren = (passenger: Passenger) => {

    const howManyChildren = passenger.children?.length || 0; // "?" es Optional Chaining
    //const howManyChildren = passenger.children!.length || 0; // "!" es Not Null Assertion Operator

    console.log( passenger.name, `*** Number of children ${howManyChildren}`);
}

PrintChildren(passenger1);
PrintChildren(passenger2);
