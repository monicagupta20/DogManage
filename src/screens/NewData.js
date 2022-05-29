import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage
} from 'react-native';

import {useDispatch} from 'react-redux';
import {Header} from 'react-navigation-stack';

import {createData, updateData} from "../actions";


const MAX_LENGTH = 250;

export default function NewData(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let quote = navigation.getParam('quote', null);

    const [isSaving, setIsSaving] = useState(false);
    const [name, setname] = useState(quote ? quote.name : "");
    const [breed, setBreed] = useState(quote ? quote.breed : "");

    const onSave = () => {
        let edit = quote !== null;
        let quote_ = {};

        if (edit) {
            quote_ = quote;
            quote_['name'] = name;
            quote_['breed'] = breed;
        } else {
            let id = generateID();
            quote_ = {"id": id, "name": name, "breed": breed};
        }

        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null){
                quotes = JSON.parse(quotes);

                if (!edit){

                    quotes.unshift(quote_);
                }else{
                    const index = quotes.findIndex((obj) => obj.id === quote_.id);

            
                    if (index !== -1) quotes[index] = quote_;
                }

                AsyncStorage.setItem('quotes', JSON.stringify(quotes), () => {
                    if (!edit) dispatch(createData(quote_));
                    else dispatch(updateData(quote_));

                    navigation.goBack();
                });
            }
        });
    };

    const generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    };

    let disabled = (name.length > 0 && breed.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} style={styles.flex} behavior="padding">
            <SafeAreaView style={styles.flex}>
                <View style={styles.flex}>
                    <TextInput
                        onChangeText={(text) => setname(text)}
                        placeholder={"Enter Dog's Name"}
                        autoFocus={true}
                        style={[styles.name]}
                        value={name}/>
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => setBreed(text)}
                        placeholder={"Enter Dog's Breed"}
                        style={[styles.text]}
                        maxLength={MAX_LENGTH}
                        value={breed}/>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Text style={[styles.count, (MAX_LENGTH - breed.length <= 10) && {color: "red"}]}> {MAX_LENGTH - breed.length}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={onSave}
                                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text style={[styles.buttonText, {color: disabled ? "rgba(255,255,255,.5)" : "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },

    count: {
        fontSize: 17,
        color: "#6B9EFA"
    },

    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },

    buttonText: {
        fontSize: 16,
    },

    name: {
        fontSize: 20,
        lineHeight: 22,
        height: 80,
        padding: 16,
        backgroundColor: 'white',
    },

    text: {
        fontSize: 30,
        lineHeight: 33,
        color: "#333333",
        padding: 16,
        paddingTop: 16,
        minHeight: 170,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)"
    }
});