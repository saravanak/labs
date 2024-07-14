'use client';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Delete } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function ChatListener({ recognition }: any) {
  const [started, setStarted] = useState(false);
  const [transcript, setTranscript] = useState('');
  useEffect(() => {
    if (started) {
      recognition.onresult = (event: any) => {
        let transcript = [];
        for (var i = 0; i < event.results.length; i++) {
          transcript.push(event.results[i][0].transcript);
        }

        setTranscript(transcript.join('.'));
      };

      recognition.onend = (event: any) => {
        setStarted(false);
        // const { transcript } = event.results[0][0];
      };

      recognition.onaudiostart = () => {
      };
      recognition.onsoundstart = () => {
      };
    }
    return () => {
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onaudiostart = null;
      recognition.onsoundstart = null;
    };
  }, [started]);

  function trimLastWord() {
    setTranscript(transcript.split(' ').slice(0, -1).join(' '));
    recognition.stop();
    setTimeout(() => {
      recognition.start();
    }, 0);
  }

  function startRecording() {
    if (started) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setStarted(!started);
  }

  return (
    <>
      <Drawer open={true}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Ask Elica...</DrawerTitle>
            <DrawerDescription>{transcript}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className='flex justify-between'>
              <Button behaveAs="button"
                className={`grow mx-2 ${
                  started ? 'hover:bg-green-400 bg-green-400' : 'bg-gray-700'
                }`}
                onClick={startRecording}
              >
                {started ? 'Listening' : 'Click to speak'}
              </Button>
              <Button behaveAs="button" onClick={trimLastWord}>
                <Delete />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
