import {ForwardedRef} from 'react';

function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

function decreaseStep(step: string) {
  const lastChar = step.slice(-1);

  if (!isNaN(lastChar)) {
    const number = parseInt(lastChar, 10) - 1;
    const newStep = step.slice(0, -1) + number;

    return newStep;
  } else {
    // 마지막 문자가 숫자가 아니면, 그대로 반환
    return step;
  }
}

export {decreaseStep, mergeRefs};
