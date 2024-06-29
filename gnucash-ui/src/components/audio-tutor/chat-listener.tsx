"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Delete } from "lucide-react";

export default function ({ recognition }: any) {
  const [started, setStarted] = useState(false);
  const [transcript, setTranscript] = useState("");
  useEffect(() => {
    if (started) {
      recognition.onresult = (event: any) => {
        console.log(event.results.length);
        let transcript = [];
        for (var i = 0; i < event.results.length; i++) {
          transcript.push(event.results[i][0].transcript);
        }

        setTranscript(transcript.join("."));
      };

      recognition.onend = (event: any) => {
        console.log('onend', event.results);
        setStarted(false);
        // const { transcript } = event.results[0][0];
      };

      recognition.onaudiostart = () => {
        console.log("audio started");
      };
      recognition.onsoundstart = () => {
        console.log("sound started");
      };
      console.log("starting recognition");
    }
    return () => {
      recognition.onend = null;
      recognition.onresult = null;
      recognition.onaudiostart = null;
      recognition.onsoundstart = null;
    };
  }, [started]);

  function trimLastWord() {
    setTranscript(transcript.split(" ").slice(0, -1).join(' '));
    recognition.stop();
    setTimeout(() => {
      recognition.start();
    }, 0)
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
            <DrawerDescription>
              {transcript}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex justify-between">

              <Button className={`grow mx-2 ${started ? "hover:bg-green-400 bg-green-400" : "bg-gray-700"}`} onClick={startRecording}>{started ? "Listening" : "Click to speak"}</Button>
              <Button onClick={trimLastWord}><Delete/></Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

