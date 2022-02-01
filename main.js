video="";
objects=[];
status="";
function preload(){
    video=createVideo('video.mp4');
}

function setup(){
    canvas=createCanvas(640,450);
    canvas.center();
video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting object";
}
function modelLoaded(){
    console.log("cocossd model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error ,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,640,480);
    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:object detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+objects.length;
            fill("#b2e312");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x,objects[i].y+15);
            noFill();
            stroke("#b2e312");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }

}