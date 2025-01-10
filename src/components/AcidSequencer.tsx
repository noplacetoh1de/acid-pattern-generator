import { useState } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import SequencerGrid from "./SequencerGrid";
import SynthControls from "./SynthControls";
import { useToast } from "@/components/ui/use-toast";
import TransportControls from "./acid-sequencer/TransportControls";
import NoteSelector from "./acid-sequencer/NoteSelector";
import { useSynth } from "./acid-sequencer/useSynth";
import { Step } from "./acid-sequencer/types";

const NOTES = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

const AcidSequencer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [currentNote, setCurrentNote] = useState("C3");
  const [sequence, setSequence] = useState<Step[]>(
    Array(16).fill({ active: false, note: "C3" })
  );

  const { updateSynthParams } = useSynth(sequence, tempo);

  const exportMidi = () => {
    const midi = new Midi();
    const track = midi.addTrack();

    sequence.forEach((step, index) => {
      if (step.active) {
        track.addNote({
          midi: Tone.Frequency(step.note).toMidi(),
          time: index * 0.25,
          duration: 0.25,
          velocity: 0.8,
        });
      }
    });

    const midiBlob = new Blob([midi.toArray()], { type: "audio/midi" });
    const url = URL.createObjectURL(midiBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "acid-pattern.mid";
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Pattern Exported!",
      description: "Your acid pattern has been exported as a MIDI file.",
    });
  };

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

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    Tone.Transport.bpm.value = newTempo;
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg shadow-lg border border-acid-green/30">
      <TransportControls
        isPlaying={isPlaying}
        tempo={tempo}
        onPlayStop={togglePlay}
        onRandomize={randomizePattern}
        onExportMidi={exportMidi}
        onTempoChange={handleTempoChange}
      />

      <NoteSelector
        currentNote={currentNote}
        onNoteChange={setCurrentNote}
        notes={NOTES}
      />

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