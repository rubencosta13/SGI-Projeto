import { Camera, Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createDebugHUD(camera: Camera, controls?: OrbitControls) {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "12px";
  container.style.left = "12px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.zIndex = "1000";

  const el = document.createElement("div");
  el.style.padding = "8px 10px";
  el.style.background = "rgba(0,0,0,0.6)";
  el.style.color = "#0f0";
  el.style.fontFamily = "monospace";
  el.style.fontSize = "12px";
  el.style.whiteSpace = "pre";
  el.style.pointerEvents = "none";

  const button = document.createElement("button");
  button.textContent = "Log Camera Values";
  button.style.padding = "6px 12px";
  button.style.background = "rgba(0,255,0,0.2)";
  button.style.color = "#0f0";
  button.style.border = "1px solid #0f0";
  button.style.fontFamily = "monospace";
  button.style.fontSize = "12px";
  button.style.cursor = "pointer";
  button.style.pointerEvents = "auto";

  button.onmouseover = () => {
    button.style.background = "rgba(0,255,0,0.3)";
  };
  button.onmouseout = () => {
    button.style.background = "rgba(0,255,0,0.2)";
  };

  container.appendChild(el);
  container.appendChild(button);
  document.body.appendChild(container);

  const forward = new Vector3();

  function update() {
    camera.getWorldDirection(forward);

    el.textContent = `Camera position:
x: ${camera.position.x.toFixed(2)}
y: ${camera.position.y.toFixed(2)}
z: ${camera.position.z.toFixed(2)}

Facing direction:
x: ${forward.x.toFixed(2)}
y: ${forward.y.toFixed(2)}
z: ${forward.z.toFixed(2)}
${
  controls
    ? `
Target:
x: ${controls.target.x.toFixed(2)}
y: ${controls.target.y.toFixed(2)}
z: ${controls.target.z.toFixed(2)}`
    : ""
}`;
  }

  button.onclick = () => {
    camera.getWorldDirection(forward);

    const data = {
      camera: {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        },
        facing: {
          x: forward.x,
          y: forward.y,
          z: forward.z,
        },
      },
      ...(controls && {
        target: {
          x: controls.target.x,
          y: controls.target.y,
          z: controls.target.z,
        },
      }),
    };

    // console.log("Camera Debug Info:", data);
  };

  return {
    update,
    dispose() {
      document.body.removeChild(container);
    },
  };
}
