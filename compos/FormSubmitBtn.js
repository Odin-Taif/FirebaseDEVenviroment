
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const FormSubmitBtn = ({title, submitting,  onPress}) => {
  const backgroundColor = submitting ? 'rgba(27, 27, 51, 0.4)' : 'rgba(27, 27, 51, 1)';
  return (
    <TouchableOpacity onPress={!submitting ? onPress : null} style={[styles.container, {backgroundColor}]}> 
            <Text style={styles.btn}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
        container:{
            marginTop:10, 
            height:45, 
            borderRadius:8, 
            justifyContent:"center", 
            alignItems:"center",
        }, 
        btn:{
            
            fontSize:18, 
            color:'#fff', 

        }
});
export default FormSubmitBtn;