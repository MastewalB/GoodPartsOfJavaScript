function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

function sub(a, b) {
    return a - b;
}

function reverse(binfun) {
    return function (a, b) {
        return binfun(b, a);
    };
}

function reverse_classic(binfun) {
    return function (...args) {
        return new_fun(...args.reverse())
    };
}

function liftf(binfun) {
    return function (first) {
        return function (second) {
            return binfun(first, second);
        };
    };
}

function twice(binfun) {
    return function (arg) {
        return binfun(arg, arg);
    };
}

/*
    Currying is a technique in which a function takes multiple arguments and returns a sequence of functions
    with each single argument.
*/
/**
 * Function takes a binary function and a number as an argument and returns another function 
 * that takes another argument to call the binary function with the first one
 * @param {Function} binfun - 
 * @param {Integer} arg 
 */
function curry(binfun, arg) {
    return function (second) {
        return binfun(arg, second);
    };

}

function composeu(unifun1, unifun2) {
    return function (arg) {
        return unifun2(unifun1(arg))
    };
}

function composeb(binfun1, binfun2) {
    return function (a, b, c) {
        return binfun2(binfun1(a, b), c);
    };
}

/**
 * Function takes a count value and calls function binfun until count is zero
 * @param {Function} binfun - A binary function 
 * @param {Integer} count - A count integer value
 * @returns {Function} - Function binfun is invoked
 */
function limit(binfun, count) {
    return function (a, b) {
        if (count > 1) {
            count -= 1;
            return binfun(a, b);
        }
        return undefined;
    };
}

let doubl = twice(add);
let square = twice(mul);
let bus = reverse(sub);
let ad = bus(3, 2);
console.log(ad);
//console.log(liftf(add));


/**
 * A function that takes a binary function and returns an object containing an invoke function 
 * that can invoke the binary function and revoke function that disables the invoke function
 * @param {Function} bin_fun - A binary function that takes to arguments to perform a certain calculation 
 * @return {Object} - object contains invoke and revoke functions  
*/
function revocable(bin_fun) {
    return {
        invoke: function (first, second) {
            if (bin_fun !== undefined) {
                return bin_fun(first, second)
            }
        },
        revoke: function () {
            bin_fun = undefined
        }
    }
}


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

/**
 * function that takes a value and optional source string and returns them in an object
 * @param {Integer} - value 
 * @param {String} - Source of the value
*/
function m(value, source) {
    return {
        value: value,
        source: (typeof source === 'string') ? source : String(value)
    }
}

function addm(a, b) {
    return m(
        a.value + b.value,
        "(" + a.source + "+" +
        b.source + ")"

    );
}


function liftm(bin_fun, op) {
    return function (a, b) {
        return m(
            bin_fun(a.value, b.value),
            "(" + a.source + op +
            b.source + ")"
        );
    };
}


function liftm_modified(bin_fun, op) {
    return function (a, b) {
        if (typeof a === 'number') {
            a = m(a);
        }
        if (typeof b === 'number') {
            b = m(b);
        }

        return m(
            bin_fun(a.value, b.value),
            "(" + a.source + op +
            b.source + ")"
        );
    };
}

/**
 * Function to return an object containing two functions to implement up and down counter
 * @param {Integer} value - Is the value of the counter 
 * @returns {Function} up, down - these functions increase and decrease the value 
*/
function counter(value) {
    return {
        up: function () {
            value += 1;
            return value;
        },
        down: function () {
            value -= 1;
            return value;
        }
    };
}