import React, {useState} from "react";//importo el modulo necesario de React para crear componentes funcionales y utilizar el hook `useState`
import { View, Text, TextInput, Button } from 'react-native';//
import DocumentPicker from 'react-native-document-picker'; //Biblioteca para seleccionar archivos
import RNFS from 'react-native-fs'; //Biblioteca para manipulación de archivos
import Multicast from 'react-native-udp'; //Biblioteca de conexión multicast

const FileTransfer = () => {
    /*declara una variable de estado llamada selectedFile y una función setSelectedFile que se utilizará para actualizar el valor de 
    selectedFile. La variable de estado selectedFile se inicializa con el valor null.*/
    const [selectedFile,  setSelectedFile] = useState(null);
    /*La línea const [socket, setSocket] = useState(null); declara una variable de estado llamada socket y una función setSocket 
    que se utilizará para actualizar el valor de socket. La variable de estado socket se inicializa con el valor null.*/
    const [socket, setSocket] = useState(null);
    /*Las líneas const multicastAddress = "192.168.0.104"; y const multicastPort = 5000; declaran constantes que almacenan 
    la dirección IP del grupo multicast (multicastAddress) y el puerto del grupo multicast (multicastPort). Estas constantes 
    se utilizan posteriormente en tu código para establecer la dirección y el puerto de la conexión multicast.*/
    const multicastAddress = "192.168.0.104";
    const multicastPort = 5000;

    /*La función setupMulticastSocket se define dentro del useEffect. */
    useEffect(() => {
        // Configurar y abrir el socket de conexión multicast al montar el componente
        const setupMulticastSocket = async () => {
            /*Creo una instancia de Multicast pasando la dirección y el puerto multicast como parámetros. 
            Luego, intenta realizar las siguientes acciones de forma asíncrona:*/
            const socket = new Multicast(multicastAddress, multicastPort);
            try {
                /*Este método enlaza el socket a la dirección y al puerto multicast especificados.*/
                await socket.bind();
                /*Este método hace que el socket se una al grupo multicast.*/
                await socket.joinGroup();
                /*Si ambas acciones tienen éxito, se establece el estado socket utilizando setSocket para guardar la referencia al socket 
                de multidifusión.*/
                setSocket(socket);
            } catch (error) {
                console.log('Error al configurar el socket de multidifusión:', error);
            }
        };
        /*La función setupMulticastSocket se invoca inmediatamente después de ser definida dentro del useEffect, lo que permite configurar 
        y abrir el socket de conexión multicast cuando el componente se monta.*/
        setupMulticastSocket();

        // Cerrar el socket de conexión multicast al desmontar el componente
        return () => {
            if (socket) {
                socket.leaveGroup();
                socket.close();
            }
        };
    }, []);

    /*En la función selectedFile lo que estoy haciendo es: */
    selectedFile = async () => {
        try {
            /*Utilizando la biblioteca DocumentPicker para permitir al usuario seleccionar un archivo. Utiliza DocumentPicker.pick para abrir 
            el explorador de archivos y espera la respuesta asincrónica.*/
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            /*Si la selección de archivo tiene éxito, el archivo seleccionado se almacena en el estado selectedFile utilizando 
            la función setSelectedFile.*/
            setSelectedFile(res);
        } catch (error) {
            console.log('Error al seleccionar archivo:', err);
        }
    };

    /*En la función transferFile lo que estoy haciendo es: */
    const transferFile = async () => {

        /*Verifica si se ha seleccionado un archivo. Si no se ha seleccionado ninguno, muestra una alerta indicando que se debe seleccionar 
        un archivo antes de transferirlo.*/
        if (!selectedFile) {
            Alert.alert('Ningún archivo seleccionado', 'Seleccione un archivo para transferir.');
            return;
        }

        /*Verifica si el socket de multidifusión está disponible. Si no lo está, muestra una alerta indicando que se debe esperar 
        a que se configure el socket de multidifusión antes de transferir el archivo.*/
        if (!socket) {
            Alert.alert('Zócalo de multidifusión no disponible', 'Espere a que se configure el socket de multidifusión');
            return;
        }

        /*Obtiene la ruta del archivo seleccionado desde selectedFile.uri.*/
        const filePath = selectedFile.uri;
        try {
            /*Verifica si el archivo existe utilizando la biblioteca RNFS (React Native File System).*/
            const fileExists = await RNFS.exists(filePath);
            /*Si el archivo no existe, muestra una alerta indicando que el archivo seleccionado no existe.*/
            if (!fileExists) {
                Alert.alert('Archivo no encontrado', 'El archivo seleccionado no existe.');
                return;
            }
            /*Lee el contenido del archivo utilizando RNFS.readFile con la opción 'base64' para obtener los datos del archivo en formato base64.*/
            const fileData = await RNFS.readFile(filePath, 'base64');
            // Lógica para enviar el archivo a través de la conexión multicast
            socket.send(fileData);
        } catch (error) {
            console.log('Error al transferir el archivo:', error);
        }
    };

    /*En la interfaz de usuario, se muestra el nombre del archivo seleccionado (o "None" si no se ha seleccionado ninguno) 
    y se tienen dos botones: "Select File" para seleccionar un archivo y "Transfer File" para iniciar la transferencia del archivo seleccionado.*/
    return (
        <View>
            <Text>selected File: {selectedFile ? selectedFile.name : 'None'}</Text>
            <Button title="Select File" onPress={selectedFile}/>
            <Button title="Transfer File" onPress={transferFile}/>
        </View>
    );
};

export default FileTransfer;
