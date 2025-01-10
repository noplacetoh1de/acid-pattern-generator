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
  },
  "Dorian": {
    name: "Dorian",
    notes: ["C3", "D3", "Eb3", "F3", "G3", "A3", "Bb3", "C4"],
  },
  "Mixolydian": {
    name: "Mixolydian",
    notes: ["C3", "D3", "E3", "F3", "G3", "A3", "Bb3", "C4"],
  },
  "Lydian": {
    name: "Lydian",
    notes: ["C3", "D3", "E3", "F#3", "G3", "A3", "B3", "C4"],
  },
  "Phrygian": {
    name: "Phrygian",
    notes: ["C3", "Db3", "Eb3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Harmonic Minor": {
    name: "Harmonic Minor",
    notes: ["C3", "D3", "Eb3", "F3", "G3", "Ab3", "B3", "C4"],
  },
  "Melodic Minor": {
    name: "Melodic Minor",
    notes: ["C3", "D3", "Eb3", "F3", "G3", "A3", "B3", "C4"],
  },
  "Locrian": {
    name: "Locrian",
    notes: ["C3", "Db3", "Eb3", "F3", "Gb3", "Ab3", "Bb3", "C4"],
  },
  "Phrygian Dominant": {
    name: "Phrygian Dominant",
    notes: ["C3", "Db3", "E3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Pelog": {
    name: "Pelog",
    notes: ["C3", "Db3", "Eb3", "G3", "Ab3", "C4"],
  }
};