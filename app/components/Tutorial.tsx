import {postUserPetBuy} from '@/services/apis/user';
import {petBuyRequest} from '@/types/pet';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import Alert from './ui/Alert';

export default () => {
  const queryClient = useQueryClient();

  // const {setStep, Funnel} = useFunnel('step1');

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);

  const createEgg = useMutation({
    mutationFn: (req: petBuyRequest) => {
      return postUserPetBuy(req);
    },
  });

  const onClickStepOne = async () => {
    // setStep('step2');
    setStepOne(false);
    setStepTwo(true);
  };

  const onClickStepTwo = () => {
    const req = {
      type: 'egg',
      species: 'default',
    };

    createEgg.mutate(req, {
      onSuccess: res => {
        console.log('튜토리얼 res:::', res.data);
        queryClient.invalidateQueries({
          queryKey: ['petList'],
        });
      },
      onError: error => {
        console.log('error', error);
      },
      onSettled: () => {
        setStepTwo(false);
      },
    });
  };

  return (
    <>
      <Alert
        open={stepOne}
        title="환영합니다!"
        content="통통 다마고치에 오신 것을 환영합니다.\n 귀여운 펫을 키우고 즐거운 시간을 보내세요!"
        onClose={onClickStepOne}
      />

      <Alert
        open={stepTwo}
        title="축하합니다!"
        content="튜토리얼을 완료하셨습니다.\n 시작하기 전에, 특별한 알을 드리겠습니다"
        onClose={onClickStepTwo}
        isLoading={createEgg.isPending}
      />
    </>

    // <Funnel>
    //   <Funnel.Step name="step1">
    //     <Alert
    //       open={true}
    //       title="환영합니다!"
    //       content="통통 다마고치에 오신 것을 환영합니다.\n 귀여운 펫을 키우고 즐거운 시간을 보내세요!"
    //       onClose={onClickStepOne}
    //     />
    //   </Funnel.Step>

    //   <Funnel.Step name="step2">
    //     <Alert
    //       open={true}
    //       title="축하합니다!"
    //       content="튜토리얼을 완료하셨습니다.\n 시작하기 전에, 특별한 알을 드리겠습니다"
    //       onClose={onClickStepTwo}
    //       isLoading={createEgg.isPending}
    //     />
    //   </Funnel.Step>

    //   <Funnel.Step name="finished">
    //     <></>
    //   </Funnel.Step>
    // </Funnel>
  );
};
