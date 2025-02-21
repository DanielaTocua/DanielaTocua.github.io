export class Particle {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;

	constructor(ctx: CanvasRenderingContext2D) {
		this.x = Math.random() * ctx.canvas.width;
		this.y = Math.random() * ctx.canvas.height;
		this.size = Math.random()  + 1; // Particle size
		this.speedX = (Math.random() - 0.5)*3;
		this.speedY = (Math.random() - 0.5)*3;
	}

	update(ctx:CanvasRenderingContext2D): void {
		this.x += this.speedX;
		this.y += this.speedY;

		// Bounce off edges
		if (this.x <= 0 || this.x >= ctx.canvas.width) this.speedX *= -1;
		if (this.y <= 0 || this.y >= ctx.canvas.height) this.speedY *= -1;
	}

	draw(ctx:CanvasRenderingContext2D): void {
		ctx.fillStyle = "rgb(216, 149, 248)";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}
