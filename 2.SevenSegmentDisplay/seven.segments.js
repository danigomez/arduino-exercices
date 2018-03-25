const five = require("johnny-five");
const SevenSegmentDisplay = require("./SevenSegmentDisplay");

const board = new five.Board();
/*
* Ánodo común
* Contando desde izquierda a derecha
*
* Superior
* 1 - G
* 2 - F
* 3 - Vcc
* 4 - A
* 5 - B
*
* Inferior
* 1 - E
* 2 - D
* 3 - Vcc
* 4 - C
* 5 - Dot
* */


const numbers = [
    ["A", "B", "C", "D", "E", "F"], // 0
    ["C", "B"], // 1
    ["A", "B", "G", "D", "E"], // 2
    ["A", "B", "C", "D", "G"], // 3
    ["B", "C", "F", "G"], // 4
    ["A", "F", "G", "C", "D"], // 5
    ["A", "F", "C", "D", "E", "G"], // 6
    ["A", "B", "C"], // 7
    ["A", "B", "C", "D", "E", "F", "G"], // 8
    ["A", "B", "C", "F", "G"], // 9

];


board.on("ready", function() {

    let counter = 0;

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

    const display = new SevenSegmentDisplay({pins});
    const button = new five.Button(10);

    button.on("press", function() {
        display.printToScreen(numbers[counter++])
    });

    button.on("hold", function() {
        display.printToScreen(numbers[counter--])
    });

});