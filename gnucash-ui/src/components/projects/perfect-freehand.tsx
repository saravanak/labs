'use client';
import { getStroke } from "perfect-freehand";
import { PointerEvent, useState } from "react";
const average = (a: number, b: number) => (a + b) / 2;

export function getSvgPathFromStroke(
  points: number[][],
  closed = true
): string {
  const len = points.length;

  if (len < 4) {
    return ``;
  }

  let a = points[0];
  let b = points[1];
  const c = points[2];

  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
    2
  )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
    b[1],
    c[1]
  ).toFixed(2)} T`;

  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i];
    b = points[i + 1];
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(
      2
    )} `;
  }

  if (closed) {
    result += "Z";
  }

  return result;
}

export default function PerfectFreeHandDemo() {
  const [points, setPoints] = useState([[] as any[]]);

  const handlePointerDown = (e: PointerEvent<SVGSVGElement>) => {
    console.log("handlePointerMove");
     
    (e.target as Element).setPointerCapture(e.pointerId);
    setPoints([[e.pageX - 300, e.pageY - 100, e.pressure]]);
  };

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1) {
      return;
    }
    setPoints([...points, [e.pageX - 300, e.pageY - 100, e.pressure]]);
  };

    const stroke = getStroke(points, {
      size: 10,
      thinning: 2,
      smoothing: 0.5,
      streamline: 0.5,
    });
  
    const pathData = getSvgPathFromStroke(stroke);
    console.log({ points, stroke, pathData });
  

  
  return (
    <div className="grid grid-rows-[5%__1fr] gap-4 font-mono text-sm text-center rounded-lg w-full place-content-stretch">
      <h3>
        A freehand drawing on SVG, powered by{" "}
        <a href="https://perfect-freehand-example.vercel.app/">
          https://perfect-freehand-example.vercel.app/
        </a>
      </h3>
      <svg
        className="w-full h-[600px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          touchAction: "none",

          position: "relative",
          left: 0,
          top: 0,
        }}
      >
        {points.length>0 && points[0].length>0 && <path d={pathData} />}
      </svg>
    </div>
  );
}

