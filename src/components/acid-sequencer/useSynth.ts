import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Step } from "./types";

export const useSynth = (
  sequence: Step[],
  tempo: number,
  onStepChange: (step: number) => void
) => {
  // Use refs to persist audio nodes between renders
  const synthRef = useRef<Tone.MonoSynth | null>(null);
  const loopRef = useRef<Tone.Sequence | null>(null);

  // Initialize synth only once
  useEffect(() => {
    synthRef.current = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 },
    }).toDestination();

    // Cleanup function
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (loopRef.current) {
        loopRef.current.dispose();
      }
      // Stop transport when component unmounts
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const updateSynthParams = useCallback(
    (cutoff: number, resonance: number, decay: number) => {
      if (synthRef.current) {
        synthRef.current.set({
          envelope: {
            decay: decay,
          },
          filterEnvelope: {
            baseFrequency: cutoff,
            decay: decay,
          },
          filter: {
            Q: resonance,
          },
        });
      }
    },
    []
  );

  // Update sequence when sequence or tempo changes
  useEffect(() => {
    if (!synthRef.current) return;

    // Dispose of previous loop if it exists
    if (loopRef.current) {
      loopRef.current.dispose();
    }

    // Create new loop
    loopRef.current = new Tone.Sequence(
      (time, step) => {
        if (sequence[step].active) {
          synthRef.current?.triggerAttackRelease(sequence[step].note, "16n", time);
        }
        onStepChange(step);
      },
      [...Array(16).keys()],
      "16n"
    );

    Tone.Transport.bpm.value = tempo;
    loopRef.current.start(0);

    return () => {
      if (loopRef.current) {
        loopRef.current.dispose();
      }
    };
  }, [sequence, tempo, onStepChange]);

  return { updateSynthParams };
};