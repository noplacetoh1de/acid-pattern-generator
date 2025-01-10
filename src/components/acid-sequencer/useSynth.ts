import { useCallback, useEffect } from "react";
import * as Tone from "tone";
import { Step } from "./types";

export const useSynth = (
  sequence: Step[],
  tempo: number,
  onStepChange: (step: number) => void
) => {
  const synth = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { type: "lowpass" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 },
  }).toDestination();

  const updateSynthParams = useCallback(
    (cutoff: number, resonance: number, decay: number) => {
      synth.set({
        filterEnvelope: {
          baseFrequency: cutoff,
          decay,
        },
        filter: {
          Q: resonance,
        },
      });
    },
    [synth]
  );

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, step) => {
        if (sequence[step].active) {
          synth.triggerAttackRelease(sequence[step].note, "16n", time);
        }
        onStepChange(step);
      },
      [...Array(16).keys()],
      "16n"
    );

    Tone.Transport.bpm.value = tempo;
    loop.start(0);

    return () => {
      loop.dispose();
    };
  }, [sequence, tempo, synth, onStepChange]);

  return { synth, updateSynthParams };
};