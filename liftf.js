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