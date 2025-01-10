import { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";
import SequencerGrid from "./SequencerGrid";
import SynthControls from "./SynthControls";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step {
  active: boolean;
  note: string;
}

const NOTES = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

const AcidSequencer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [currentNote, setCurrentNote] = useState("C3");

  // Initialize synth and sequence
  const synth = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { type: "lowpass" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.1 },
  }).toDestination();

  const [sequence, setSequence] = useState<Step[]>(
    Array(16).fill({ active: false, note: "C3" })
  );

  const toggleStep = (step: number) => {
    setSequence((prev) => {
      const newSequence = [...prev];
      newSequence[step] = {
        active: !newSequence[step].active,
        note: currentNote,
      };
      return newSequence;
    });
  };

  const randomizePattern = () => {
    setSequence(
      Array(16)
        .fill(null)
        .map(() => ({
          active: Math.random() > 0.7,
          note: NOTES[Math.floor(Math.random() * NOTES.length)],
        }))
    );
    toast({
      title: "Pattern Randomized!",
      description: "New acid pattern generated with random notes.",
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
        if (sequence[step].active) {
          synth.triggerAttackRelease(sequence[step].note, "16n", time);
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

      <div className="mb-6">
        <label className="block text-acid-green font-mono mb-2">Note</label>
        <Select value={currentNote} onValueChange={setCurrentNote}>
          <SelectTrigger className="w-32 bg-black/50 border-acid-green/30 text-acid-green">
            <SelectValue placeholder="Select note" />
          </SelectTrigger>
          <SelectContent className="bg-black border-acid-green/30">
            {NOTES.map((note) => (
              <SelectItem
                key={note}
                value={note}
                className="text-acid-green hover:bg-acid-green/20"
              >
                {note}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SequencerGrid
        sequence={sequence.map((s) => s.active)}
        currentStep={currentStep}
        onToggleStep={toggleStep}
        notes={sequence.map((s) => s.note)}
      />

      <SynthControls onParamsChange={updateSynthParams} />
    </div>
  );
};

export default AcidSequencer;