const five = require('johnny-five');

const board = new five.Board();

const POTENTIOMETER_MAX = 1023;
const ANALOG_MAX = 255;
const REL = ANALOG_MAX / POTENTIOMETER_MAX;

board.on('ready', function () {

    // Valor que devuelve el potenciometro
    const pinA = new five.Pin("A2");

    pinA.read(function (error, value) {
        // Se utiliza un pin PWD digital para simular una salida analógica
        board.pinMode(3, five.Pin.PWM);
        board.analogWrite(3, REL*value)
    });

});