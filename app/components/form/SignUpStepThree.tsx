import useForm from '@/hooks/useForm';
import {userRegisterFormData} from '@/types/auth';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Bottom from '../ui/Bottom';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Text from '../ui/Text';

interface Props {
  form: userRegisterFormData;
  setForm: (form: userRegisterFormData) => void;
  step?: string;
  setStep: (step: string) => void;
}
const StepThree = ({form, setForm, setStep}: Props) => {
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const stepThree = useForm({
    initialValue: {
      password: '',
      confirmPassword: '',
    },
    validate: validateForm,
  });

  console.log('form Error: ', stepThree.errors);

  return (
    <>
      <View style={styles.step}>
        <Text variant="title" textStyle={styles.text}>
          비밀번호를 입력해주세요.
        </Text>

        <InputField
          autoFocus
          variant="underscore"
          placeholder="비밀번호 입력"
          error={stepThree.errors.password}
          touched={stepThree.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          {...stepThree.getTextInputProps('password')}
          containerStyle={{marginBottom: 50}}
        />

        <Text variant="title" textStyle={styles.text}>
          비밀번호를 다시 입력해주세요.
        </Text>

        <InputField
          ref={confirmPasswordRef}
          variant="underscore"
          placeholder="비밀번호 확인"
        />

        <Bottom>
          <Button label="확인" />
        </Bottom>
      </View>
    </>
  );
};

function validateForm(values: {password: string; confirmPassword: string}) {
  const errors = {
    password: '',
    confirmPassword: '',
  };

  if (values.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야합니다.';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

const styles = StyleSheet.create({
  step: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 30,
    alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 10,
    fontSize: 18,
    paddingLeft: 4,
  },
});

export default StepThree;
