import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface SynthControlsProps {
  onParamsChange: (
    cutoff: number,
    resonance: number,
    decay: number,
    release: number,
    delayTime: number,
    delayFeedback: number,
    reverbDecay: number,
    reverbMix: number
  ) => void;
}

const SynthControls = ({ onParamsChange }: SynthControlsProps) => {
  const [cutoff, setCutoff] = useState(2000);
  const [resonance, setResonance] = useState(1);
  const [decay, setDecay] = useState(0.1);
  const [release, setRelease] = useState(0.1);
  const [delayTime, setDelayTime] = useState(0.3);
  const [delayFeedback, setDelayFeedback] = useState(0.3);
  const [reverbDecay, setReverbDecay] = useState(1.5);
  const [reverbMix, setReverbMix] = useState(0.3);

  useEffect(() => {
    onParamsChange(
      cutoff,
      resonance,
      decay,
      release,
      delayTime,
      delayFeedback,
      reverbDecay,
      reverbMix
    );
  }, [
    cutoff,
    resonance,
    decay,
    release,
    delayTime,
    delayFeedback,
    reverbDecay,
    reverbMix,
    onParamsChange,
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-acid-green font-mono mb-2">
            Cutoff: {Math.round(cutoff)} Hz
          </label>
          <Slider
            value={[cutoff]}
            onValueChange={(value) => setCutoff(value[0])}
            min={20}
            max={6000}
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
        <div>
          <label className="block text-acid-green font-mono mb-2">
            Release: {release.toFixed(2)}s
          </label>
          <Slider
            value={[release]}
            onValueChange={(value) => setRelease(value[0])}
            min={0.01}
            max={2}
            step={0.01}
            className="w-full"
          />
        </div>
      </div>

      <div className="border-t border-acid-green/30 pt-6">
        <h3 className="text-acid-green font-mono mb-4">Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-acid-green font-mono mb-2">
              Delay Time: {delayTime.toFixed(2)}s
            </label>
            <Slider
              value={[delayTime]}
              onValueChange={(value) => setDelayTime(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-acid-green font-mono mb-2">
              Delay Feedback: {delayFeedback.toFixed(2)}
            </label>
            <Slider
              value={[delayFeedback]}
              onValueChange={(value) => setDelayFeedback(value[0])}
              min={0}
              max={0.9}
              step={0.01}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-acid-green font-mono mb-2">
              Reverb Decay: {reverbDecay.toFixed(1)}s
            </label>
            <Slider
              value={[reverbDecay]}
              onValueChange={(value) => setReverbDecay(value[0])}
              min={0.1}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-acid-green font-mono mb-2">
              Reverb Mix: {reverbMix.toFixed(2)}
            </label>
            <Slider
              value={[reverbMix]}
              onValueChange={(value) => setReverbMix(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthControls;