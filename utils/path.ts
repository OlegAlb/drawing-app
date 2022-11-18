import {SkColor, Skia} from '@shopify/react-native-skia';
import {DrawingElement} from './types';

export const createPath = (
  x: number,
  y: number,
  color: SkColor,
  size: number,
): DrawingElement => {
  const path = Skia.Path.Make();
  path.moveTo(x, y);
  return {
    path,
    color,
    size,
  };
};
