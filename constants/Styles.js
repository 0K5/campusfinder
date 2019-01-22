import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    heading:{
        fontSize: 35,
        marginTop: 30,
        textAlign: 'center'
    },
    container:{
        flex:8,
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:'15%',
        marginTop:25,
        marginBottom: 15
    },
    text:{
        fontSize:20,
        fontWeight:'200'
    },
    text2:{
        fontSize:20,
        fontWeight:'200',
        marginTop: 25,
        marginLeft: '10%',
    },
    dropdown:{
        marginLeft: '10%',
        width:'75%',
    },
    dropdown2:{
        marginLeft: '10%',
        width:'75%',
        marginBottom: 70,
    },
    Button: {
        backgroundColor: '#58ACFA',
        width: '70%',
        marginLeft:'15%',
        marginTop: 50,
        height: 45,
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '80%',
        //marginLeft: '10%',
        //marginTop: '10%',
        borderColor: 'grey',
        borderWidth: 1
    },
    ButtonText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    or:{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
        marginBottom: -30,
    }
});