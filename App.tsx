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

const text =
  '[L]\n' +
  "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
  '[L]\n' +
  '[C]================================\n' +
  '[L]\n' +
  '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
  '[L]  + Size : S\n' +
  '[L]\n' +
  '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
  '[L]  + Size : 57/58\n' +
  '[L]\n' +
  '[C]--------------------------------\n' +
  '[R]TOTAL PRICE :[R]34.98e\n' +
  '[R]TAX :[R]4.23e\n' +
  '[L]\n' +
  '[C]================================\n' +
  '[L]\n' +
  "[L]<font size='tall'>Customer :</font>\n" +
  '[L]Raymond DUPONT\n' +
  '[L]5 rue des girafes\n' +
  '[L]31547 PERPETES\n' +
  '[L]Tel : +33801201456\n' +
  '[L]\n' +
  "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
  "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
  '[L]\n' +
  '[L]\n' +
  '[L]\n' +
  '[L]\n' +
  '[L]\n';

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
        payload: text,
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
