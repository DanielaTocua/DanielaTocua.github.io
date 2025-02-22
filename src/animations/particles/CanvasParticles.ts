import { Particle } from "./Particle";
import { ExpandingWave } from "./ExpandingWave";
import { affectedByWaveDistance, networkDistance, visibilityDistance } from "./Constants";

export class CanvasParticles {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	particles: Particle[] = [];
	cursorParticle: Particle | null = null;
	numParticles: number; // Number of particles
	cursorX = 0;
	cursorY = 0;
	clicked = false;
    smallScreen = window.innerWidth < 600;
    wave: ExpandingWave | null = null;

	/** The constructor initializes the canvas and particles, and sets up the resize event listener. */
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		this.numParticles = this.calculateNumParticles();
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
		this.canvas.addEventListener("click", (event) => {
			this.clicked = true;
			this.wave = new ExpandingWave(event.clientX, event.clientY, 50, 2, this.ctx);

		});
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
		const targetFPS = 24;
		const interval = 1000 / targetFPS;
		let lastTime = 0;

		const loop = (currentTime: number) => {
			
			if (currentTime - lastTime >= interval) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas

				if (this.smallScreen) {
					this.particles.forEach((particle) => {
						particle.update(this.ctx);
						particle.draw(this.ctx, 0.8);
					});
					
				} else {
					this.cursorParticle!.draw(this.ctx, 1); 
					this.cursorParticle!.drawLines(this.ctx, this.particles, 0); 
					this.particles.forEach((particle) => this.animateParticle(particle));				
					if (this.wave) {
						this.wave.update();
						this.wave.draw();
					}
					this.clicked = false;
				}
				
				lastTime = currentTime; // Update the last render time
			}
			requestAnimationFrame(loop);
		};

		requestAnimationFrame(loop);
	}

	animateParticle(particle:Particle):void{
		{					
			particle.update(this.ctx);
			const distanceToCursor = particle.calculateDistanceToCursor(this.cursorX, this.cursorY); 
			if (this.clicked && distanceToCursor < affectedByWaveDistance) {
				//Send away from cursor
				const angle = Math.atan2(particle.y - this.cursorY,particle.x - this.cursorX);
				particle.speedX = Math.cos(angle) * 1.5;
				particle.speedY = Math.sin(angle) * 1.5;
			}
			particle.draw(this.ctx, Math.max(0, 1 - distanceToCursor / visibilityDistance));
			// Draw lines between particles
			if (distanceToCursor < networkDistance) {
				particle.drawLines(this.ctx, this.particles, distanceToCursor);
			}


		}
	}
}
