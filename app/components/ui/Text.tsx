import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface CustomTextProps {
  children: string;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'header' | 'title' | 'body' | 'caption' | 'button';
}

export default ({variant = 'body', children, textStyle}: CustomTextProps) => {
  return (
    <Text style={[styles.text, styles[`${variant}`], textStyle]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#333333',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  caption: {
    fontSize: 13,
    fontWeight: 'medium',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 12,
  },
});
