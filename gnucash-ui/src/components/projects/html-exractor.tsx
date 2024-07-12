'use client';
import { useEffect, useMemo, useState } from 'react';
import LinksListing from '@/components/ui/links-listing';

export default function HtmlExtractorComponent() {
  let outputCurrent = '';

  const [value, setValue] = useState<string>('Hi');
  const [selector, setSelector] = useState<string>(
    'TBODY td | map(## Set ${this.idx}) | p | map(- ${this.item.textContent})'
  );
  const [output, setOutput] = useState<string>('');

  const onUpdateValue = (event: any) => {
    const textValue = event?.currentTarget?.value;
    console.log(textValue);
    setValue(textValue);
  };

  useEffect(() => {
    setValue((localStorage.getItem('html-content') as string) || '');
  });

  const fillTemplate = function (templateString: any, templateVars: any) {
    return new Function('return `' + templateString + '`;').call(templateVars);
  };

  const constructOutput = ({
    instructionPointer,
    selectorParts,
    currentNodes,
  }: any) => {
    while (instructionPointer < selectorParts.length) {
      const instruction = selectorParts[instructionPointer].trim();
      console.log({
        instruction,
        currentNodes,
        output,
      });

      if (instruction.startsWith('map')) {
        const matches = instruction.match(/map\((.*)\).*/);
        if (!matches) {
          console.log(`Instruction ${instruction} is invalid`, matches);
          throw new Error('Hi');
        }
        for (var idx = 0; idx < currentNodes.length; idx++) {
          const printStatement = matches[1];
          console.log({ printStatement });

          outputCurrent +=
            '<br/>' +
            fillTemplate(printStatement, { idx, item: currentNodes[idx] });
          console.log({ outputCurrent });

          constructOutput({
            instructionPointer: instructionPointer + 1,
            selectorParts,
            currentNodes: currentNodes[idx],
          });
        }
        return;
      } else {
        constructOutput({
          instructionPointer: instructionPointer + 1,
          selectorParts,
          currentNodes: currentNodes.querySelectorAll(instruction),
        });
        return;
      }
    }
  };
  useEffect(() => {
    const nodes = document.createElement('div');
    nodes.innerHTML = value;

    const selectorParts = selector.split('|');
    const currentNodes = nodes.querySelectorAll(selectorParts[0]);

    const instructionPointer = 1;

    if (currentNodes.length > 0) {
      constructOutput({ instructionPointer, selectorParts, currentNodes });

      setOutput(outputCurrent);
    }
  }, [selector, value]);

  //  useEffect(() => {
  //         if(output.length     > 100) {
  //             console.log({output});
  //             bundleMDX({source: "Test Me"}).then(( bundled) => {
  //                 console.log(bundled.code);

  //                 Component= getMDXComponent(bundled.code, {output});
  //             })

  //         } else {
  //             Component= <div></div>;
  //         }

  //     },
  //     [output]
  //   );

  return (
    <>
      <div className='font-bold'>
        {' '}
        For notes see &nbsp;
        <span className='font-bold'>
          <LinksListing
            isSimpleLinks={true}
            links={[
              {
                href: `${process.env.NEXT_PUBLIC_DIARY_URL}/n/blog/dom-selector-queue/`,
                label: 'notes',
              },
            ]}
          />
        </span>
      </div>
      <div className='grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 font-mono text-sm text-center rounded-lg w-full place-content-stretch'>
        <div className='flex flex-col justify-center items-center h-full'>
          <div className='flex justify-center h-full w-full flex-col'>
            <div className='flex flex-col h-5/6 border '>
              <div className='inverted-color p-2 font-bold'>
                Input HTML{' '}
                <span className='text-xs'>
                  (adopted from AWS SDK Documentation)
                </span>
              </div>
              <textarea
                className='h-full'
                value={value}
                onChange={onUpdateValue}
              />
            </div>
            <div className='flex flex-col border '>
              <div className='inverted-color p-2 font-bold'>Selector DSL</div>
              <input
                className='p-2'
                value={selector}
                onChange={(event) => setSelector(event.target.value)}
              />
              <div className='inverted-color p-2'>Formatted DSL</div>
              <p className='text-wrap bg-gray-300 text-left p-2'>
                {selector.split('|').map((v, index) => (
                  <span key={index}>
                    <span>{v} |</span>
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col border '>
          <div className='inverted-color p-2 font-bold'>
            {' '}
            Here is the output
          </div>

          <div
            className='text-left pl-4 p-2'
            dangerouslySetInnerHTML={{ __html: output }}
          ></div>
        </div>
      </div>
    </>
  );
}
