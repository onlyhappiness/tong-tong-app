import React from 'react';
import {Text, View} from 'react-native';

interface HeaderProps {
  type: 'default';
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
  };

  return <View>{header()}</View>;
};

export default Header;
