import { TabBarContext } from '@/components/todo/app-wrapper';
import { useContext } from 'react';
import { FlexJustifySpread } from './flex-justify-spread';

export default function FormErrorContainer() {
  const { form } = useContext(TabBarContext) as any;

  if (!form) {
    return null;
  }

  const { mutation } = form;

  return mutation?.error ? (
    <div className='mt-[auto] mb-4'>
      <FlexJustifySpread className='bg-red-400 p-2'>
        <div className='px-4'>Your form has errors</div>
      </FlexJustifySpread>
      {mutation?.error ? mutation.error.message : null}
    </div>
  ) : null;
}
