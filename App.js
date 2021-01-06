import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador.js';

export default function App() {

  console.disableYellowBox = true

  const[estado, setarEstado] = useState('selecionar');
  const [segundos, setarSegundos] = useState(1);
  const [minutos, setarMinutos] = useState(0);

  const [alarmeSound, setarAlarmeSound] = useState(
    [
      {
        id:1,
        selecionado: true,
        som:'Musica 1',
        file:require('./assets/alarme1.mp3'),
      },
      {
        id:2,
        selecionado:false,
        som:'Musica 2',
        file:require('./assets/alarme2.mp3'),
      },
      {
        id:3,
        selecionado: false,
        som:'Musica 3',
        file:require('./assets/alarme3.mp3'),
      }
    ]
  );

  var numeros = [];
  for(var i = 1; i <= 60; i++){
      numeros.push(i);
  }

  function setarAlarme(id){
    let alarmesTemp = alarmeSound.map(function(val){
      if(id != val.id)
        val.selecionado = false;
      else
        val.selecionado = true;
      return val;
    })

    setarAlarmeSound(alarmesTemp);
  }
  if(estado == 'selecionar'){

  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <LinearGradient
        // Background Linear Gradient
        colors={['rgb(19, 1, 133)', 'rgba(19, 1, 133,0.4)']}
        style={styles.background}
      />

      

      <Text style={{color:'white', fontSize:30}}>Selecione seu Tempo:</Text>

      <View style={{flexDirection:'row'}}>
      
        <Text style={{color:'white', marginTop:16}}>Min:</Text>

        <Picker
          selectedValue={minutos}
          onValueChange={(itemValue, itemIndex) => setarMinutos(itemValue)}

          style={{ height: 50, width: 100, color:'white'}}>
          
          <Picker.Item label='0' value = '0'></Picker.Item> 
          {
          numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()} />);
          })
          }
        </Picker>

        <Text style={{color:'white', marginTop:16}}>Sec:</Text>
        <Picker
          selectedValue={segundos}
          onValueChange={(itemValue, itemIndex) => setarSegundos(itemValue)}

          style={{ height: 50, width: 100 , color:'white'}}>
          {
          numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()} />);
          })
          }
        </Picker>

      </View>
      <View style={{marginTop:30, flexDirection:'row'}}>
        {
          alarmeSound.map(function(val){
            if(val.selecionado){
              return(<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolhas}><Text style={{color:'white'}}>{val.som}</Text></TouchableOpacity>);
            }else{
              return(<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolha}><Text style={{color:'white'}}>{val.som}</Text></TouchableOpacity>);
            }
          })
        }
      </View>

        <TouchableOpacity style={styles.btnIniciar} onPress={() => setarEstado('iniciar')}>
          <Text style={{color:'white', fontSize:20}}>START</Text>
        </TouchableOpacity>

    </View>
  );

  }else if(estado == 'iniciar'){
    return(
      <Contador  alarmes={alarmeSound} segundos={segundos} minutos={minutos} setarEstado={setarEstado} setarSegundos={setarSegundos} setarMinutos={setarMinutos}>

      </Contador>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  btnEscolha:{
    padding:10,
    backgroundColor:'rgb(80, 69, 150)',
    marginRight:10,
  },
  btnEscolhas:{
    padding:10,
    backgroundColor:'rgba(80, 69, 150,0.6)',
    marginRight:10,
    borderColor:'white',
    borderWidth:1
  },
  btnIniciar:{
    backgroundColor:'rgba(80, 69, 150,0.6)',
    padding:50,
    borderRadius:50,
    marginTop:30,
    borderColor:'white',
    borderWidth:2,
  }
});
