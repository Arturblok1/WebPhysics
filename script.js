canvas = document.getElementById("mainCanvas");
canvas.width =  document.body.clientWidth;
canvas.height = document.body.clientHeight;
context = canvas.getContext("2d");
let camx = document.body.clientWidth/2, camy = document.body.clientHeight/2; // camera coordinates
let mx = 0, my = 0, px = 0, py = 0; // mouse coordinates; previous coordinates
let dx = mx-px, dy = my-py;
let mpressed = false; // mouse pressed

window.addEventListener("mousemove", function (e) {
    mx = e.pageX;
    my = e.pageY;
})
window.addEventListener("mousedown", function (e) {
    if (e.button == 0) mpressed = true;
    
})
window.addEventListener("mouseup", function (e) {
    if (e.button == 0) mpressed = false;
})

// physical objects
let physicalObjects = [];
physicalObjects.push(new PhysicalObject(0,0,"red",100,100));
physicalObjects.push(new PhysicalObject(200,200,"blue",100,100));
physicalObjects.push(new PhysicalObject(400,-400,"green",100,100));

setInterval(() => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    dx = mx-px, dy = my-py;
    px = mx; py = my;
    context.clearRect(0,0,canvas.width, canvas.height);

    // camera movement
    if (mpressed){
        camx += dx;
        camy += dy;
    }
    context.translate(camx,camy);

    // object rendering
    // e.g.: \/ \/ \/
    physicalObjects.forEach(physicalObject => {
        context.fillStyle = physicalObject.color;
        context.fillRect(physicalObject.x-physicalObject.width/2, physicalObject.y-physicalObject.height/2, physicalObject.width, physicalObject.height);
    });
    //context.fillRect(-20, -20,40,40);
    
}, 1000/60);