import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface SynthControlsProps {
  onParamsChange: (cutoff: number, resonance: number, decay: number) => void;
}

const SynthControls = ({ onParamsChange }: SynthControlsProps) => {
  const [cutoff, setCutoff] = useState(2000);
  const [resonance, setResonance] = useState(1);
  const [decay, setDecay] = useState(0.1);

  useEffect(() => {
    onParamsChange(cutoff, resonance, decay);
  }, [cutoff, resonance, decay, onParamsChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-acid-green font-mono mb-2">
          Cutoff: {Math.round(cutoff)} Hz
        </label>
        <Slider
          value={[cutoff]}
          onValueChange={(value) => setCutoff(value[0])}
          min={20}
          max={20000}
          step={1}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-acid-green font-mono mb-2">
          Resonance: {resonance.toFixed(1)}
        </label>
        <Slider
          value={[resonance]}
          onValueChange={(value) => setResonance(value[0])}
          min={0.1}
          max={8}
          step={0.1}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-acid-green font-mono mb-2">
          Decay: {decay.toFixed(2)}s
        </label>
        <Slider
          value={[decay]}
          onValueChange={(value) => setDecay(value[0])}
          min={0.01}
          max={1}
          step={0.01}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SynthControls;