import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
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
  const navigation = useNavigation();

  const backIcon = () => {
    return (
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <CustomText variant="body">뒤로</CustomText>
      </Pressable>
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
