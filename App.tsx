/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BluetoothScanner from './BluetoothScanner';

ThermalPrinterModule.defaultConfig = {
  ip: '192.168.100.246',
  port: 9100,
  autoCut: false,
  timeout: 30000,
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollRef = React.useRef(null)
  const [errorMessage, setErrorMessage] = React.useState('')

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleBluetoothPrint = async () => {
    try {
      setErrorMessage('')
      await ThermalPrinterModule.printBluetooth({
        payload: "[C]<qrcode size='20'>http://www.pavemint.com/</qrcode>",
        printerNbrCharactersPerLine: 38,
      });
      console.log('PRINT>>>')
    } catch (error) {
      setErrorMessage(error?.message)
    }
  };

  return (
    <SafeAreaView
      style={{
        ...backgroundStyle,
        justifyContent: 'center',
        flex: 1,
      }}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEnabled={false}
          contentContainerStyle={{ width: '200%' }}
          ref={scrollRef}
          pagingEnabled
        >
          <View style={{ flex: 1, justifyContent: 'center', width: Dimensions.get('screen').width }}>
            <TouchableOpacity
              onPress={handleBluetoothPrint}
              style={{
                backgroundColor: 'steelblue',
                paddingVertical: 12,
                paddingHorizontal: 36,
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 24, color: '#fff'}}>PRINT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (scrollRef?.current !== null) {
                  scrollRef.current.scrollToEnd()
                  setErrorMessage('')
                }
              }}
              style={{
                backgroundColor: 'steelblue',
                paddingVertical: 12,
                paddingHorizontal: 36,
                alignSelf: 'center',
                marginTop: 12
              }}>
              <Text style={{fontSize: 24, color: '#fff'}}>SCAN</Text>
            </TouchableOpacity>
            {errorMessage !== '' && (
              <View>
                <Text style={{ color: '#000', textAlign: 'center', marginTop: 12 }}>Error:</Text>
                <Text style={{ color: '#000', textAlign: 'center', marginTop: 12 }}>{errorMessage}</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: 'center', width: Dimensions.get('screen').width }}>
            <BluetoothScanner
              goBack={() => {
                if (scrollRef?.current !== null) {
                  scrollRef.current.scrollTo({ x: 0 })
                  setErrorMessage('')
                }
              }}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default App;
