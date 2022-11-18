import React, {useMemo} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import DrawCanvas from '../components/DrawCanvas';
import {useDrawProvider} from '../hooks/useDrawProvider';

const createStyle = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width,
      height,
    },
  });

function DrawingScreen() {
  const {width, height} = useWindowDimensions();
  const styles = useMemo(() => createStyle(width, height), [width, height]);

  const DrawProvider = useDrawProvider();

  return (
    <SafeAreaView style={styles.container}>
      <DrawProvider>
        <DrawCanvas />
      </DrawProvider>
    </SafeAreaView>
  );
}

export default DrawingScreen;
