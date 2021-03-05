
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