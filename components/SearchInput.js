import React from 'react';
import{ TextInput, View,StyleSheet, TextPropTypes } from 'react-native'
import PropTypes from 'prop-types'

export default class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            text: "",
        };
    }

    handleChangeText = (text) =>{ //trata a mudança de texto, cada tecla digitada 
        this.setState({text});
    }

    handleSubmitEditing =() =>{
        const{onSubmit} = this.props;
        const {text} = this.state;

        if(!text) return;

        onSubmit(text);
        this.setState({text: ''});
    }

    render(){
        const{placeholder} = this.props;
        const {text} = this.state;

        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={text}
                    autoCorrect={false}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="white"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        )
    }
}

SearchInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.suppressHighlighting,
}

SearchInput.defaultProps ={
    placeholder: '',
}

//#region 
const styles = StyleSheet.create({
    container:{
        height: 40,
        marginTop:20,
        backgroundColor: "#666",
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    textInput:{
        flex: 1,
        color: "white"
    }
})
//#endregion
