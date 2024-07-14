import React from 'react';
import {Text, View} from 'react-native';
import HomeHeader from './header/HomeHeader';

interface HeaderProps {
  type: 'default' | 'home';
  title?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Header = ({type, title, leftIcon, rightIcon}: HeaderProps) => {
  const header = () => {
    if (type === 'default') {
      return (
        <View>
          <View>{leftIcon && leftIcon}</View>
          <View>
            <Text>{title}</Text>
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
