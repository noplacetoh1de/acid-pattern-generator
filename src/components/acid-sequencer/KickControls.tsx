import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface KickControlsProps {
  kickEnabled: boolean;
  kickGain: number;
  onKickToggle: (enabled: boolean) => void;
  onKickGainChange: (gain: number) => void;
}

const KickControls = ({
  kickEnabled,
  kickGain,
  onKickToggle,
  onKickGainChange,
}: KickControlsProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Switch
          id="kick-toggle"
          checked={kickEnabled}
          onCheckedChange={onKickToggle}
          className="data-[state=checked]:bg-acid-pink"
        />
        <Label htmlFor="kick-toggle" className="text-acid-green font-mono">
          Kick pattern
        </Label>
      </div>
      {kickEnabled && (
        <div className="flex items-center gap-2 ml-4">
          <Label htmlFor="kick-gain" className="text-acid-green font-mono min-w-20">
            Kick Gain: {kickGain.toFixed(1)}
          </Label>
          <Slider
            id="kick-gain"
            min={0}
            max={4}
            step={0.1}
            value={[kickGain]}
            onValueChange={(value) => onKickGainChange(value[0])}
            className="w-32"
          />
        </div>
      )}
    </div>
  );
};

export default KickControls;