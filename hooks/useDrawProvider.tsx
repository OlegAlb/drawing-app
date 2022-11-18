import {SkColor, Skia} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import {DrawContextType, DrawingElement, DrawState} from '../utils/types';

export const DrawContext = React.createContext<DrawContextType | undefined>(
  undefined,
);

const createDrawProviderValue = (): DrawContextType => {
  const state: DrawState = {
    size: 2,
    color: Skia.Color('#000'),
    elements: [],
    history: [],
  };

  const listeners = [] as ((state: DrawState) => void)[];
  const notifyListeners = (s: DrawState) => listeners.forEach(l => l(s));

  const commands = {
    setColor: (color: SkColor) => {
      state.color = color;
      notifyListeners(state);
    },
    setSize: (size: number) => {
      state.size = size;
      notifyListeners(state);
    },
    addElement: (element: DrawingElement) => {
      state.elements.push(element);
      notifyListeners(state);
    },
    undo: () => {
      const element = state.elements.pop();

      if (element) {
        state.history.push(element);
      }

      notifyListeners(state);
    },
    redo: () => {
      const element = state.history.pop();

      if (element) {
        state.elements.push(element);
      }

      notifyListeners(state);
    },
  };

  return {
    state,
    commands,
    addListener: (cb: (state: DrawState) => void) => {
      listeners.push(cb);
      return () => listeners.splice(listeners.indexOf(cb), 1);
    },
  };
};

export const useDrawProvider = () => {
  const uxContext = useMemo(() => createDrawProviderValue(), []);
  const retVal: React.FC = ({children}) => (
    <DrawContext.Provider value={uxContext}>{children}</DrawContext.Provider>
  );
  return retVal;
};
