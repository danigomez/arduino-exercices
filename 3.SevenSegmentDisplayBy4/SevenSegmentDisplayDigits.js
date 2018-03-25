const SevenSegmentDisplay = require("../2.SevenSegmentDisplay/SevenSegmentDisplay");

function SevenSegmentDisplayDigits(options) {
    const { pins, control } = options;
    this.display = new SevenSegmentDisplay({pins, type: "CATHODE"}); // Data segment pins to instantiate a display
    this.control = control; // Control pins
    this.clear();
}

SevenSegmentDisplayDigits.prototype.draw = function(data) {

    if (data < 0 || data > 9) {
        throw new Error("The number should be between 0 and 9999");
    }
    this.control.forEach(pin => {
        pin.low(); // Select display from pin
    });
    this.display.draw(data); // Write to segments

};

SevenSegmentDisplayDigits.prototype.printToAllScreens = function(data) {
    this.control.forEach(pin => {
        pin.low(); // Select display from pin
    });
    this.display.printToScreen(data); // Write to segments
};

SevenSegmentDisplayDigits.prototype.clear = function() {
    this.control.forEach(pin => {
        pin.high(); // Select display from pin
    });
    this.display.clear();
};

SevenSegmentDisplayDigits.prototype.printToScreen = function(data, number) {
    this.control[number].low();
    this.display.printToScreen(data);
};

module.exports = SevenSegmentDisplayDigits;