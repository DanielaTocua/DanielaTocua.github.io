import { networkDistance, networkDistanceSquared } from "./Constants";

export class Particle {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;

	constructor(ctx: CanvasRenderingContext2D) {
		this.x = Math.random() * ctx.canvas.width;
		this.y = Math.random() * ctx.canvas.height;
		this.size = Math.random() + 1; // Particle size
		this.speedX = (Math.random() - 0.5) * 2;
		this.speedY = (Math.random() - 0.5) * 2;
	}

	update(ctx: CanvasRenderingContext2D): void {
		this.x += this.speedX;
		this.y += this.speedY;

		// Bounce off edges
		if (this.x <= 0 || this.x >= ctx.canvas.width) this.speedX *= -1;
		if (this.y <= 0 || this.y >= ctx.canvas.height) this.speedY *= -1;
	}

	calculateDistanceToCursor(cursorX: number, cursorY: number): number {
		const dx = this.x - cursorX;	
		const dy = this.y - cursorY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	draw(ctx: CanvasRenderingContext2D, opacity: number): void {
		ctx.fillStyle = `rgba(216, 149, 248, ${opacity})`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}


	drawLines(ctx: CanvasRenderingContext2D, particles: Particle[], distanceToCursor:number): void {
		particles.forEach((particle) => {

			const dx = this.x - particle.x;
			const dy = this.y - particle.y;
			const distanceSquared = dx * dx + dy * dy;
			if (distanceSquared < networkDistanceSquared) {
				ctx.strokeStyle = `rgba(216, 149, 248, ${1 - distanceToCursor / networkDistance})`;
				ctx.lineWidth = 0.5;
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(particle.x, particle.y);
				ctx.stroke();
			}
		});
	}

}
