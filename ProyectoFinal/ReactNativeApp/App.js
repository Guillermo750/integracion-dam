import React from 'react';
import { View } from 'react-native';
/*El componente MulticastConnection se importa desde el archivo ./src/multicast/MulticastConnection, 
lo cual significa que se espera que exista un archivo llamado MulticastConnection.js en la ruta especificada.*/
import MulticastConnection from './src/multicast/MulticastConnection';
//import FileTransfer from './fileTransfer/FileTransfer';

/*En resumen, este código representa el punto de entrada de tu aplicación y renderiza el componente MulticastConnection 
dentro de un contenedor View. Puedes agregar otros componentes o realizar otras acciones dentro de este componente App 
según las necesidades de tu aplicación.*/
export default function App() {

  return (
    <View>
      <MulticastConnection />
    </View>
  );
}