/*
Actividad en clase: Javascript
9 de abril 2026
Daniela Gil González 
A01752908
 */

"use strict";

//Funciones

function firstNonRepeating(cadena){
    let unico = undefined;  //undefined esperado si esta vacía
    if (cadena.length === 0){
        return unico;
    }

    const mapa = new Map();  //estructura que tiene keys y sus valores
    for (let i = 0; i < cadena.length; i++){
        let letra = cadena[i]   
        //Aquí hago el conteo o añado las letras 
        if (mapa.get(letra) === undefined){     //si no esta en 'unico', se añade la key, con valor inicial 1
            mapa.set(letra, 1);
        } else {    //si está, le sumo 1 al conteo
            let valor = mapa.get(letra) + 1     //obtiene el valor de la key 'letra' y le suma
            mapa.set(letra, valor)              //cambia el valor de la key por la suma obtenida
        }
    }
    for (const key of mapa.keys()){     //aquí se van recorriendo las keys 
        let actual = mapa.get(key);     //obtiene la 'letra' actual de la iteración
        if (actual === 1){              //si el valor de la key 'letra' es 1 lo guarda
            unico = key;                //como es el primero encontró, lo regresa
            break;
        }
    }
    return unico;
}

function bubbleSort(lista){
    for (let i = 0; i<lista.length -1; i++){
        for (let j = 0; j< lista.length -i -1; j++){
            if (lista[j] > lista[j+1]){
                let temporal = lista[j]; //cambia de lugar los datos
                lista[j] = lista[j+1];
                lista[j+1] = temporal;
            }
        }
    }
    return lista;
}

function invertArray(array){
    let nuevo = [];
    let limit = array.length;
    for (let i = limit-1; i>=0; i--){
        nuevo.push(array[i]) //añade al final del array
    }
    return nuevo;
}

function invertArrayInplace(array){
    let limit = array.length;
    for (let i = limit-1; i>=0; i--){
        array.push(array[i])
    }
    for (let i = 0; i<limit; i++){
        array.shift(array[i])   //elimina el elemento del array, en este caso los del incio
    }
    return array;
}

function capitalize(texto){
    if (texto.length === 0){
        return texto;
    }
    let mayusculas = "";
    for (let i = 0; i < texto.length; i++){
        if (texto[i-1] === " " || i === 0){
            mayusculas += texto[i].toUpperCase(); //funcion que convierte a mayúsculas
        } else {
            mayusculas += texto[i]
        }
    }
    return mayusculas;
}

function mcd(m, n) { //algoritmo de Euclides, con dos numeros 'm' y 'n'
    if (m === 0 || n === 0) {
        return 0;   
    }
    while (n != 0) {
        let r = m % n;
        m = n;
        n = r;
    }
    return m;
}

function hackerSpeak(texto){
    let diccionario = {
        a : "4", e : "3", i : "1", o : "0", s : "5"
    };
    let hackerText = "";
    for (let i = 0; i< texto.length; i++){
        if (diccionario[texto[i]]){  //si dicc tiene algun indice con la letra iterada
            hackerText += diccionario[texto[i]] //agrega el valor/numero de ese índice a el nuevo texto
        } else {
            hackerText += texto[i] //si no, añade la letra original
        }
    }
    return hackerText;
}

function factorize(n){
    let listaFactores = [];
    if (n === 0) {
        return listaFactores;
    }
    for (let i = n; i >= 1; i--){ //empieza a dividir entre sí mismo, disminuyendo
        let factor = n/i;
        if(factor%1 === 0){       //si el restante de la division no es decimal; es un factor
            listaFactores.push(factor)
        }
    }
    return listaFactores;

}

function deduplicate(array){
    if (array.empty === true){
        return array;
    }
    let nuevo = []
    for (let i = 0; i < array.length; i++){
        let duplicado = false;
        for(let j = 0; j < nuevo.length +1; j++){ 
            if (array[i] === nuevo[j]){ //compara con c/elemento en 'nuevo'
                duplicado = true;
            }
        }
        if (duplicado !== true){
            nuevo.push(array[i])
        }
    }
    return nuevo;
}

function findShortestString(lista){
    if (lista.length === 0){
        return 0;
    }
    let longitud = lista[0].length;
    for (let i = 0; i < lista.length; i++){
        if (longitud > lista[i].length){
            longitud = lista[i].length;
        }
    }
    return longitud;
}

function isPalindrome(texto){
    let nuevo = "";
    let limit = texto.length;
    for (let i = limit-1; i>=0; i--){ //desde el último elemento de 'texto' hasta el inicio, recorre
        nuevo += texto[i]             // y  va añadiendo al final de 'nuevo'
    }          
    if (nuevo === texto){
        return true;
    }
    return false;
}


function sortStrings(lista){ //se puede ordenar con bubble sort aprovechando que el tipo de variable no esta definido.
    return bubbleSort(lista);
}

function stats(lista){
    if (lista.length === 0){
        return [0,0];
    }
    let suma = 0;
    const mapa = new Map();
    for (let i = 0; i < lista.length; i++){
        let key = lista[i];
        suma += key;
        //encontrar y contar o agregar valor
        if (mapa.get(key) === undefined){
            mapa.set(key, 1);
        } else {    //llave, valor
            // let val_actual = mapa.get(key);
            // mapa.set(key, val_actual + 1);
            mapa.set(key, mapa.get(key) + 1);
        }
    }
    let max = 0
    let moda;
    for (const key of mapa.keys()) {
        let actual = mapa.get(key); 
        if (max < actual){
            max = actual;
            moda = key;
        } 
    }
    let promedio = suma/lista.length;
    let resultados = [promedio, moda];
    return resultados;
}

function sortDescending(lista){     //usé el método bubble sort, pero invertido
    for (let i = 0; i<lista.length -1; i++){
        for (let j = 0; j< lista.length -i -1; j++){
            if (lista[j] < lista[j+1]){
                let temporal = lista[j+1]; //cambia de lugar los datos
                lista[j+1] = lista[j];
                lista[j] = temporal;
            }
        }
    }
    return lista;
}

function popularString(lista){ //funció similar a stats, pero sin la parte de promedio
    if (lista.length === 0){
        return "";
    }
    const mapa = new Map();
    for (let i = 0; i < lista.length; i++){
        let key = lista[i];
        //encontrar y contar o agregar valor
        if (mapa.get(key) === undefined){
            mapa.set(key, 1);
        } else {    //llave, valor
            //let val_actual = mapa.get(key);
            //mapa.set(key, val_actual + 1);
            mapa.set(key, mapa.get(key) + 1);
        }
    }
    let popular;
    let max = 0
    for (const key of mapa.keys()) {
        let actual = mapa.get(key); 
        if (max < actual){
            max = actual;
            popular = key;
        } 
    }
    return popular;
}

function isPowerOf2(n){
    if (n <= 0){ //negativos y 0
    return false;
    } else {
        while (n%2 === 0){ //va dividiendo entre 2 mientras tenga residuo entero
            n = n/2
        }
    }
    if (n === 1){
        return true;
    }
    return false;
}


export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,      
    popularString, 
    isPowerOf2,
    sortDescending,
};
