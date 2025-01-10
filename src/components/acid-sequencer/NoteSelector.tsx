import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NoteSelectorProps {
  currentNote: string;
  onNoteChange: (note: string) => void;
  notes: string[];
}

const NoteSelector = ({ currentNote, onNoteChange, notes }: NoteSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-acid-green font-mono mb-2">Note</label>
      <Select value={currentNote} onValueChange={onNoteChange}>
        <SelectTrigger className="w-32 bg-black/50 border-acid-green/30 text-acid-green">
          <SelectValue placeholder="Select note" />
        </SelectTrigger>
        <SelectContent className="bg-black border-acid-green/30">
          {notes.map((note) => (
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
  );
};

export default NoteSelector;