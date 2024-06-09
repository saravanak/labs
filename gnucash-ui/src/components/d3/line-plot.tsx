import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}:any) {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data) as any, [height - marginBottom, marginTop]) ;
  const line = d3.line((d:any, i:any) => x(i), (d:any) =>  y(d));
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data) as any} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d:any, i:any) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}