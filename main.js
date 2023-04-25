var status ="";
var input = "";
var objects = [];
console.log("status, input and objects have been defined.");
function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    console.log("Canvas and video set up.")
}
function search(){
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= " Status Report : Detecting object(s) . . .";
    document.getElementById("status").style.cursor = "progress";
    input = document.getElementById("input").value;
    console.log("input :" +input);
}
function modelLoaded() {
    console.log("Model has been loaded! 🎉");
    status = true;
    document.getElementById("status").style.cursor = "pointer";
}
function draw(){
    image(video,0 ,0 ,600, 400);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (let i = 0; i < objects.length; i++ ){
            if (objects[i].length == input) {
                video.stop();
                objectDetector.detect(gotResults);
                console.log("video stopped cocossd model excution stopped");
                document.getElementById("status").innerHTML = "Satus Report : Object detected. '" + input + "' found!";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input + " found !");
                synth.speak(utterThis);
            }else{
                document.getElementById("status").innerHTML = "Status Report : '" + input +"' not found.";
            }
            percentage = floor(object[i].confidence * 100);
            fill("palevoiletred");
            stroke("black");
            text(objects[i].label + " " + objects[i].confidence + "%", objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);            
        }
    }
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}