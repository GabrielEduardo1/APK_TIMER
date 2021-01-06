import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Contador(props) {

    var done = false;
    useEffect(()=>{

        const timer = setInterval(()=>{

            props.setarSegundos(props.segundos-1);

            if(props.segundos <= 0){
                if(props.minutos>0){
                    props.setarMinutos(props.minutos-1);
                    props.setarSegundos(59);
                }else{
                    if(!done){
                        done =true;
                        props.setarEstado('selecionar');
                        props.setarMinutos(1);
                        props.setarSegundos(0);
                    }
                }
            }

        },1000)

        return () => clearInterval(timer);

    })

    function resetar(){
        props.setarEstado('selecionar');
        props.setarMinutos('0'+1);
        props.setarSegundos('0'+0);
    }

    function formatarNum(num){
        var finalnumber = '';
        if(num < 10){
            finalnumber = "0"+num;
        }else{
            finalnumber = num;
        }
        return finalnumber;
    }

    var segundos = formatarNum(props.segundos);
    var minutos = formatarNum(props.minutos);

    return(
      <View style={styles.container}>

        <StatusBar style="light" />

        <LinearGradient
        // Background Linear Gradient
        colors={['rgb(19, 1, 133)', 'rgba(19, 1, 133,0.4)']}
        style={styles.background}
        />

        <View style={{flexDirection:'row'}}>

            <Text style={styles.textCont}>{minutos} : </Text>
            <Text style={styles.textCont}>{segundos}</Text>

        </View>

        <TouchableOpacity style={styles.btnIniciar} onPress={() => props.setarEstado('selecionar')}>
          <Text style={{color:'white', fontSize:20}}>RESETAR</Text>
        </TouchableOpacity>

      </View>
    );
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
      textCont:{
          color:'white',
          fontSize:35
      },
      btnIniciar:{
        backgroundColor:'rgba(80, 69, 150,0.6)',
        padding:50,
        borderRadius:100,
        marginTop:30,
        borderColor:'white',
        borderWidth:2,
      }
});