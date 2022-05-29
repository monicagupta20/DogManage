import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function ListItem ({item, onDelete, onEdit}){


    return (
            <View style={styles.row}>
                <View style={[styles.container, {backgroundColor: "#FFE5B4"}]}>
                    <Text style={styles.nametext}>
                        Name : {item.breed}
                    </Text>
                    <Text style={styles.name}>
                        Breed : {item.name}
                    </Text>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={()=>onEdit(item)}
                        style={styles.touchable}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>onDelete(item.id)}
                        style={styles.touchable}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
    )

};



const styles = StyleSheet.create({
    row:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:"#ccc",
        backgroundColor: '#FFF',
        padding: 10
    },
    container:{
        padding: 10
    },

    name: {
        marginTop: 25,
        marginBottom: 20,
        fontSize: 20,
        color: 'black',
        textAlign: "left",
        fontWeight:'bold'
    },

    nametext: {
        marginTop: 5,
        fontSize: 20,
        lineHeight: 21,
        color: 'black',
        fontWeight:'bold'
    },

    buttons:{
        width: 190,
        flexDirection: 'row'
    },

    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },

    editAction: {
        backgroundColor: '#497AFC'
    },

    deleteAction: {
        backgroundColor: '#dd2c00'
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    },
    buttonContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    touchable:{
        alignItems:'center',
        justifyContent:'center',
        width:'40%',
        paddingVertical:10,
        borderRadius:50,
        backgroundColor:'#808000'
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    }
});