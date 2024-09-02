import useForm from '@/hooks/useForm';
import {checkDuplicatedAccount} from '@/services/apis/user';
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

const StepTwo = ({form, setForm, setStep}: Props) => {
  const stepTwo = useForm({
    initialValue: {account: ''},
    validate: validateForm,
  });

  const [accountError, setAccountError] = useState(false);

  const checkAccountMutation = useMutation({
    mutationFn: (account: string) => {
      return checkDuplicatedAccount(account);
    },
  });

  const nextStep = () => {
    checkAccountMutation.mutate(stepTwo.values.account, {
      onSuccess: (res: any) => {
        if (res.data) {
          setAccountError(true);
        }
        if (!res.data) {
          setForm({
            ...form,
            account: stepTwo.values.account,
          });
          setStep('step3');
        }
      },
    });
  };

  return (
    <>
      <View style={styles.step}>
        <Text variant="title" textStyle={styles.text}>
          사용하실 아이디를 입력해주세요.
        </Text>

        <InputField
          autoFocus
          variant="underscore"
          placeholder="아이디 입력"
          error={stepTwo.errors.account}
          touched={stepTwo.touched.account}
          blurOnSubmit={false}
          {...stepTwo.getTextInputProps('account')}
          containerStyle={{
            marginTop: 10,
          }}
        />

        <Bottom>
          <Button label="확인" onPress={nextStep} />
        </Bottom>
      </View>

      <Alert
        open={accountError}
        content="다른 유저가 사용중인 계정입니다."
        onClose={() => {
          setAccountError(false);
        }}
      />
    </>
  );
};

function validateForm(values: {account: string}) {
  const errors = {
    account: '',
  };

  if (isBlank(values.account)) {
    errors.account = '이메일을 입력해주세요.';
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

export default StepTwo;
