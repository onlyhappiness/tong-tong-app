import {FC, ReactNode, isValidElement, useState} from 'react';

type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: ReactNode[];
};

interface FunnelComponent extends FC<FunnelProps> {
  Step: FC<StepProps>;
}

type UseFunnelReturn = {
  setStep: (step: string) => void;
  Funnel: FunnelComponent;
};

export function useFunnel(initialStep: string): UseFunnelReturn {
  const [step, setStep] = useState(initialStep);

  const Step: FC<StepProps> = ({children}) => {
    return children;
  };

  const Funnel: FunnelComponent = ({children}) => {
    const currentStep = children.find(
      (child: ReactNode) => isValidElement(child) && child.props.name === step,
    );
    return currentStep || null;
  };

  Funnel.Step = Step;
  return {setStep, Funnel};
}
