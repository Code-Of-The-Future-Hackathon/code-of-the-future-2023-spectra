import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SideEffects = ({ sideEffects }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Странични ефекти</Text>
            <Text style={styles.content}>{sideEffects}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fffaf0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffe4b5',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff4500',
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        color: '#666',
    },
});

export default SideEffects;
