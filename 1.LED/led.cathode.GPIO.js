const johnnyFive = require("johnny-five");

const D_PIN = 2;

const board = new johnnyFive.Board();

// Si  el ánodo (+) está conectado a Vcc y el cátodo (-) a un pin
// al apagar el pin se cierra el circuito encendiendo el LED
board.on("ready", function () {
    const pin = new johnnyFive.Pin(D_PIN);
    pin.high();

});

