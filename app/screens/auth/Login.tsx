import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import {Center, ColStack, RowStack} from '@/components/ui/Stack';
import Text from '@/components/ui/Text';
import useForm from '@/hooks/useForm';
import usePostAuthLogin from '@/services/queries/auth/usePostAuthLogin';
import {userLoginRequest} from '@/types/user';
import {validateLogin} from '@/utils/validate';
import React, {useRef} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const Login = () => {
  // const navigation = useNavigation();

  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const {mutate} = usePostAuthLogin();

  const handleSubmit = () => {
    const isEmpty = Object.values(login.errors).every(value => value === '');
    if (!isEmpty) {
      return;
    }

    const loginFormData: userLoginRequest = {
      method: 'email',
      ...login.values,
    };

    mutate(loginFormData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Center flex={1} containerStyle={{}}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/logo.png')}
        />
      </Center>

      <Center flex={1} containerStyle={styles.loginContainer}>
        <InputField
          autoFocus
          placeholder="이메일 입력"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />

        <InputField
          ref={passwordRef}
          placeholder="비밀번호 입력"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />

        <Button
          label="로그인"
          textStyle={{color: 'white'}}
          onPress={handleSubmit}
        />
      </Center>

      <ColStack flex={1}>
        <View style={styles.textContainer}>
          <Pressable>
            <Text variant="caption" textStyle={{fontSize: 14}}>
              아이디 찾기
            </Text>
          </Pressable>

          <Pressable>
            <Text variant="caption" textStyle={{fontSize: 14}}>
              비밀번호 찾기
            </Text>
          </Pressable>

          <Pressable>
            <Text variant="caption" textStyle={{fontSize: 14}}>
              회원가입
            </Text>
          </Pressable>
        </View>

        <View style={styles.authContainer}>
          <RowStack containerStyle={{gap: 20}}>
            <View style={styles.line} />
            <Text>간편 계정 연결</Text>
            <View style={styles.line} />
          </RowStack>
        </View>
      </ColStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 300,
    // width: '100%',
    // height: '100%',
  },
  loginContainer: {
    gap: 15,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  authContainer: {
    marginTop: 50,
  },
  line: {backgroundColor: 'gray', height: 1, width: '30%'},
});

export default Login;
