canvas = document.getElementById("mainCanvas");
canvas.width =  document.body.clientWidth;
canvas.height = document.body.clientHeight;
context = canvas.getContext("2d");
let camx = document.body.clientWidth/2, camy = document.body.clientHeight/2;
let mx = 0, my = 0, px = 0, py = 0;
let dx = mx-px, dy = my-py;
let mpressed = false;

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



setInterval(() => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    dx = mx-px, dy = my-py;
    px = mx; py = my;
    context.clearRect(0,0,canvas.width, canvas.height);
    if (mpressed){
        camx += dx;
        camy += dy;
    }
    context.translate(camx,camy);
    context.fillRect(-20, -20,40,40);
    context.fillRect(-120, -20,40,40);
    context.fillRect(80, 80,40,40);
    
}, 1000/60);