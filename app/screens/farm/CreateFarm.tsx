import Bottom from '@/components/ui/Bottom';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import Text from '@/components/ui/Text';
import {BUTTON} from '@/constants/color';
import useBlockBackHandler from '@/hooks/useBlockBack';
import MainLayout from '@/layouts/MainLayout';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

const CreateFarm = () => {
  const navigation = useNavigation();

  const [farmType, setFarmType] = useState('default');

  useBlockBackHandler();

  return (
    <MainLayout className={styles.container}>
      {/* <Text>농장 설정 페이지</Text> */}

      <View style={{width: '100%', marginVertical: 30}}>
        <View style={{marginVertical: 30, gap: 10}}>
          <Text variant="body">농장 이름</Text>
          <InputField placeholder="농장 이름을 입력해주세요." />
        </View>

        <Pressable
          style={{
            backgroundColor: BUTTON.primary,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text>평범한 농장</Text>
        </Pressable>
      </View>

      <Bottom className={{paddingVertical: 20}}>
        <Button label="시작하기" />
      </Bottom>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default CreateFarm;
