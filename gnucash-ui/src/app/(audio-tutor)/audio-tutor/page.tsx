'use client';
import ChatListener from '@/components/audio-tutor/chat-listener';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Check, Mic } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

const timestamp = DateTime.now();

const chatList = [
  {
    mode: 'listening',
    content: 'loremlasd asdla dasd asd ',
    at: timestamp,
  },
  {
    mode: 'speaking',
    content: 'asdla asdkasd asd asd ',
    at: timestamp,
  },
  {
    mode: 'listening',
    content:
      'weiopedff asdfkasdf io asdfkljsdiou weiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiou',
    at: timestamp,
  },
  {
    mode: 'speaking',
    content:
      'sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd ',
    at: timestamp,
  },
  {
    mode: 'listening',
    content:
      'weiopedff asdfkasdf io asdfkljsdiou weiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiou',
    at: timestamp,
  },
  {
    mode: 'speaking',
    content:
      'sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd ',
    at: timestamp,
  },
  {
    mode: 'listening',
    content:
      'weiopedff asdfkasdf io asdfkljsdiou weiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiouweiopedff asdfkasdf io asdfkljsdiou',
    at: timestamp,
  },
  {
    mode: 'speaking',
    content:
      'sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd sdkjlasd pasdopasd asdiopadjasd ',
    at: DateTime.now().minus({ days: 3 }),
  },
];

export default function AudioTutor() {
  const [isSpeechEnabled, setSpeechEnabled] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [audioPermission, setAudioPermission] = useState('NA');
  const [chatMessages, setChatMessages] = useState(chatList);

  useEffect(() => {

    navigator.mediaDevices.ondevicechange = (event) => {
    };
    if (
      !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    ) {
      setSpeechEnabled(false);
    } else {
      setSpeechEnabled(true);
    }
  }, []);

  async function startListeningMode() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setRecognition(recognition);
  }

  async function getMicPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (stream) {
        setAudioPermission('GIVEN');
        startListeningMode();
      }
    } catch (error) {
      setAudioPermission('DENIED');
    }
  }
  const isMikeEnabled = audioPermission == 'GIVEN';
  let mikeStatus;
  switch (audioPermission) {
    case 'GIVEN':
      mikeStatus = (
        <span className='text-green-500 font-bold'>
          <Check className='inline mr-4' />
          You are all set
        </span>
      );
      break;

    case 'DENIED':
      mikeStatus = (
        <div className=' text-gray-500'>
          You have denied the audio permission. Click{' '}
          <a href='https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop'>
            here
          </a>
          to know how you can enable your mic
        </div>
      );
      break;

    case 'NA':
      mikeStatus = (
        <div className='text-gray-500'>
          Click on the mike icon to enable speaking to Erica
        </div>
      );
      break;
  }

  return (
    <div className='md:container md:mx-auto w-full md:w-4/6 '>
      <Card className='border-none'>
        <CardTitle>
          <div className='py-4 text-center'> Erica</div>
        </CardTitle>
        <CardContent className='h-[calc(100svh)] md:h-[calc(100svh-2em)]'>
          <div className='   '>
            <div className='grid grid-cols-auto  mb-[1em] max-h-[calc(100svh-10rem)]  overflow-auto'>
              {chatMessages.map(({ mode, content, at }, index) => {
                return (
                  <div
                    key={index}
                    className={`flex rounded-md m-2 p-4 flex-col ${mode} ${
                      mode == 'listening' ? 'bg-gray-200' : 'bg-yellow-100'
                    }`}
                  >
                    <div
                      style={{
                        gridColumn: mode == 'listening' ? '1' : '1',
                        gridRow: index + 1,
                        justifySelf: mode == 'listening' ? 'start' : 'end',

                        // width: "10em",
                      }}
                    >
                      <div className='font-bold'>
                        {mode == 'listening' ? 'Erica' : 'You'}
                      </div>
                      {content}
                    </div>
                    <div className='text-sm italic self-end'>
                      {at.toRelative()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='mx-2 my-[1em]'>
            <div className='flex justify-between align-center items-center'>
              <div> Microphone </div>
              <Button
                onClick={getMicPermissions}
                className={`bg-gray-200 hover:bg-gray-300 text-red-700 ${
                  isMikeEnabled
                    ? 'bg-gray-200 hover:bg-gray-300 '
                    : 'bg-red-700 hover:bg-red-800 text-red-200'
                }`}
              >
                <Mic></Mic>
              </Button>
            </div>
            <div className='flex'>{mikeStatus}</div>
          </div>
        </CardContent>
      </Card>
      {recognition ? <ChatListener recognition={recognition} /> : null}
    </div>
  );
}
