const five = require("johnny-five");
const SevenSegmentDisplayDigits = require("../3.SevenSegmentDisplayBy4/SevenSegmentDisplayDigits");

const board = new five.Board();

const C = ["A", "D", "E", "F"];
const F = ["A", "E", "F", "G"];

board.on("ready", function () {

    const that = this;
    const WAIT = 10;
    let temp = 0;
    let isCelsius = true;

    // Sensor de temperatura LM35
    const termo = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
    });

    const pins = [
        new five.Pin(2),
        new five.Pin(3),
        new five.Pin(4),
        new five.Pin(5),
        new five.Pin(6),
        new five.Pin(7),
        new five.Pin(8),
        new five.Pin(9)
    ];

    const control = [
        new five.Pin(10), // D1
        new five.Pin(11), // D2
        new five.Pin(12), // D3
        new five.Pin(13)  // D4
    ];

    // Control de las cuatro pantallas LED
    const display = new SevenSegmentDisplayDigits({
        pins,
        control
    });

    // Botón para cambiar de Celsius a Fahrenheit
    const button = new five.Button("A1");

    termo.on("data", function () {
        temp = Math.floor(isCelsius ? this.C : this.F);
    });

    button.on("press", function () {
        isCelsius = !isCelsius;
    });

    // Loop para hacer multiplexado del valor de temperatura sobre los display LED
    that.loop(50, function () {
        const scale = isCelsius ? C : F;
        display.draw(Math.floor(temp / 100), 3);
        that.wait(WAIT, function () {
            display.draw(Math.floor((temp % 100) / 10), 2);
            that.wait(WAIT, function () {
                display.draw(temp % 10, 1);
                that.wait(WAIT, function () {
                    display.printToScreen(scale, 0);

                });
            })
        })
    })

});