
//from returns a function that returns increasing value of numbers 
function from(start) {
    return function () {
        var next = start;
        start += 1;
        return next;
    };
}

/* let f = from(5);
console.log(f()); // 5
console.log(f());  // 6
*/

function to(from, end) {
    return function () {
        let value = from();
        if (value < end) {
            return value;
        }
        return undefined;
    };
}

function fromTo(start, end) {
    return to(from(start), end);
}

function element(array, gen) {
    return function () {
        let index = gen();
        if (index !== undefined) {
            return array[index];
        }
        return undefined;
    };
}


//element_modified - generator() function is optional
function element_modified(array, gen) {
    if (gen === undefined) {
        gen = fromTo(0, array.length);
    }
    return function () {
        let index = gen();
        if (index !== undefined) {
            return array[index];
        }
        return undefined;
    };

}

function collect(array, gen) {
    return function () {
        let index = gen();
        if (index != undefined) {
            array.push(index);
        }
        return array;
    };
}

function filter(gen, predicate) {
    return function () {
        let value;
        do {
            value = gen();
        } while (
            value !== undefined && !predicate(value)
        );
        return value;
    };
}

function concat(gen1, gen2) {
    let gen = gen1;
    return function () {
        let value = gen();
        if (value !== undefined) {
            return value;
        }
        gen = gen2;
        return gen();
    }
}


//Symbol Function Generator Factory
//Takes a symbol to return a function that generates a unique version of the symbol on each invocation
function gensymf(symbol) {
    let serial = 1;
    return function () {
        serial += 1;
        return symbol + serial;
    }
}


/*
Factory Generator
 */

function gensymff(symbol, seed) {
    return function () {
        let number = seed;
        return function () {
            number = unary(number);
            return symbol + number;
        }
    };
}

/*
a function that returns a generator that will return the next fibonacci number
*/
function fibonnacif(a, b) {
    return function () {
        let next = a;
        a = b;
        b += next;
        return b;
    };
}

/* let fib = fibonnacif(2, 3);
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
*/