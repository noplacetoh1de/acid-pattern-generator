import { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import SequencerGrid from "./SequencerGrid";
import SynthControls from "./SynthControls";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

const AcidSequencer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  // Initialize synth and sequence
  const synth = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { type: "lowpass" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 },
  }).toDestination();

  const [sequence, setSequence] = useState(Array(16).fill(false));

  const toggleStep = (step: number) => {
    setSequence((prev) => {
      const newSequence = [...prev];
      newSequence[step] = !newSequence[step];
      return newSequence;
    });
  };

  const randomizePattern = () => {
    setSequence(Array(16).fill(false).map(() => Math.random() > 0.7));
    toast({
      title: "Pattern Randomized!",
      description: "New acid pattern generated.",
    });
  };

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

  const togglePlay = () => {
    if (!isPlaying) {
      Tone.start();
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        if (sequence[step]) {
          synth.triggerAttackRelease("C3", "16n", time);
        }
      },
      [...Array(16).keys()],
      "16n"
    );

    Tone.Transport.bpm.value = tempo;
    loop.start(0);

    return () => {
      loop.dispose();
    };
  }, [sequence, tempo, synth]);

  return (
    <div className="bg-black/50 p-6 rounded-lg shadow-lg border border-acid-green/30">
      <div className="flex gap-4 mb-6">
        <Button
          onClick={togglePlay}
          className={`w-24 ${
            isPlaying
              ? "bg-acid-pink hover:bg-acid-pink/80"
              : "bg-acid-green hover:bg-acid-green/80"
          } text-black font-mono`}
        >
          {isPlaying ? "Stop" : "Play"}
        </Button>
        <Button
          onClick={randomizePattern}
          className="bg-acid-green/20 hover:bg-acid-green/30 text-acid-green font-mono"
        >
          Randomize
        </Button>
      </div>

      <div className="mb-6">
        <label className="block text-acid-green font-mono mb-2">
          Tempo: {tempo} BPM
        </label>
        <Slider
          value={[tempo]}
          onValueChange={(value) => {
            setTempo(value[0]);
            Tone.Transport.bpm.value = value[0];
          }}
          max={200}
          min={60}
          step={1}
          className="w-full"
        />
      </div>

      <SequencerGrid
        sequence={sequence}
        currentStep={currentStep}
        onToggleStep={toggleStep}
      />

      <SynthControls onParamsChange={updateSynthParams} />
    </div>
  );
};

export default AcidSequencer;