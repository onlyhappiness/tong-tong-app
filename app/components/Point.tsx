import {BUTTON} from '@/constants/color';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import Text from './ui/Text';

export default () => {
  const queryClient = useQueryClient();

  const cacheData = queryClient.getQueryData(['userPoint']);

  return (
    <Text textStyle={{fontWeight: 'bold', color: BUTTON.third_hover}}>
      {cacheData ? cacheData.toLocaleString('ko-KR') : '0'}
    </Text>
  );
};
