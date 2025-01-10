import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface TransportControlsProps {
  isPlaying: boolean;
  tempo: number;
  onPlayStop: () => void;
  onRandomize: () => void;
  onExportMidi: () => void;
  onTempoChange: (value: number) => void;
}

const TransportControls = ({
  isPlaying,
  tempo,
  onPlayStop,
  onRandomize,
  onExportMidi,
  onTempoChange,
}: TransportControlsProps) => {
  return (
    <>
      <div className="flex gap-4 mb-6">
        <Button
          onClick={onPlayStop}
          className={`w-24 ${
            isPlaying
              ? "bg-acid-pink hover:bg-acid-pink/80"
              : "bg-acid-green hover:bg-acid-green/80"
          } text-black font-mono`}
        >
          {isPlaying ? "Stop" : "Play"}
        </Button>
        <Button
          onClick={onRandomize}
          className="bg-acid-green/20 hover:bg-acid-green/30 text-acid-green font-mono"
        >
          Randomize
        </Button>
        <Button
          onClick={onExportMidi}
          className="bg-acid-green/20 hover:bg-acid-green/30 text-acid-green font-mono"
        >
          Export MIDI
        </Button>
      </div>

      <div className="mb-6">
        <label className="block text-acid-green font-mono mb-2">
          Tempo: {tempo} BPM
        </label>
        <Slider
          value={[tempo]}
          onValueChange={(value) => onTempoChange(value[0])}
          max={200}
          min={60}
          step={1}
          className="w-full"
        />
      </div>
    </>
  );
};

export default TransportControls;