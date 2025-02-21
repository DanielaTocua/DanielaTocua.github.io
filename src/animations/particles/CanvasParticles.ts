import { Particle } from "./Particle";

export class CanvasParticles {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	particles: Particle[] = [];
	cursorParticle: Particle | null = null;
	numParticles: number; // Number of particles
	maxDistanceSquared = 100 * 100; // Maximum distance for drawing lines
	cursorX = 0;
	cursorY = 0;
	clicked = false;
    smallScreen = window.innerWidth < 600;

	/** The constructor initializes the canvas and particles, and sets up the resize event listener. */
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		this.numParticles = this.calculateNumParticles();
		this.init();
		this.animate();

		// Only add mouse event listeners for larger screens
		if (!this.smallScreen) {

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
	}

	/** Calculates the number of particles based on screen size. */
	calculateNumParticles(): number {
		const screenWidth = window.innerWidth;
		if (screenWidth > 1200) {
			return 200;
		} else if (screenWidth > 800) {
			return 150;
		} else if (screenWidth > 600) {
			return 100;
		} else {
			return 50;
		}
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
		this.particles.forEach((particle) => {
			particle.x = Math.random() * this.canvas.width;
			particle.y = Math.random() * this.canvas.height;
		});
	}

	/** Animates the particles. */
	animate(): void {
		const targetFPS = 20;
		const interval = 1000 / targetFPS;
		let lastTime = 0;

		const loop = (currentTime: number) => {
			if (currentTime - lastTime >= interval) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

				this.particles.forEach((particle) => {
					particle.update(this.ctx);
					particle.draw(this.ctx);
				});
                
                if (!this.smallScreen){
                    this.drawLines();
                }
				this.clicked = false;

				lastTime = currentTime; // Update the last render time
			}
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}

	/** Draws lines between nearby particles. */
	drawLines(): void {
		for (let i = 0; i < this.particles.length; i++) {
			const particleA = this.particles[i];
			const dxCursor = particleA.x - this.cursorX;
			const dyCursor = particleA.y - this.cursorY;
			const distanceToCursorSquared = dxCursor * dxCursor + dyCursor * dyCursor;

			if (this.clicked && distanceToCursorSquared < this.maxDistanceSquared) {
				const angle = Math.atan2(dyCursor, dxCursor);
				particleA.speedX = Math.cos(angle) * 1.5;
				particleA.speedY = Math.sin(angle) * 1.5;
			}

			if (distanceToCursorSquared < this.maxDistanceSquared) {
				for (let j = i + 1; j < this.particles.length; j++) {
					const particleB = this.particles[j];
					const dx = particleA.x - particleB.x;
					const dy = particleA.y - particleB.y;
					const distanceSquared = dx * dx + dy * dy;

					if (distanceSquared < this.maxDistanceSquared) {
						const opacity = 1 - distanceSquared / this.maxDistanceSquared;
						this.ctx.strokeStyle = `rgba(239, 167, 239, ${opacity})`;
						this.ctx.lineWidth = 0.5;
						this.ctx.beginPath();
						this.ctx.moveTo(particleA.x, particleA.y);
						this.ctx.lineTo(particleB.x, particleB.y);
						this.ctx.stroke();
					}
				}
			}
		}
	}
}
