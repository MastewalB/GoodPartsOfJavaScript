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
            bin_fun: undefined
        }
    }
}