import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useCounter } from "@uidotdev/usehooks";
import { Button } from "../ui/button";

export default function SpinnerPage() {
  const svgRoot = useRef(null);
  const mouseClickStart = useRef<any>(null);
  const [tick, { increment }] = useCounter();

  useEffect(() => {
    console.log({ svgRoot });

    if (!svgRoot.current) {
      return;
    }
    var interpol_rotate: any,
      interpolateTime: any,
      durationEasing: any = null,
      steps: any = null,
      totalSteps: any,
      stepIncrement: any,
      angleEasing: any;

    function initInterpolators() {
      interpol_rotate = d3.interpolateString("rotate(0)", "rotate(360)");

      interpolateTime = d3.interpolateNumberArray(
        [0, 0.25, 5, 0.75, .85 , .90, .95,  1],
        [1000, 1250, 1500, 2100, 2500, 5500, 15000, 20000]
      );
      durationEasing = d3.easeSinOut;
      steps = 0;
      totalSteps = 20;
      stepIncrement = 1 / totalSteps;
      angleEasing = d3.easeLinear;
    }

    initInterpolators();

    function animator(selection: any) {
      d3.select(selection)
        .transition()
        .duration(interpolateTime(0)[1])
        .ease(angleEasing)
        .attrTween("transform", (d: any) => interpol_rotate)
        .on("start", function repeat() {
          steps += stepIncrement;

          const easedStep = durationEasing(steps);
          const currentDuration = interpolateTime(easedStep)[1];
          console.log({ steps, currentDuration });

          (d3.active(this as any) as any)
            .transition()
            .duration(currentDuration)
            .ease(angleEasing)
            .attrTween("transform", (d: any) => interpol_rotate)
            .on("start", steps > 1 ? () => {initInterpolators()} : repeat);
        });
    }

    var svg = d3.select(svgRoot.current);

    const selection = svg.selectAll("g").remove().data([30]);

    const enter = selection
      .enter()
      .append("g")
      .attr("transform", "matrix(1 0 0 1 10 10)");

    enter
      .append("circle")
      .attr("cx", 75)
      .attr("cy", 75)
      .attr("r", "5")
      .attr("fill", "white")
      .attr("stroke", "black");

    enter
      .append("rect")
      .attr("width", (d) => d)
      .attr("height", function (d, i) {
        return d;
      })
      .attr("transform-origin", "75 75")
      .attr("x", function (d) {
        return 60;
      })
      .attr("y", function (d) {
        return 60;
      })
      .on("mousedown", () => {
        mouseClickStart.current = new Date();
      })
      .on("mouseup", function (event, datum) {
        const duration = d3.timeMillisecond.count(
          mouseClickStart.current,
          new Date()
        );

        console.log({ datum, event, foo: this });

        animator(this);
      });

    selection.exit().remove();
  }, [svgRoot, tick]);
  return (
    <div>
      <svg width="720" height="120" ref={svgRoot}></svg>
      {tick}
      <Button onClick={increment}>Ticker</Button>
    </div>
  );
}

