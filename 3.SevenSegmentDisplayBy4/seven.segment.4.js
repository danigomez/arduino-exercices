const five = require("johnny-five");
const SevenSegmentDisplayDigits = require("./SevenSegmentDisplayDigits");

const board = new five.Board();

board.on("ready", function () {
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

    const display = new SevenSegmentDisplayDigits({
        pins,
        control
    });

    let counter = 0;
    let goUp = true;
    let step = 1;

    setInterval(function () {
        display.draw(counter);

        if (goUp && counter === 9) {
            goUp = !goUp;
            step = -1
        } else if (!goUp && counter === 0) {
            goUp = !goUp;
            step = 1;
        }
        counter += step;

    }, 500);
});

