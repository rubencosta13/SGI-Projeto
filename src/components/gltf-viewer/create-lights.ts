import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Scene,
  Color,
} from "three";

const COLORS = {
  WHITE: 0xffffff,
  LIGHT_GREY: 0xf0f0f0,
  GREY: 0xcccccc,
  DARK_GREY: 0x888888,
  VERY_DARK_GREY: 0x222222,
  BLACK: 0x111111,
  HEMI_GROUND_LIGHT: 0x444444,
};

type LightMode = "light" | "dark";

export function createLights(scene: Scene) {
  const ambient = new AmbientLight(COLORS.WHITE, 0.4);

  const hemi = new HemisphereLight(COLORS.WHITE, COLORS.HEMI_GROUND_LIGHT, 0.6);
  hemi.position.set(0, 20, 0);

  const dir = new DirectionalLight(COLORS.WHITE, 1);
  dir.position.set(5, 10, 5);
  dir.castShadow = true;

  scene.add(ambient, hemi, dir);

  function setMode(mode: LightMode) {
    if (mode === "light") {
      ambient.intensity = 0.4;
      hemi.intensity = 0.6;
      dir.intensity = 1.0;

      dir.color = new Color(COLORS.WHITE);
      hemi.color = new Color(COLORS.WHITE);
      hemi.groundColor = new Color(COLORS.HEMI_GROUND_LIGHT);
      scene.background = new Color(COLORS.LIGHT_GREY);
    } else {
      ambient.intensity = 0.25;
      hemi.intensity = 0.35;
      dir.intensity = 0.6;

      dir.color = new Color(COLORS.GREY);
      hemi.color = new Color(COLORS.DARK_GREY);
      hemi.groundColor = new Color(COLORS.VERY_DARK_GREY);
      scene.background = new Color(COLORS.BLACK);
    }
  }

  return { ambient, hemi, dir, setMode };
}
