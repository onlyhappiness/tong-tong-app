import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Text, View} from 'react-native';

const RetryErrorBoundary = ({children}) => {
  const {reset} = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => {
        return (
          <View>
            <Text>잠시 후 다시 시도해주세요.</Text>
          </View>
        );
      }}>
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
