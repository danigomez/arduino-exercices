const johnnyFive = require("johnny-five");

const D_PIN = 2;

const board = new johnnyFive.Board();

board.on("ready", function () {
    const led = new johnnyFive.Led(D_PIN);
    led.on();

});

