import { CanvasParticles } from "./animations/particles/CanvasParticles";

document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	new CanvasParticles(canvas);
});
