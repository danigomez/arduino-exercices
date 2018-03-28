const five = require("johnny-five");

const board = new five.Board();

board.on("ready", function () {
   const servo = new five.Servo({
       pin: 10,
       startAt: 0
   });

   const interval = setInterval(function() {
       servo.to(180, 500);
       setTimeout(function () {
           servo.to(120, 100);
       }, 500)
   }, 1000);

   setTimeout(function () {
       clearInterval(interval);
       servo.center();
   }, 10000)

});