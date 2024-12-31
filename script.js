canvas = document.getElementById("mainCanvas");
canvas.width =  document.body.clientWidth;
canvas.height = document.body.clientHeight;
context = canvas.getContext("2d");
let camx = document.body.clientWidth/2, camy = document.body.clientHeight/2; // camera coordinates
let camzoom = 1; // camera zoom
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
window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) camzoom *= .8;
    if (e.deltaY < 0) camzoom *= 1.25;
})

// physical objects and immovable objects
let physicalObjects = [], immovableObjects = [];

// hardcoded objects
physicalObjects.push(new PhysicalObject(0, 0, 100, 100, 0, "rectangle", 2000, true, "density"));
physicalObjects.push(new PhysicalObject(200, -200, 200, 100, 0, "ellipse", 1000, true, "blue"));
physicalObjects.push(new PhysicalObject(400, 0, 100, 100, Math.PI/4, "rectangle", 1000 ,true , "green"));

// ground
immovableObjects.push(new ImmovableObject(0,-500,1000,100,"grey"));

setInterval(() => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    dx = mx-px, dy = my-py;
    px = mx; py = my;
    context.clearRect(0,0,canvas.width, canvas.height);

    // camera movement
    if (mpressed){
        camx += dx / camzoom;
        camy += dy / camzoom;
    }

    context.translate(canvas.width/2,canvas.height/2);
    context.scale(camzoom, camzoom);
    context.translate(-canvas.width/2,-canvas.height/2);
    context.translate(camx,camy);


    // object rendering
    // e.g.: \/ \/ \/
    immovableObjects.forEach(immovableObject => {
        context.fillStyle = immovableObject.color;
        context.fillRect(immovableObject.x-immovableObject.width/2, -(immovableObject.y-immovableObject.height/2), immovableObject.width, immovableObject.height);
    });
    physicalObjects.forEach(physicalObject => {
        // color
        if (physicalObject.color == "density"){
            let density = physicalObject.density;
            let color = 128 - density*.0128;
            color = Math.max(0, Math.min(255, color));
            context.fillStyle = `rgb(${color},${color},${color})`;
        } else{
            context.fillStyle = physicalObject.color;
        }

        // rendering
        if (physicalObject.shape == "rectangle"){
            context.translate(physicalObject.x, -physicalObject.y);
            context.rotate(physicalObject.rotation);
            context.fillRect(-physicalObject.width/2, -physicalObject.height/2, physicalObject.width, physicalObject.height);
            context.rotate(-physicalObject.rotation);
            context.translate(-physicalObject.x, physicalObject.y);
        } else if (physicalObject.shape == "ellipse"){
            context.translate(physicalObject.x, -physicalObject.y);
            context.rotate(physicalObject.rotation);
            context.scale(physicalObject.width/2, physicalObject.height/2);
            context.beginPath();
            context.arc(0, 0, 1, 0, 2*Math.PI);
            context.fill();
            context.scale(2/physicalObject.width, 2/physicalObject.height);
            context.rotate(-physicalObject.rotation);
            context.translate(-physicalObject.x, physicalObject.y);
        }

        // debug: if physicalObjects[0] collides with physicalObjects[1] draw blue square, else draw red square
        if (physicalObjects[0].CheckCollisionWithPhysicalObject(physicalObjects[1])){
            context.fillStyle = "blue";
        } else{
            context.fillStyle = "red";
        }
        context.fillRect(-100, -100,50,50);

        
    });
    // context.fillStyle = "red";
    // context.fillRect(-1-camx+canvas.width/2,-1-camy+canvas.height/2,2,2);
    //context.fillRect(-20, -20,40,40);

}, 1000/60);