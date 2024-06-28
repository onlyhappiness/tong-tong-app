import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>로그인 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
});

export default Login;
