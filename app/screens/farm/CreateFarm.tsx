import Bottom from '@/components/ui/Bottom';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import Text from '@/components/ui/Text';
import {BUTTON} from '@/constants/color';
import {mainNavigations} from '@/constants/navigations';
import useForm from '@/hooks/useForm';
import MainLayout from '@/layouts/MainLayout';
import {postUserFarmSetting} from '@/services/apis/user';
import {farmRequest} from '@/types/farm';
import {validateCreateFarm} from '@/utils/validate';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

const checkboxList = [
  {
    farm: 'default',
    name: '평범한 농장',
  },
  {
    farm: 'forest',
    name: '삼림 농장',
  },
  {
    farm: 'beach',
    name: '해변 농장',
  },
];

const CreateFarm = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<any>();

  const [farmType, setFarmType] = useState('default');
  const form = useForm({
    initialValue: {name: ''},
    validate: validateCreateFarm,
  });

  const createFarm = useMutation({
    mutationFn: (req: farmRequest) => {
      return postUserFarmSetting(req);
    },
  });

  const handleCreateFarm = () => {
    const isFormValid = !Object.values(form.errors).some(error => error !== '');
    if (!isFormValid) {
      return;
    }

    const req = {
      ...form.values,
      type: farmType,
    };

    createFarm.mutateAsync(req).then(() => {
      navigation.navigate(mainNavigations.HOME);
      queryClient.invalidateQueries({
        queryKey: ['userFarm'],
      });
    });
  };

  return (
    <MainLayout className={styles.layout}>
      <View style={styles.container}>
        <View style={{gap: 10}}>
          <Text variant="body">농장 이름</Text>
          <InputField
            {...form.getTextInputProps('name')}
            error={form.errors.name}
            touched={form.touched.name}
            placeholder="농장 이름을 입력해주세요."
            returnKeyType="join"
            onSubmitEditing={handleCreateFarm}
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        {checkboxList.map(c => {
          return (
            <View style={styles.checkbox} key={c.farm}>
              <CheckBox
                tintColors={{true: BUTTON.primary_hover, false: '#767577'}}
                value={farmType === c.farm ? true : false}
                onValueChange={() => setFarmType(c.farm)}
              />
              <View style={styles.farmImage} />
              <Text variant="button">{c.name}</Text>
            </View>
          );
        })}
      </View>

      <Bottom className={{paddingVertical: 20}}>
        <Button
          label="시작하기"
          onPress={handleCreateFarm}
          disabled={createFarm.isPending}
          isLoading={createFarm.isPending}
        />
      </Bottom>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 20,
  },
  container: {width: '100%', marginVertical: 30},
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkbox: {
    flexBasis: '48%', // 2 columns with some space between
    alignItems: 'center',
    marginBottom: 16,
  },
  farmImage: {
    width: '48%',
    height: 100,
    backgroundColor: '#c6c6c6',
    borderRadius: 20,
  },
});

export default CreateFarm;
