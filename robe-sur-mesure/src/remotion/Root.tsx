import { Composition } from "remotion";
import { PubRobe, DUREE_FRAMES, FPS } from "./Video";

/**
 * Composition publicitaire verticale.
 * - 1080×1920, 30 fps
 * - ~23 s (690 frames), dans la fourchette 20–25 s demandée
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PubRobe"
      component={PubRobe}
      durationInFrames={DUREE_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

