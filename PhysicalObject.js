class PhysicalObject {
    constructor(x, y, width=1, height=1, color="density", hasGravity=true, density=1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.hasGravity = hasGravity;
        this.density = density;
        this.mass = this.width*this.height*this.density;
    }
}