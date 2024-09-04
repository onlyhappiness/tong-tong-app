import {useUserInfoState} from '@/data/userStore';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from './ui/Text';

export default () => {
  const {userInfo} = useUserInfoState();

  //   console.log('userInfo', userInfo);

  return (
    <Pressable style={styles.container}>
      <View style={styles.circle}>
        <Text>{userInfo?.profileUrl as string}</Text>
      </View>
      <Text variant="button">{userInfo?.nickname as string}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
