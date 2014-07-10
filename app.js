(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation is supported");
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
}

if (window.DeviceMotionEvent) {
    console.log("DeviceMotion is supported");
    window.addEventListener('devicemotion', deviceMotionHandler, false);
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');


var audioctx = new webkitAudioContext();//webkit browsers only
var osc = audioctx.createOscillator();
var compressor = audioctx.createDynamicsCompressor();
var reverb = audioctx.createConvolver();
var volume = audioctx.createGainNode();
osc.type = 0; // sine wave
osc.frequency.value = 320;
osc.connect(compressor);
compressor.connect(reverb);
reverb.connect(volume);
volume.connect(audioctx.destination);


var playing = false;


canvas.addEventListener('click', tapHandler, false);


function deviceOrientationHandler(e) {

    // compute x, y;
    ctx.clearRect(0 , 0 , canvas.width , canvas.height );

    var x = map(e.gamma, -90, 90, 0, canvas.width);
    var y = map(e.beta, -90, 90, canvas.height, 0);

    var frex = map(e.beta, -90, 90, 20, 600);

    osc.frequency.value = frex;

    circle(canvas.width/2, y, 10);

}


function deviceMotionHandler(eventData) {
    // console.log('motion!', eventData);
}


function circle(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function map(val, minIn, maxIn, minOut, maxOut) {
    return minOut + (maxOut - minOut) * (val - minIn) / (maxIn - minIn);
}


function tapHandler() {
    if (!playing) {
        console.log('playing!')
        osc = audioctx.createOscillator();
        osc.type = 0; // sine wave
        osc.frequency.value = 320;
        osc.connect(compressor);

        osc.noteOn(0);

        playing = true;
    } else {
        osc.noteOff(0);
        playing = false;
    }
}
},{}]},{},[1])