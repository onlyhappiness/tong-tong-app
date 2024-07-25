import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './ui/Text';

interface Props {
  open: boolean;
  title?: string;
  content: string;
  onClose?: () => void;
  onSubmit?: () => void;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
}

export default ({
  open,
  title,
  content,
  onClose,
  onSubmit,
  cancelText,
  submitText,
  isLoading,
}: Props) => {
  return (
    <Modal visible={open} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.top}>
            {title}
            <Text textStyle={styles.content}>{content}</Text>
          </View>

          <View style={styles.bottom}>
            {!!onSubmit && (
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.button}
                onPress={() => onClose?.()}>
                <Text>{cancelText || '취소'}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.button}
              onPress={() => onClose?.()}>
              <Text>{submitText || '확인'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alert: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 300,
  },
  top: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 100,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
});
