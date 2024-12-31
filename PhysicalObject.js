class PhysicalObject {
    constructor(x, y, width=1, height=1, r=0, color="density", hasGravity=true, density=1) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.r = r;
        this.hasGravity = hasGravity;
        this.density = density;
        this.mass = this.width*this.height*this.density;
    }

    Update(){
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        this.vy += this.ay;
    }

    GetVertices(){
        //x and y are the center of the object
        //r is the rotation of the object
        //returns the vertices of the object
        let vertices = [];

        let x1 = this.x + Math.sqrt(2) * Math.cos(-this.r + Math.PI/4)*this.width/2;
        let y1 = this.y + Math.sqrt(2) * Math.sin(-this.r + Math.PI/4)*this.height/2;
        let x2 = this.x + Math.sqrt(2) * Math.cos(-this.r - Math.PI/4)*this.width/2;
        let y2 = this.y + Math.sqrt(2) * Math.sin(-this.r - Math.PI/4)*this.height/2;
        let x3 = this.x + Math.sqrt(2) * Math.cos(-this.r + 3*Math.PI/4)*this.width/2;
        let y3 = this.y + Math.sqrt(2) * Math.sin(-this.r + 3*Math.PI/4)*this.height/2;
        let x4 = this.x + Math.sqrt(2) * Math.cos(-this.r - 3*Math.PI/4)*this.width/2;
        let y4 = this.y + Math.sqrt(2) * Math.sin(-this.r - 3*Math.PI/4)*this.height/2;
        vertices.push([x1,y1]);
        vertices.push([x2,y2]);
        vertices.push([x4,y4]);
        vertices.push([x3,y3]);

        return vertices;
    }

    CheckCollisions(){
        //later
    }

    CheckCollisionWithPhysicalObject(other){
        //ax+by+c>=0
        //a=y1-y2,b=x2-x1,c=x1*y2-x2*y1
        let vertices = this.GetVertices();
        let otherVertices = other.GetVertices();

        for (let i=0; i<vertices.length; i++){
            let x0 = vertices[i][0], y0 = vertices[i][1];
            let isInside = true;
            for (let j=0;j<otherVertices.length;j++){
                let x1 = otherVertices[j][0], y1 = otherVertices[j][1];
                let x2 = otherVertices[(j+1)%otherVertices.length][0], y2 = otherVertices[(j+1)%otherVertices.length][1];
                let a = y1-y2, b = x2-x1, c = x1*y2-x2*y1;
                if (a*x0+b*y0+c>0){
                    isInside = false;
                    break;
                }
            }
            if (isInside){
                return true;
            }
        }
        return false;
    }

    CheckCollisionWithImmovableObject(other){
        //ax+by+c>=0
        //a=y1-y2,b=x2-x1,c=x1*y2-x2*y1
    }
}