import {pointResponse} from '@/types/point';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet} from 'react-native';
import Text from './ui/Text';

export default () => {
  const queryClient = useQueryClient();

  const cacheData = queryClient.getQueryData<pointResponse>(['userPoint']);

  return (
    <Text textStyle={styles.point}>
      {cacheData ? cacheData?.point.toLocaleString() : '0'}
    </Text>
  );
};

const styles = StyleSheet.create({
  point: {
    fontWeight: 'bold',
    // color: BUTTON.third_hover
    color: 'white',
  },
});
