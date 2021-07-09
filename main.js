alarm = "";
status = "";
objects = [];
function preload() {
alarm = loadSound("mixkit-facility-alarm-908.mp3");
}
function setup() {
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380, 380);
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
image(video, 0, 0, 380, 380);
if(status != "")
{
r =  random(255);
g =  random(255);
b =  random(255);      
objectDetector.detect(video, getResult);
for (i = 0; i < objects.length; i++) {
document.getElementById("status").innerHTML = "Status : Object Detected";
fill(r,g,b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke(r,g,b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == "person")
{
document.getElementById("baby_status").innerHTML = "Baby Found";
console.log("stop");
alarm.stop();
}
else
{
document.getElementById("baby_status").innerHTML = "Baby Not Found";
console.log("play"); 
alarm.play();
alarm.loop();
}
}
if(objects.length == 0)
{
document.getElementById("baby_status").innerHTML = "Baby Not Found";
console.log("play"); 
alarm.play();
alarm.loop();
}
}
}
function modelLoaded() {
console.log("Model Loaded!");
status = true;
}
function getResult(error, results) {
if(error) {
console.log(error);
}
console.log(results);
objects = results;
}