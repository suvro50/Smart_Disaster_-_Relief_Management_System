import { useEffect } from "react";

export default function SoundAlert({ enabled }) {
  useEffect(() => {
    if (enabled) {
      // Reserved for integrating alert sound files.
    }
  }, [enabled]);

  return null;
}
