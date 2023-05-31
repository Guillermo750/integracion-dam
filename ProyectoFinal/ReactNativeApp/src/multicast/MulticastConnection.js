//importo el modulo necesario de React para crear componentes funcionales y utilizar el hook `useEffect` y el `useState`
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Multicast from 'react-native-udp'; //Biblioteca de conexión multicast

const MulticastConnection = () => {
    /* Aquí estás declarando una variable de estado llamada message y utilizando el hook useState para inicializarla 
    con un valor inicial de un array vacío ([]). La función setMessage es proporcionada por el hook useState y 
    se utiliza para actualizar el valor de message en el futuro. El message es el estado que almacena los mensajes recibidos en la conexión multicast.*/
    const [message, setMessage] = useState([]);
    
    /*Aquí estás declarando una variable de estado llamada inputMessage y utilizando el hook useState para inicializarla 
    con un valor inicial de una cadena vacía (''). La función setInputMessage es proporcionada por el hook useState y 
    se utiliza para actualizar el valor de inputMessage en el futuro. El inputMessage es el estado que almacena el mensaje 
    que el usuario ingresa en el campo de entrada de texto.*/
    const [inputMessage, setInputMessage] = useState('');

    useEffect (() => {
        //Condiguración y manejo de la conexión multicast
        const multicast = new Multicast();
        multicast.setAddress('192.168.0.104'); //Dirección del grupo multicast
        multicast.setPort(5000); //Puerto del grupo multicast

        //Evento para recibir mensajes multicast
        multicast.onMessage((message) => {
            setMessage((prevMessages) => [...prevMessages, message]);
        });

        //Unirse al grupo multicast
        multicast.joinGroup();

        return() => {
            //Salir del grupo multicast al desmontar el componente
            multicast.leaveGroup();
        };

    }, []);

    /*En la función sendMessage, se verifica si inputMessage contiene un mensaje ingresado por el usuario. 
    Si hay un mensaje válido, se crea una instancia de Multicast y se configura la dirección y el puerto multicast utilizando 
    los valores específicos ("192.168.0.104" y 5000 en este caso).*/
    const sendMessage = () => {
        if(inputMessage){
            //Enviar mensaje por la conexión multicast
            const multicast = new Multicast();
            multicast.setAddress('192.168.0.104'); //Dirección del grupo multicast
            multicast.setPort(5000); //Puerto del grupo multicast
            /*se utiliza el método send de la instancia de Multicast para enviar el mensaje ingresado a través de la conexión multicast.*/
            multicast.send(inputMessage);
            /*Finalmente, se utiliza setInputMessage('') para limpiar el campo de entrada de texto después de enviar el mensaje.*/
            setInputMessage('');
        }
    };

    /*En resumen, este código crea una interfaz de usuario que muestra una lista de mensajes, 
        permite al usuario ingresar nuevos mensajes y enviarlos mediante un botón.*/
    return (
        <View>
            <Text>Messages:</Text>
            {messages.map((message, index) => (
                <Text key={index}>{message}</Text>
            ))}
            <TextInput 
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Enter message"
            />
            <Button title="Send Message" onPress={sendMessage}/>
        </View>
    );
};

export default MulticastConnection;