import { Particle } from "./particles";

export class CanvasParticles {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	particles: Particle[] = [];
	cursorParticle: Particle | null = null;
	numParticles = 200; // Number of particles
	maxDistance = 100; // Maximum distance for drawing lines
	cursorX = 0;
	cursorY = 0;
    clicked = false;

	/** The constructor initializes the canvas and particles, and sets up the resize event listener. */
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		this.init();
		this.animate();

		// Listen for mouse movement
		this.canvas.addEventListener("mousemove", (event) => {
			this.cursorX = event.clientX;
			this.cursorY = event.clientY;
			if (this.cursorParticle) {
				this.cursorParticle.x = this.cursorX;
				this.cursorParticle.y = this.cursorY;
			}
		});

        // Listen for mouse click
        this.canvas.addEventListener("click", () => {
            this.clicked = true;
        });
	}

	/** Initializes the canvas and particles. */
	init(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.particles = [];

		// Create a particle for the cursor
		this.cursorParticle = new Particle(this.ctx);
		this.cursorParticle.speedX = 0;
		this.cursorParticle.speedY = 0;

		// Create particles
		for (let i = 0; i < this.numParticles; i++) {
			this.particles.push(new Particle(this.ctx));
		}
		this.particles.push(this.cursorParticle);

		window.addEventListener("resize", () => this.resizeCanvas());
	}

	/** Resizes the canvas and reinitializes the particles. */
	resizeCanvas(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.init();
	}

	/** Animates the particles. */
	animate(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.particles.forEach((particle) => {
			particle.update(this.ctx);
			particle.draw(this.ctx);            
		});

		this.drawLines();
        this.clicked = false;
		setTimeout(() => {
			requestAnimationFrame(() => this.animate());
		}, 1000 / 18);
	}

	/** Draws lines between nearby particles. */
	drawLines(): void {
		for (let i = 0; i < this.particles.length; i++) {
			const dxCursor = this.particles[i].x - this.cursorX;
			const dyCursor = this.particles[i].y - this.cursorY;
			const distanceToCursor = Math.sqrt(
				dxCursor * dxCursor + dyCursor * dyCursor,
			);
            if (this.clicked && distanceToCursor < this.maxDistance) {
                const angle = Math.atan2(dyCursor, dxCursor);
                this.particles[i].speedX = Math.cos(angle) * 1.5;
                this.particles[i].speedY = Math.sin(angle) * 1.5;
            }
			// If the particle is close to the cursor, draw a line
			if (distanceToCursor < this.maxDistance) {
				for (let j = i + 1; j < this.particles.length; j++) {
					const dx = this.particles[i].x - this.particles[j].x;
					const dy = this.particles[i].y - this.particles[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < this.maxDistance) {
						let opacity = Math.min(1, 1 - distanceToCursor / this.maxDistance);

						opacity = Math.min(
							1,
							opacity +
								(this.maxDistance - distanceToCursor) / this.maxDistance,
						);

						this.ctx.strokeStyle = `rgba(239, 167, 239, ${opacity})`;
						this.ctx.lineWidth = 0.5;
						this.ctx.beginPath();
						this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
						this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
						this.ctx.stroke();
					}
				}
			}
		}
	}
}
