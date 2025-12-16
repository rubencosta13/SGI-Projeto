import {
  AnimationMixer,
  AnimationClip,
  Object3D,
  LoopOnce,
  AnimationAction,
} from "three";

type ActionState = {
  action: AnimationAction;
  status: "idle" | "playing" | "paused" | "finished";
  playingForward: boolean; // track forward/backward
};

export function createAnimationSystem(
  root: Object3D,
  animations: AnimationClip[]
) {
  const mixer = new AnimationMixer(root);
  const actions = new Map<string, ActionState>();

  animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.loop = LoopOnce;
    action.clampWhenFinished = true;
    action.enabled = true;

    actions.set(clip.name, {
      action,
      status: "idle",
      playingForward: true,
    });

    // Detect when animation finishes
    action.getMixer()?.addEventListener("finished", () => {
      const state = actions.get(clip.name);
      if (state) state.status = "finished";
    });
  });

  function toggle(name: string) {
    const state = actions.get(name);
    if (!state) return;

    const { action, status, playingForward } = state;

    if (status === "playing") {
      // Pause mid-animation
      action.paused = true;
      state.status = "paused";
      return;
    }

    if (status === "paused") {
      // Resume playing forward
      action.paused = false;
      state.status = "playing";
      return;
    }

    if (status === "finished") {
      // Play in reverse
      action.time = playingForward ? action.getClip().duration : 0;
      action.timeScale = playingForward ? -1 : 1;
      action.paused = false;
      action.play();
      state.status = "playing";
      state.playingForward = !playingForward;
      return;
    }

    // If never played
    action.reset();
    action.timeScale = 1;
    action.play();
    state.status = "playing";
    state.playingForward = true;
  }

  return {
    mixer,
    toggle,
    update(delta: number) {
      mixer.update(delta);
    },
  };
}
