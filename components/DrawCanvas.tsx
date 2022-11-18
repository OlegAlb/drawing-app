import {
  Canvas,
  Fill,
  Path,
  SkPoint,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import {useDrawContext} from '../hooks/useDrawContext';
import {createPath} from '../utils/path';
import {DrawingElement} from '../utils/types';

function DrawCanvas() {
  const prevPointRef = useRef<SkPoint>();
  const drawContext = useDrawContext();
  const [elements, setElements] = useState(drawContext.state.elements);

  const touchHandler = useTouchHandler({
    onStart: ({x, y}) => {
      const {color, size} = drawContext.state;
      drawContext.commands.addElement(createPath(x, y, color, size));
      prevPointRef.current = {x, y};
    },
    onActive: ({x, y}) => {
      const element =
        drawContext.state.elements[drawContext.state.elements.length - 1];
      const xMid = (prevPointRef.current!.x + x) / 2;
      const yMid = (prevPointRef.current!.y + y) / 2;
      element.path.quadTo(
        prevPointRef.current!.x,
        prevPointRef.current!.y,
        xMid,
        yMid,
      );
      prevPointRef.current = {x, y};
    },
  });

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const unsubscribeDraw = drawContext.addListener(state => {
      setElements([...state.elements]);
    });
    return () => {
      unsubscribeDraw();
    };
  }, [drawContext]);

  const elementComponents = useMemo(
    () =>
      elements.map((element: DrawingElement, index) => {
        return (
          <Path
            key={index}
            path={element.path}
            color={element.color}
            style="stroke"
            strokeWidth={element.size}
            strokeCap="round"
          />
        );
      }),
    [elements],
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          drawContext.commands.undo();
        }}>
        <Text>undo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          drawContext.commands.redo();
        }}>
        <Text>redo</Text>
      </TouchableOpacity>
      <Canvas
        style={{
          width,
          height,
        }}
        onTouch={touchHandler}>
        {elementComponents}
      </Canvas>
    </>
  );
}

export default DrawCanvas;
