import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCALES } from "./scales";

interface ScaleSelectorProps {
  currentScale: string;
  onScaleChange: (scale: string) => void;
}

const ScaleSelector = ({ currentScale, onScaleChange }: ScaleSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-acid-green font-mono mb-2">Scale</label>
      <Select value={currentScale} onValueChange={onScaleChange}>
        <SelectTrigger className="w-32 bg-black/50 border-acid-green/30 text-acid-green">
          <SelectValue placeholder="Select scale" />
        </SelectTrigger>
        <SelectContent className="bg-black border-acid-green/30 [&>div>button]:text-acid-green [&>button]:text-acid-green">
          {Object.keys(SCALES).map((scale) => (
            <SelectItem
              key={scale}
              value={scale}
              className="text-acid-green hover:bg-acid-green/20"
            >
              {scale}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ScaleSelector;