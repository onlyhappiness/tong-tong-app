import SignUpStepOne from '@/components/form/SignUpStepOne';
import SignUpStepTwo from '@/components/form/SignUpStepTwo';
import Header from '@/components/Header';
import Text from '@/components/ui/Text';
import {useFunnel} from '@/hooks/useFunnel';
import MainLayout from '@/layouts/MainLayout';
import React, {useState} from 'react';

const Signup = () => {
  const {step, setStep, Funnel} = useFunnel('step1');

  const [form, setForm] = useState({
    email: '',
    account: '',
    nickname: '',
    username: '',
    password: '',
  });

  // console.log('form: ', form);

  return (
    <MainLayout>
      <Header type="step" step={step} setStep={setStep} />

      <Funnel>
        <Funnel.Step name="step1">
          <SignUpStepOne
            form={form}
            setForm={setForm}
            step={step}
            setStep={setStep}
          />
        </Funnel.Step>

        <Funnel.Step name="step2">
          <SignUpStepTwo
            form={form}
            setForm={setForm}
            step={step}
            setStep={setStep}
          />
        </Funnel.Step>

        <Funnel.Step name="step3">
          <Text>로그인 완료!</Text>
        </Funnel.Step>
      </Funnel>
    </MainLayout>
  );
};

export default Signup;
