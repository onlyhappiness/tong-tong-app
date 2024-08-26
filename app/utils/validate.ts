import {userLoginFormData} from '@/types/user';

function isBlank(value: string) {
  return value.trim() === '';
}

function validateUser(values: userLoginFormData) {
  const errors = {
    account: '',
    password: '',
  };

  // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
  //   errors.email = '올바른 이메일 형식이 아닙니다.';
  // }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

// 회원가입
function validateSignup(values) {
  const errors = {
    email: '',
    account: '',
    nickname: '',
    username: '',
    password: '',
  };

  return errors;
}

// 로그인 검증
function validateLogin(values: userLoginFormData) {
  return validateUser(values);
}

// 농장 이름 검증
function validateCreateFarm(values: {name: string}) {
  const errors = {
    name: '',
  };

  if (isBlank(values.name)) {
    errors.name = '농장 이름을 입력해주세요.';
  }

  if (!(values.name.length >= 3 && values.name.length <= 15)) {
    errors.name = '농장 이름은 3~15자 사이로 입력해주세요.';
  }

  return errors;
}

export {validateCreateFarm, validateLogin, validateSignup};
