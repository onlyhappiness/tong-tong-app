import { type ComponentProps } from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { TextField } from '@/components/text-field';

type FormTextFieldProps<T extends FieldValues> = Omit<
  ComponentProps<typeof TextField>,
  'value' | 'onChangeText' | 'error'
> & {
  control: Control<T>;
  name: Path<T>;
  /** 필드 자체 검증 오류 외에 추가로 에러 스타일을 강제할 때 사용(예: 서버 에러). */
  hasError?: boolean;
};

/**
 * react-hook-form의 Controller로 감싼 TextField.
 * 각 화면에서 Controller 보일러플레이트를 반복하지 않도록 한다.
 */
export function FormTextField<T extends FieldValues>({
  control,
  name,
  hasError,
  ...rest
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextField
          {...rest}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={!!fieldState.error || hasError}
        />
      )}
    />
  );
}
