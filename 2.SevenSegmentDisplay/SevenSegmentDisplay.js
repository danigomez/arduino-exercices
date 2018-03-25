function SevenSegmentDisplay(options) {
    const { pins, type } = options;
    this.pins = pins;
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
    this.clear(this.pins);
    data.forEach(segment => {
        this._getPinForSegment(segment)[this._typeAction[this.type].on]();
    })
};
SevenSegmentDisplay.prototype.clear = function() {
    this._segments.forEach(segment => {
        this._getPinForSegment(segment)[this._typeAction[this.type].off]();
    })};
SevenSegmentDisplay.prototype._getPinForSegment = function(segment) {
    const index = this._segments.indexOf(segment);
    if (index === -1) {
        throw new Error(`The segments ${segment} is not available.`);
    }

    return this.pins[index];
};

module.exports = SevenSegmentDisplay;