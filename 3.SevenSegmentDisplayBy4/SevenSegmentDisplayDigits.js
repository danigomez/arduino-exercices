const SevenSegmentDisplay = require("../2.SevenSegmentDisplay/SevenSegmentDisplay");

function SevenSegmentDisplayDigits(options) {
    const { pins, control } = options;
    this.display = new SevenSegmentDisplay({pins, type: "CATHODE"}); // Data segment pins to instantiate a display
    this.control = control.map(pin => ({
        status: true, // 0 Off, 1 On
        pin
    })); // Control pins
    this.clear();
}

SevenSegmentDisplayDigits.prototype._clearActiveDigits = function () {
    this.control.forEach(control => {
        if (control.status) {
            control.pin.high(); // Select display from pin
            control.status = false;
        }
    });
};

SevenSegmentDisplayDigits.prototype.drawToAll = function(data) {

    if (data < 0 || data > 9) {
        throw new Error("The number should be between 0 and 9999");
    }
    this.control.forEach(control => {
        if (!control.status) {
            control.pin.low(); // Select display from pin
            control.status = true;
        }
    });
    this.display.draw(data); // Write to segments

};

SevenSegmentDisplayDigits.prototype.draw = function(data, number) {
    const currentDisplay = this.control[number];
    this.clear();
    if (!currentDisplay.status) {
        currentDisplay.pin.low();
        currentDisplay.status = true;
    }
    this.display.draw(data); // Write to segments
};

SevenSegmentDisplayDigits.prototype.printToAllScreens = function(data) {
    this.control.forEach(control => {
        if (!control.status) {
            control.pin.low(); // Select display from pin
            control.status = true;
        }
    });
    this.display.printToScreen(data); // Write to segments
};

SevenSegmentDisplayDigits.prototype.clear = function() {
    this._clearActiveDigits();
    this.display.clear();
};

SevenSegmentDisplayDigits.prototype.printToScreen = function(data, number) {
    const currentDisplay = this.control[number];
    this.clear();
    if (!currentDisplay.status) {
        currentDisplay.pin.low();
        currentDisplay.status = true;

    }
    this.display.printToScreen(data);
};

module.exports = SevenSegmentDisplayDigits;