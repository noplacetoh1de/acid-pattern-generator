type Scale = {
  name: string;
  notes: string[];
};

export const SCALES: { [key: string]: Scale } = {
  "Chromatic": {
    name: "Chromatic",
    notes: ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4"],
  },
  "Major": {
    name: "Major",
    notes: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  },
  "Minor": {
    name: "Minor",
    notes: ["C3", "D3", "Eb3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Pentatonic": {
    name: "Pentatonic",
    notes: ["C3", "D3", "E3", "G3", "A3", "C4"],
  },
  "Blues": {
    name: "Blues",
    notes: ["C3", "Eb3", "F3", "F#3", "G3", "Bb3", "C4"],
  }
};