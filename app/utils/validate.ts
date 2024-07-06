import {userLoginFormData} from '@/types/user';

function isBlank(value: string) {
  return value.trim() === '';
}

function validateUser(values: userLoginFormData) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: userLoginFormData) {
  return validateUser(values);
}

export {validateLogin};
