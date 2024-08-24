import React from 'react';
import {Pressable, StyleProp, Text, View, ViewStyle} from 'react-native';
import HomeHeader from './header/HomeHeader';
import CustomText from './ui/Text';

interface HeaderProps {
  type: 'default' | 'home';
  viewStyle?: StyleProp<ViewStyle>;
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  back?: boolean;
}

const Header = ({
  type,
  viewStyle,
  title,
  leftIcon,
  rightIcon,
  back,
}: HeaderProps) => {
  const backIcon = () => {
    return (
      <Pressable>
        <CustomText variant="body">뒤로</CustomText>
      </Pressable>
    );
  };

  const header = () => {
    if (type === 'default') {
      return (
        <View style={[viewStyle]}>
          <View>
            {leftIcon && leftIcon}
            {back && backIcon()}
          </View>
          <View>
            <Text>{title ? <CustomText>{title}</CustomText> : null}</Text>
          </View>
          <View>{rightIcon && rightIcon}</View>
        </View>
      );
    }

    if (type === 'home') {
      return <HomeHeader />;
    }
  };

  return <View>{header()}</View>;
};

export default Header;
