import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Step } from "./types";

export const useSynth = (
  sequence: Step[],
  tempo: number,
  kickEnabled: boolean,
  onStepChange: (step: number) => void
) => {
  const synthRef = useRef<Tone.MonoSynth | null>(null);
  const kickSynthRef = useRef<Tone.MembraneSynth | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const loopRef = useRef<Tone.Sequence | null>(null);

  useEffect(() => {
    delayRef.current = new Tone.FeedbackDelay({
      delayTime: 0.3,
      feedback: 0.3,
      wet: 0.3,
    }).toDestination();

    reverbRef.current = new Tone.Reverb({
      decay: 1.5,
      wet: 0.3,
    }).connect(delayRef.current);

    synthRef.current = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: {
        type: "lowpass",
        rolloff: -24,
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
      },
      filterEnvelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
        baseFrequency: 2000,
        octaves: 4,
        exponent: 2,
      },
    }).connect(reverbRef.current);

    kickSynthRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
      },
    }).toDestination();

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (kickSynthRef.current) {
        kickSynthRef.current.dispose();
      }
      if (delayRef.current) {
        delayRef.current.dispose();
      }
      if (reverbRef.current) {
        reverbRef.current.dispose();
      }
      if (loopRef.current) {
        loopRef.current.dispose();
      }
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const updateSynthParams = useCallback(
    (
      cutoff: number,
      resonance: number,
      decay: number,
      release: number,
      delayTime: number,
      delayFeedback: number,
      reverbDecay: number,
      reverbMix: number
    ) => {
      if (synthRef.current) {
        synthRef.current.set({
          envelope: {
            attack: 0.001,
            decay: decay,
            sustain: 0.3,
            release: release,
          },
          filterEnvelope: {
            attack: 0.001,
            decay: decay,
            sustain: 0.3,
            release: release,
            baseFrequency: cutoff,
            octaves: 4,
          },
          filter: {
            Q: resonance,
          },
        });
      }

      if (delayRef.current) {
        delayRef.current.set({
          delayTime: delayTime,
          feedback: delayFeedback,
        });
      }

      if (reverbRef.current) {
        reverbRef.current.set({
          decay: reverbDecay,
          wet: reverbMix,
        });
      }
    },
    []
  );

  useEffect(() => {
    if (!synthRef.current || !kickSynthRef.current) return;

    if (loopRef.current) {
      loopRef.current.dispose();
    }

    loopRef.current = new Tone.Sequence(
      (time, step) => {
        if (sequence[step].active) {
          synthRef.current?.triggerAttackRelease(sequence[step].note, "16n", time);
        }
        if (kickEnabled && step % 4 === 0) {
          kickSynthRef.current?.triggerAttackRelease("C1", "16n", time);
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
  }, [sequence, tempo, kickEnabled, onStepChange]);

  return { updateSynthParams };
};
