import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = NativeStackScreenProps<RootStackParamList, 'AddTimer'>;
type timerDataType = {name:string, duration:string, category:string}
const AddTimer: FC<Props> = ({ navigation }) => {
    const [timerData, setTimerData] = useState<timerDataType>({ name: '', duration: '', category: '' });
    const [fieldErrors, setFieldErrors] = useState({ name: false, duration: false, category: false, duplicate: false });
    const [storedTimerData, setStoredTimerData] = useState<timerDataType[]>([])

    useEffect(()=>{
        const getData = () => {
            AsyncStorage.getItem('timerData')
               .then((data) => {
                    if(data){
                        setStoredTimerData(JSON.parse(data));
                    }
                })
               .catch((error) => console.log(error));
        }
        getData()
    },[])

    const handleInputChange = (key: string, value: string) => {
        let updatedValue = key === 'duration' ? value.replace(/[^0-9]/g, '') : value; // Allow only numbers in duration

        setTimerData((prev) => ({ ...prev, [key]: updatedValue }));
        setFieldErrors((prev) => ({ ...prev, [key]: updatedValue.trim() === '', duplicate: false }));
    };

    const handleSavedData = () => {
        let errors = { name: false, duration: false, category: false, duplicate: false };
        let hasError = false;

        // Validate required fields
        Object.keys(timerData).forEach((key) => {
            const field = key as keyof typeof timerData
            if (!timerData[field].trim()) {
                errors[field] = true;
                hasError = true;
            }
        });

        if (hasError) {
            setFieldErrors(errors);
            return;
        }

        // Check for duplicate timer
        const isDuplicate = storedTimerData.some(
            (data) =>
                data.category.toLowerCase() === timerData.category.toLowerCase() &&
                data.name.toLowerCase() === timerData.name.toLowerCase()
        );

        if (isDuplicate) {
            setFieldErrors((prev) => ({ ...prev, duplicate: true }));
        } else {
            AsyncStorage.setItem('timerData', JSON.stringify([...storedTimerData, timerData]))
            navigation.navigate("Home");
        }
    };

   

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Add Timer</Text>
            <View style={styles.formContainer}>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={[styles.inputTextField, fieldErrors.name && styles.errorBorder]}
                        placeholder="Enter Your Timer Name"
                        maxLength={48}
                        onChangeText={(text) => handleInputChange("name", text)}
                        value={timerData.name}
                    />
                    {fieldErrors.name && <Text style={styles.errorText}>Please enter your timer name.</Text>}
                </View>

                {/* Duration Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={[styles.inputTextField, fieldErrors.duration && styles.errorBorder]}
                        placeholder="Enter Timer Duration (Seconds)"
                        keyboardType="number-pad"
                        maxLength={5}
                        onChangeText={(text) => handleInputChange("duration", text)}
                        value={timerData.duration}
                    />
                    {fieldErrors.duration && <Text style={styles.errorText}>Please enter timer duration in seconds.</Text>}
                </View>

                {/* Category Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={[styles.inputTextField, fieldErrors.category && styles.errorBorder]}
                        placeholder="Enter Timer Category"
                        maxLength={48}
                        onChangeText={(text) => handleInputChange("category", text)}
                        value={timerData.category}
                    />
                    {fieldErrors.category && <Text style={styles.errorText}>Please enter timer category.</Text>}
                </View>

                {/* Duplicate Error */}
                {fieldErrors.duplicate && <Text style={styles.errorText}>Timer already exists. Please check name and category.</Text>}

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButtonContainer} onPress={handleSavedData}>
                    <Icon name="save" size={scale(18)} color="#fff" />
                    <Text style={styles.saveText}> Save</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#a2c579' },
    header: {
        color: "#016a70",
        margin: scale(16),
        fontSize: scale(32),
        textAlign: "center",
        fontWeight: "900",
        textTransform: "uppercase"
    },
    formContainer: { flex: 1, margin: scale(16) },
    inputContainer: { marginBottom: scale(16) },
    label: {
        color: '#016a70',
        fontSize: scale(16),
        fontWeight: '700',
        marginBottom: scale(4)
    },
    inputTextField: {
        backgroundColor: "#fff",
        height: scale(48),
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        fontWeight: "700",
        color: "#000"
    },
    errorBorder: {
        borderColor: "red",
        borderWidth: 1
    },
    errorText: {
        color: "#f23c52",
        fontSize: scale(16),
        fontWeight: "700",
        marginTop: scale(4)
    },
    saveButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#016a70',
        padding: scale(12),
        margin: scale(16),
        width: '90%',
        borderRadius: scale(32),
        alignSelf: 'center'
    },
    saveText: {
        fontWeight: '900',
        fontSize: scale(18),
        color: '#fff'
    }
});

export default AddTimer;