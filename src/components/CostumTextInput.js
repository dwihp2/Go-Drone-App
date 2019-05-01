import React from 'react';
import {TextInput} from 'react-native';
import WrapperTextInput from './WrapperTextInput';

const CostumTextInput = ({label, nameTxtInput, formikProps, ...rest}) => {
    return (
        <WrapperTextInput
            label = {label}
            formikProps = {formikProps}
            nameTxtInput = {nameTxtInput}
        >
            <TextInput
                style= {{borderWidth:1, borderColor:'steelblue', padding:5}}
                onChangeText= {formikProps.handleChange(nameTxtInput)}
                value= {formikProps.values[nameTxtInput]}
                onBlur={formikProps.handleBlur(nameTxtInput)}
                {...rest}
            />
        </WrapperTextInput>
    );
};

export default CostumTextInput;



