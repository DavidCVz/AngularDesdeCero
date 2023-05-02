/**Imagina que tienes una clase MiClase y quieres aplicar un decorador que imprima un 
 * mensaje por consola cada vez que se llame al método miMetodo de dicha clase. 
 * Para lograr esto, podrías crear el decorador de la siguiente manera: */
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        console.log(`Método ${propertyKey} llamado con argumentos ${args}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

/**En este ejemplo, el decorador log recibe tres argumentos:
 * * target: es el objeto o función que contiene la propiedad o método decorado.
 * * propertyKey: es una cadena que representa el nombre de la propiedad o método decorado.
 * * descriptor: es un objeto que describe la propiedad o método decorado y contiene sus atributos.
 * Dentro del decorador, se obtiene la función original del método y se modifica su 
 * comportamiento para que imprima un mensaje por consola antes de ejecutarse.
 * Una vez que tienes definido el decorador, puedes aplicarlo a un método de la clase MiClase 
 * de la siguiente manera: */
class MiClase {
    @log
    miMetodo(arg1: string, arg2: number) {
        console.log(`Método miMetodo ejecutado con argumentos ${arg1} y ${arg2}`);
    }
}
  
const instancia = new MiClase();

instancia.miMetodo('msj1', 16);

export {};