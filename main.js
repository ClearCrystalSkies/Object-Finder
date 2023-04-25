var status ="";
var input = "";
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function search(){
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= " Status Report : Detecting object(s) . . .";
    document.getElementById("status").style.cursor = "progress";
    input = document.getElementById("input").value;
    console.log(input);
}
function modelLoaded() {
    console.log("Model has been loaded! 🎉");
    document.getElementById("status").style.cursor = "pointer";
    status = true;
}
function draw(){
    image(video,0 ,0 ,600, 400);
}