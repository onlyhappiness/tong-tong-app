import useForm from '@/hooks/useForm';
import {checkDuplicatedEmail} from '@/services/apis/user';
import {userRegisterFormData} from '@/types/auth';
import {isBlank} from '@/utils/validate';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Alert from '../ui/Alert';
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

const StepOne = ({form, setForm, setStep}: Props) => {
  const stepOne = useForm({
    initialValue: {email: ''},
    validate: validateForm,
  });

  const [emailError, setEmailError] = useState(false);

  const checkEmailMutation = useMutation({
    mutationFn: (email: string) => {
      return checkDuplicatedEmail(email);
    },
  });

  const nextStep = () => {
    checkEmailMutation.mutate(stepOne.values.email, {
      onSuccess: (res: any) => {
        if (res.data) {
          setEmailError(true);
        }
        if (!res.data) {
          setForm({
            ...form,
            email: stepOne.values.email,
          });
          setStep('step2');
        }
      },
    });
  };

  return (
    <>
      <View style={styles.step}>
        <Text variant="title" textStyle={styles.text}>
          사용하시는 이메일을 알려주세요.
        </Text>

        <InputField
          autoFocus
          variant="underscore"
          placeholder="이메일 입력"
          error={stepOne.errors.email}
          touched={stepOne.touched.account}
          blurOnSubmit={false}
          {...stepOne.getTextInputProps('email')}
          containerStyle={{
            marginTop: 10,
          }}
        />

        <Bottom>
          <Button
            label="확인"
            onPress={() => {
              nextStep();
            }}
            disabled={checkEmailMutation.isPending}
            isLoading={checkEmailMutation.isPending}
          />
        </Bottom>
      </View>

      <Alert
        open={emailError}
        content="이미 사용중인 이메일입니다."
        onClose={() => {
          setEmailError(false);
        }}
      />
    </>
  );
};

function validateForm(values: {email: string}) {
  const errors = {
    email: '',
  };

  if (isBlank(values.email)) {
    errors.email = '이메일을 입력해주세요.';
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
    fontSize: 20,
    paddingLeft: 4,
  },
});

export default StepOne;
