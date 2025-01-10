import AcidSequencer from "@/components/AcidSequencer";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-acid-dark p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <h1 className="text-acid-green text-4xl font-mono text-center animate-glow">
            Acid Pattern Generator
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-acid-green hover:text-acid-pink hover:bg-transparent"
              >
                <Info className="h-5 w-5" />
                <span className="sr-only">About Acid Pattern Generator</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-acid-dark border-acid-green/20 text-acid-green">
              <div className="space-y-2">
                <h3 className="font-mono text-lg font-semibold">About</h3>
                <p className="text-sm text-acid-green/80">
                  The Acid Pattern Generator is a web-based synthesizer and sequencer 
                  inspired by the iconic Roland TB-303. Create mesmerizing acid basslines 
                  by adjusting notes, patterns, and effects in real-time.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <AcidSequencer />
      </div>
      <Footer />
    </div>
  );
};

export default Index;