const alfabeto_natural = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

module.exports = function (len, alfabeto = alfabeto_natural) {
    let index = 0, str = "";
    while (index++ < len) {
        str += alfabeto[Math.floor(Math.random() * alfabeto.length)];
    }
    return str;
};