import {decreaseStep} from '@/utils/func';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import HomeHeader from './header/HomeHeader';
import Icon from './ui/Icon';
import CustomText from './ui/Text';

interface HeaderProps {
  type: 'default' | 'home' | 'step';
  viewStyle?: StyleProp<ViewStyle>;
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  back?: boolean;
  step?: string;
  setStep?: (step: string) => void;
}

const Header = ({
  type,
  viewStyle,
  title,
  leftIcon,
  rightIcon,
  back,
  step,
  setStep,
}: HeaderProps) => {
  const navigation = useNavigation();

  const backIcon = () => {
    return (
      <Icon
        name="ArrowLeft"
        onPress={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const header = () => {
    if (type === 'default') {
      return (
        <View style={[styles.header, viewStyle]}>
          <View style={styles.view}>
            {leftIcon && leftIcon}
            {back && backIcon()}
          </View>

          <View style={styles.view}>
            <Text style={styles.title}>
              {title ? <CustomText>{title}</CustomText> : null}
            </Text>
          </View>

          <View style={styles.view}>{rightIcon && rightIcon}</View>
        </View>
      );
    }

    if (type === 'step') {
      const backStep = decreaseStep(step!);

      return (
        <View style={[styles.header, viewStyle]}>
          <View style={styles.view}>
            {step === 'step1' && (
              <Icon
                name="X"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            )}

            {step !== 'step1' && (
              <Icon
                name="ArrowLeft"
                onPress={() => {
                  setStep!(backStep);
                }}
              />
            )}
          </View>

          <View style={styles.view}>
            <Text style={styles.title}>
              {title ? <CustomText>{title}</CustomText> : null}
            </Text>
          </View>

          <View style={styles.view}>{rightIcon && rightIcon}</View>
        </View>
      );
    }

    if (type === 'home') {
      return <HomeHeader />;
    }
  };

  return <View>{header()}</View>;
};

const styles = StyleSheet.create({
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

export default Header;
