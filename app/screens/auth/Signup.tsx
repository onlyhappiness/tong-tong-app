import Bottom from '@/components/ui/Bottom';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import Text from '@/components/ui/Text';
import {useFunnel} from '@/hooks/useFunnel';
import MainLayout from '@/layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon, XIcon} from 'lucide-react-native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

const Signup = () => {
  const {step, setStep, Funnel} = useFunnel('step1');

  const [form, setForm] = useState({
    email: '',
    account: '',
    nickname: '',
    username: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(false);

  return (
    <MainLayout>
      {/* <Header type="default" title="" back /> */}
      <Header step={step} setStep={setStep} />

      <Funnel>
        <Funnel.Step name="step1">
          <View style={styles.step}>
            <Text variant="title" textStyle={styles.text}>
              사용하시는 이메일을 알려주세요.
            </Text>

            <InputField
              variant="underscore"
              placeholder="이메일 입력"
              containerStyle={{
                marginTop: 10,
              }}
            />

            <NextButton
              onPress={() => {
                setStep('step2');
              }}
            />
          </View>
        </Funnel.Step>

        <Funnel.Step name="step2">
          <View style={styles.step}>
            <Text variant="title" textStyle={styles.text}>
              사용하실 아이디를 입력해주세요.
            </Text>
            <InputField
              variant="underscore"
              placeholder="아이디 입력"
              containerStyle={{
                marginTop: 10,
              }}
            />

            <Text variant="title" textStyle={[styles.text, {marginTop: 40}]}>
              사용하실 비밀번호를 입력해주세요.
            </Text>

            <InputField
              variant="underscore"
              placeholder="비밀번호 입력"
              containerStyle={{
                marginTop: 10,
              }}
            />

            <NextButton onPress={() => setStep('step3')} />
          </View>
        </Funnel.Step>

        <Funnel.Step name="step3">
          <Text>로그인 완료!</Text>

          {/* <NextButton onPress={() => setStep('step1')} /> */}
        </Funnel.Step>
      </Funnel>
    </MainLayout>
  );
};

const Header = ({
  step,
  setStep,
}: {
  step: string;
  setStep: (step: string) => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.view}>
        {step === 'step1' ? (
          <XIcon
            color={'black'}
            size={22}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ) : (
          <ArrowLeftIcon color={'black'} size={22} onPress={() => {}} />
        )}
      </View>
      <View style={styles.view}></View>
      <View style={styles.view}></View>
    </View>
  );
};

const NextButton = ({onPress}: {onPress: () => void}) => {
  return (
    <Bottom>
      <Button label="확인" onPress={onPress} />
    </Bottom>
  );
};

const styles = StyleSheet.create({
  step: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 30,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 230,
  },
  text: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 10,
    fontSize: 20,
    paddingLeft: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  view: {
    flex: 1,
  },
  title: {textAlign: 'center'},
});

export default Signup;
