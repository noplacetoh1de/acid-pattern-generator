type Scale = {
  name: string;
  notes: string[];
};

export const SCALES: { [key: string]: Scale } = {
  "Chromatic": {
    name: "Chromatic",
    notes: ["C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4"],
  },
  "Major": {
    name: "Major",
    notes: ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  },
  "Minor": {
    name: "Minor",
    notes: ["C2", "D2", "Eb2", "F2", "G2", "Ab2", "Bb2", "C3", "D3", "Eb3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Pentatonic": {
    name: "Pentatonic",
    notes: ["C2", "D2", "E2", "G2", "A2", "C3", "D3", "E3", "G3", "A3", "C4"],
  },
  "Blues": {
    name: "Blues",
    notes: ["C2", "Eb2", "F2", "F#2", "G2", "Bb2", "C3", "Eb3", "F3", "F#3", "G3", "Bb3", "C4"],
  },
  "Dorian": {
    name: "Dorian",
    notes: ["C2", "D2", "Eb2", "F2", "G2", "A2", "Bb2", "C3", "D3", "Eb3", "F3", "G3", "A3", "Bb3", "C4"],
  },
  "Mixolydian": {
    name: "Mixolydian",
    notes: ["C2", "D2", "E2", "F2", "G2", "A2", "Bb2", "C3", "D3", "E3", "F3", "G3", "A3", "Bb3", "C4"],
  },
  "Lydian": {
    name: "Lydian",
    notes: ["C2", "D2", "E2", "F#2", "G2", "A2", "B2", "C3", "D3", "E3", "F#3", "G3", "A3", "B3", "C4"],
  },
  "Phrygian": {
    name: "Phrygian",
    notes: ["C2", "Db2", "Eb2", "F2", "G2", "Ab2", "Bb2", "C3", "Db3", "Eb3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Harmonic Minor": {
    name: "Harmonic Minor",
    notes: ["C2", "D2", "Eb2", "F2", "G2", "Ab2", "B2", "C3", "D3", "Eb3", "F3", "G3", "Ab3", "B3", "C4"],
  },
  "Melodic Minor": {
    name: "Melodic Minor",
    notes: ["C2", "D2", "Eb2", "F2", "G2", "A2", "B2", "C3", "D3", "Eb3", "F3", "G3", "A3", "B3", "C4"],
  },
  "Locrian": {
    name: "Locrian",
    notes: ["C2", "Db2", "Eb2", "F2", "Gb2", "Ab2", "Bb2", "C3", "Db3", "Eb3", "F3", "Gb3", "Ab3", "Bb3", "C4"],
  },
  "Phrygian Dominant": {
    name: "Phrygian Dominant",
    notes: ["C2", "Db2", "E2", "F2", "G2", "Ab2", "Bb2", "C3", "Db3", "E3", "F3", "G3", "Ab3", "Bb3", "C4"],
  },
  "Pelog": {
    name: "Pelog",
    notes: ["C2", "Db2", "Eb2", "G2", "Ab2", "C3", "Db3", "Eb3", "G3", "Ab3", "C4"],
  }
};