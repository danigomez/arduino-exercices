const five = require("johnny-five");
const SevenSegmentDisplayDigits = require("../3.SevenSegmentDisplayBy4/SevenSegmentDisplayDigits");

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

    const that = this;
    const WAIT = 15;

    let count = 0;
    let step = 1;
    let goUp = true;
    setInterval(function () {
        if (goUp && count === 0) {
            step = 1;
            goUp = false;
        } else if (!goUp && count === 99) {
            step = -1;
            goUp = true;
        }

        count += step;

    }, 250);

    that.loop(30, function () {
        display.draw(count % 10, 2);
        that.wait(WAIT, function () {
            display.draw(Math.floor(count / 10), 3);

        })

    })

});

