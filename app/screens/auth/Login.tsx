import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import {screenWidth} from '@/constants/screenSize';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('@/assets/egg.png')}
          resizeMode="contain"
        />
        {/* <View style={styles.image} /> */}
      </View>

      <View style={styles.loginContainer}>
        <InputField
          autoFocus
          placeholder="이메일 입력"
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <InputField
          autoFocus
          placeholder="비밀번호 입력"
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <Button label="로그인" />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text>아이디 찾기</Text>
          <Text>비밀번호 찾기</Text>
          <Text>회원가입</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: screenWidth / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  authContainer: {
    marginTop: 30,
  },
});

export default Login;
