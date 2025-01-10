import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Step } from "./types";

export const useSynth = (
  sequence: Step[],
  tempo: number,
  onStepChange: (step: number) => void
) => {
  const synthRef = useRef<Tone.MonoSynth | null>(null);
  const loopRef = useRef<Tone.Sequence | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: { 
        type: "lowpass",
        rolloff: -24 
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1
      },
      filterEnvelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
        baseFrequency: 2000,
        octaves: 4,
        exponent: 2
      }
    }).toDestination();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (loopRef.current) {
        loopRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const updateSynthParams = useCallback(
    (cutoff: number, resonance: number, decay: number) => {
      if (synthRef.current) {
        synthRef.current.set({
          envelope: {
            attack: 0.001,
            decay: decay,
            sustain: 0.3,
            release: 0.1
          },
          filterEnvelope: {
            attack: 0.001,
            decay: decay,
            sustain: 0.3,
            release: 0.1,
            baseFrequency: cutoff,
            octaves: 4
          },
          filter: {
            Q: resonance,
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    if (!synthRef.current) return;

    if (loopRef.current) {
      loopRef.current.dispose();
    }

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