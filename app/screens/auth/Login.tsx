import Alert from '@/components/Alert';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import {RowStack} from '@/components/ui/Stack';
import Text from '@/components/ui/Text';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {userLoginRequest} from '@/types/user';
import {validateLogin} from '@/utils/validate';
import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const Login = () => {
  const passwordRef = useRef<TextInput | null>(null);

  const [loginError, setLoginError] = useState(false);

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const {loginMutation} = useAuth();

  const handleSubmit = () => {
    const isEmpty = Object.values(login.errors).every(value => value === '');
    if (!isEmpty) {
      return;
    }

    const loginFormData: userLoginRequest = {
      method: 'email',
      ...login.values,
    };

    loginMutation.mutate(loginFormData, {
      onError: () => setLoginError(true),
    });
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@/assets/logo.png')}
          />

          <View>
            <InputField
              autoFocus
              placeholder="이메일 입력"
              error={login.errors.email}
              touched={login.touched.email}
              containerStyle={{marginBottom: 20}}
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
              containerStyle={{marginBottom: 30}}
              secureTextEntry
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
              {...login.getTextInputProps('password')}
            />

            {/* {loginMutation.isError && (
            <Text>아이디 또는 비밀번호를 다시 확인해주세요.</Text>
          )} */}

            <Button
              label="로그인"
              // textStyle={{color: 'white'}}
              containerStyle={{marginBottom: 30}}
              onPress={handleSubmit}
              disabled={loginMutation.isPending}
              isLoading={loginMutation.isPending}
            />
          </View>

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

            <RowStack containerStyle={{marginTop: 30, gap: 30}}>
              <Text>카카오톡</Text>
              <Text>구글</Text>
              <Text>네이버</Text>
            </RowStack>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert
        open={loginError}
        content="아이디 또는 비밀번호를 다시 확인해주세요."
        onClose={() => {
          setLoginError(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    gap: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  loginContainer: {
    gap: 15,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 30,
  },
  authContainer: {
    marginTop: 50,
  },
  line: {backgroundColor: 'gray', height: 1, width: '30%'},
});

export default Login;
