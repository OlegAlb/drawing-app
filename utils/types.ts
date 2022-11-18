import {SkColor, SkPath} from '@shopify/react-native-skia';

export type DrawingElement = {
  path: SkPath;
  color: SkColor;
  size: number;
};

export type DrawState = {
  color: SkColor;
  size: number;
  elements: DrawingElement[];
  history: DrawingElement[];
};

export type DrawCommands = {
  setSize: (size: number) => void;
  setColor: (color: SkColor) => void;
  addElement: (element: DrawingElement) => void;
  redo: () => void;
  undo: () => void;
};

export type DrawContextType = {
  state: DrawState;
  commands: DrawCommands;
  addListener: (listener: (state: DrawState) => void) => () => void;
};
