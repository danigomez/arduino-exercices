function SevenSegmentDisplay(options) {
    const { pins, type } = options;
    this.pins = pins.map(pin => ({
        status: false,
        pin
    }));
    this.type = type || this._types[this._defaultType];
    this.clear();
}

SevenSegmentDisplay.prototype._numbers = [
    ["A", "B", "C", "D", "E", "F"], // 0
    ["C", "B"], // 1
    ["A", "B", "G", "D", "E"], // 2
    ["A", "B", "C", "D", "G"], // 3
    ["B", "C", "F", "G"], // 4
    ["A", "F", "G", "C", "D"], // 5
    ["A", "F", "C", "D", "E", "G"], // 6
    ["A", "B", "C"], // 7
    ["A", "B", "C", "D", "E", "F", "G"], // 8
    ["A", "B", "C", "D", "F", "G"], // 9

];

SevenSegmentDisplay.prototype._defaultType = 0;
SevenSegmentDisplay.prototype._types = ["ANODE", "CATHODE"];
SevenSegmentDisplay.prototype._typeAction = {
    "ANODE": {
        on: "low",
        off: "high"
    },
    "CATHODE": {
        on: "high",
        off: "low"
    }
};

SevenSegmentDisplay.prototype._segments = ["A", "B", "C", "D", "E", "F", "G", "DP"];
SevenSegmentDisplay.prototype.draw = function(data) {
    if (Array.isArray(data)) {
        this.printToScreen(data)
    } else {
        this.printNumber(data);
    }
};

SevenSegmentDisplay.prototype.printNumber = function (number) {
    if (number < 0 || number > 9) {
        throw new Error("The numbers should be beetween 0 and 9.")
    }
    this.printToScreen(this._numbers[number]);
};
SevenSegmentDisplay.prototype.printToScreen = function(data) {
    const segmentsToClear = this._segments.filter(segment => !data.includes(segment));
    this._clearSegments(segmentsToClear);
    data.forEach(segment => {
        const currentPin = this._getPinForSegment(segment);

        if (!currentPin.status) {
            currentPin.pin[this._typeAction[this.type].on]();
            currentPin.status = true;
        }
    })
};
SevenSegmentDisplay.prototype._clearSegments = function(segments) {
    segments.forEach(segment => {
        const currentPin = this._getPinForSegment(segment);

        if (currentPin.status) {
            currentPin.pin[this._typeAction[this.type].off]();
            currentPin.status = false;
        }
    })
};

SevenSegmentDisplay.prototype.clear = function() {
    this._clearSegments(this._segments);
};
SevenSegmentDisplay.prototype._getPinForSegment = function(segment) {
    const index = this._segments.indexOf(segment);
    if (index === -1) {
        throw new Error(`The segments ${segment} is not available.`);
    }

    return this.pins[index];
};

module.exports = SevenSegmentDisplay;