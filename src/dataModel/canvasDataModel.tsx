class Line implements Shape{
    x1 : number
    y1 : number 
    x2 : number
    y2 : number 

    constructor(x1 :number,y1 :number,x2 : number,y2 : number){
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;
    }
   
    moveEndPoint (x :number ,y : number) : Shape  {
        return new Line(this.x1,this.y1,x,y)
    }

    draw(ctx : CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}


class Circle implements Shape{
    centerX : number
    centerY : number 
    radius : number

    constructor(x1 :number,y1 :number,x2 : number,y2 : number){
        this.centerX = x1;
        this.centerY = y1;
        this.radius = Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    }
   
    moveEndPoint (x :number ,y : number) : Shape  {
        return new Circle(this.centerX,this.centerY,x,y)
    }

    draw(ctx : CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI)
        ctx.stroke();
    }
}


interface Position{
    x : number
    y : number
}

interface Shape {
    moveEndPoint : (x : number,y : number) => Shape
    draw : (ctx : CanvasRenderingContext2D) => void
}


export  { Line , Circle } 
export type { Position, Shape}