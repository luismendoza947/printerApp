import React from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import ThermalPrinterModule from 'react-native-thermal-printer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

ThermalPrinterModule.defaultConfig = {
  ip: '192.168.100.246',
  port: 9100,
  autoCut: false,
  timeout: 30000,
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleBluetoothPrint = async () => {
    try {
      await ThermalPrinterModule.printBluetooth({
        payload: 'Hello Pavemint!',
        printerNbrCharactersPerLine: 38,
      });
    } catch (error) {
      console.log('Print Error', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        ...backgroundStyle,
        justifyContent: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={handleBluetoothPrint}
        style={{
          backgroundColor: 'steelblue',
          paddingVertical: 24,
          paddingHorizontal: 52,
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 24, color: '#fff'}}>PRINT</Text>
      </TouchableOpacity>
      <Text
        style={{
          width: '80%',
          textAlign: 'center',
          alignSelf: 'center',
          marginTop: 24,
          fontWeight: '700',
        }}>
        Connect your Bluetooth printer before pressing the print button and
        accept the Bluetooth permission
      </Text>
    </SafeAreaView>
  );
}

export default App;
