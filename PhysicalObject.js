class PhysicalObject {
    constructor(x, y, width=1, height=1, rotation=0, shape="rectangle", density=1000, hasGravity=true, color="density") {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.shape = shape;
        this.rotation = rotation;
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
        if (this.shape == "rectangle"){
            let vertices = [];

            let x1 = this.x + Math.SQRT2 * Math.cos(-this.rotation + Math.PI/4)*this.width/2;
            let y1 = this.y + Math.SQRT2 * Math.sin(-this.rotation + Math.PI/4)*this.height/2;
            let x2 = this.x + Math.SQRT2 * Math.cos(-this.rotation - Math.PI/4)*this.width/2;
            let y2 = this.y + Math.SQRT2 * Math.sin(-this.rotation - Math.PI/4)*this.height/2;
            let x3 = this.x + Math.SQRT2 * Math.cos(-this.rotation + 3*Math.PI/4)*this.width/2;
            let y3 = this.y + Math.SQRT2 * Math.sin(-this.rotation + 3*Math.PI/4)*this.height/2;
            let x4 = this.x + Math.SQRT2 * Math.cos(-this.rotation - 3*Math.PI/4)*this.width/2;
            let y4 = this.y + Math.SQRT2 * Math.sin(-this.rotation - 3*Math.PI/4)*this.height/2;
            vertices.push([x1,y1]);
            vertices.push([x2,y2]);
            vertices.push([x4,y4]);
            vertices.push([x3,y3]);

            return vertices;
        }
        return [];
    }

    CheckCollisions(){
        //later
    }

    CheckCollisionWithPhysicalObject(other){
        if (this.shape == "rectangle" && other.shape == "rectangle"){
            //ax+by+c<=0
            //a=y1-y2,b=x2-x1,c=x1*y2-x2*y1
            let vertices = this.GetVertices();
            let otherVertices = other.GetVertices();
            let isInside = true;
            for (let i=0; i<vertices.length; i++){
                let x0 = vertices[i][0], y0 = vertices[i][1];

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
        if (this.shape == "rectangle" && other.shape == "ellipse"){
            //a=y1-y2,b=x2-x1,c=x1*y2-x2*y1
            //ax+by+c<=0

            // x0, y0 - center
            // r1, r2 - radii
            // t - rotation
            // ((x-x0)*cos(t)+(y-y0)*sin(t))/r1)^2+((y-y0)*sin(t)-(x-x0)*cos(t))/r2)^2<=1

            let vertices = this.GetVertices();
            let x0 = other.x, y0 = other.y;
            let isInside = true;            
            for (let i = 0; i < vertices.length; i++){
                let x1 = vertices[i][0], y1 = vertices[i][1];
                x1 -= x0;   y1 -= y0;
                let theta = other.rotation, alpha = Math.atan2(y1,x1), d = Math.sqrt(x1*x1+y1*y1);
                x1 = d*Math.cos(alpha-theta);
                y1 = d*Math.sin(alpha-theta);
                x1 /= other.width/2;
                y1 /= other.height/2;
                vertices[i][0] = (x1<1e-10&&x1>-1e-10)? 0 : x1; vertices[i][1] = (y1<1e-10&&y1>-1e-10)? 0 : y1;
            }
            for (let i = 0; i < vertices.length; i++){
                // isInside = true;
                let x1 = vertices[i][0], y1 = vertices[i][1];
                let x2 = vertices[(i+1)%vertices.length][0], y2 = vertices[(i+1)%vertices.length][1];
                let a = y1-y2, b = x2-x1, c = x1*y2-x2*y1;

                if (c*c>a*a+b*b && c > 0){
                    return false;
                }
            }
            return true;
        }
    }

    CheckCollisionWithImmovableObject(other){
        //ax+by+c<=0
        //a=y1-y2,b=x2-x1,c=x1*y2-x2*y1
    }
}