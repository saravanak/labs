import { ClockLED } from "@/components/games/seven-segment/clock";
import SevenSegmentDigit from "@/components/games/seven-segment/digit";

export default function SevenSegmentPage() {
  const messages: any = ["hello", "react"];

  return (
    <>
      {messages.map((message: any, messageIndex: any) => {
        return (
          <div className="flex my-4" key={messageIndex}>
            {message.split("").map((v: any, i: any) => {
              return (
                <SevenSegmentDigit
                  key={i}
                  input={v}
                  color={messageIndex == 1 ? "bg-green-500" : null}
                />
              );
            })}
          </div>
        );
      })}
      <ClockLED/>
    </>
  );
}

