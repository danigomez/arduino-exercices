function SevenSegmentDisplay(options) {
    const { pins } = options;
    this.pins = pins;
    this.clear();
}

SevenSegmentDisplay.prototype._segments = ["A", "B", "C", "D", "E", "F", "G", "DP"];
SevenSegmentDisplay.prototype.printToScreen = function(data) {
    this.clear(this.pins);
    data.forEach(segment => {
        this._getPinForSegment(segment).low()
    })
};
SevenSegmentDisplay.prototype.clear = function() {
    this._segments.forEach(segment => {
        this._getPinForSegment(segment).high()
    })};
SevenSegmentDisplay.prototype._getPinForSegment = function(segment) {
    const index = this._segments.indexOf(segment);
    if (index === -1) {
        throw new Error(`The segments ${segment} is not available.`);
    }

    return this.pins[index];
};

module.exports = SevenSegmentDisplay;