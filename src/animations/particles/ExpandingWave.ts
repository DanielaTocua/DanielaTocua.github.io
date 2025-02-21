export class ExpandingWave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    speed: number;
    ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, maxRadius: number, speed: number, ctx: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
        this.speed = speed;
        this.ctx = ctx;
    }

    update(): void {
        if (this.radius < this.maxRadius) {
            this.radius += this.speed;
        }
    }

    draw(): void {
        if (this.radius < this.maxRadius) {
            this.ctx.strokeStyle = `rgba(239, 167, 239, ${1 - this.radius / this.maxRadius})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }
}