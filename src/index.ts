import { CanvasParticles } from "./animations/particles/CanvasParticles";

document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("particle_background_canvas") as HTMLCanvasElement;
	new CanvasParticles(canvas);
});
