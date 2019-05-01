import React from 'react';
import { View, Text, Button } from "react-native";

const WrapperTextInput= ({children, label, formikProps, nameTxtInput}) => {
    return (
        <View style = {{margin:5}}>
            <Text style = {{marginBottom:5}}>{label}</Text>
            {children}
            {formikProps.touched[nameTxtInput] && formikProps.errors[nameTxtInput] && (
                <Text style = {{color:"red"}}>{formikProps.errors[nameTxtInput]}</Text>
            )}
        </View>
    );
}

export default WrapperTextInput;
            