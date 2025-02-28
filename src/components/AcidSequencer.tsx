import { useState } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import SynthControls from "./SynthControls";
import { useToast } from "@/components/ui/use-toast";
import TransportControls from "./acid-sequencer/TransportControls";
import { useSynth } from "./acid-sequencer/useSynth";
import { Step } from "./acid-sequencer/types";
import { SCALES } from "./acid-sequencer/scales";
import PatternControls from "./acid-sequencer/PatternControls";
import KickControls from "./acid-sequencer/KickControls";

const AcidSequencer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [currentScale, setCurrentScale] = useState("Phrygian");
  const [currentNote, setCurrentNote] = useState(SCALES[currentScale].notes[0]);
  const [kickEnabled, setKickEnabled] = useState(false);
  const [kickGain, setKickGain] = useState(2);
  const [sequence, setSequence] = useState<Step[]>(
    Array(16).fill({ active: false, note: SCALES[currentScale].notes[0] })
  );

  const { updateSynthParams } = useSynth(sequence, tempo, kickEnabled, kickGain, (step) => {
    setCurrentStep(step);
  });

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
      description: "(-: Your acid pattern has been exported as a MIDI file :-)",
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
    const scaleNotes = SCALES[currentScale].notes;
    setSequence(
      Array(16)
        .fill(null)
        .map(() => ({
          active: Math.random() > 0.7,
          note: scaleNotes[Math.floor(Math.random() * scaleNotes.length)],
        }))
    );
  };

  const handleScaleChange = (newScale: string) => {
    setCurrentScale(newScale);
    const newNotes = SCALES[newScale].notes;
    setCurrentNote(newNotes[0]);
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

      <KickControls
        kickEnabled={kickEnabled}
        kickGain={kickGain}
        onKickToggle={setKickEnabled}
        onKickGainChange={setKickGain}
      />

      <PatternControls
        sequence={sequence}
        currentStep={currentStep}
        currentScale={currentScale}
        currentNote={currentNote}
        onScaleChange={handleScaleChange}
        onNoteChange={setCurrentNote}
        onToggleStep={toggleStep}
      />

      <SynthControls onParamsChange={updateSynthParams} />
    </div>
  );
};

export default AcidSequencer;