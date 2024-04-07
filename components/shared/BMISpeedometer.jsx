"use client";
import React from "react";
import dynamic from "next/dynamic";
import { CustomSegmentLabelPosition } from "react-d3-speedometer";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), {
  ssr: false,
});
const BMISpeedometer = ({value}) => {
    return (
        <div className="px-2">
          <ReactSpeedometer
            height={200}
            width={338}
            maxValue={50}
            needleColor="steelblue"
            minValue={0}
            needleHeightRatio={.8}
            customSegmentStops={[0, 16, 17, 18.5, 25, 30, 35, 40, 50]}
            segmentColors={[
              "#bc2020",
              "#d38888",
              "#ffe400",
              "#008137",
              "#ffe400",
              "#d38888",
              "#bc2020",
              "#8a0101",
            ]}
            value={value}
            currentValueText=""
            customSegmentLabels={[
              {
                text: "Underweight",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "15",
                color: "#555",
              },
              {
                text: "",
                position: undefined,
                fontSize: "20",
                color: "#555",
              },
              {
                text: "",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "20",
                color: "#555",
              },
              {
                text: "Normal",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "13",
                color: "#555",
              },
              {
                text: "  Overweight",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "10",
                color: "#555",
              },
              {
                text: " ",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "10",
                color: "#555",
              },
              {
                text: "Obese",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "20",
                color: "#555",
              },
              {
                text: "",
                position: CustomSegmentLabelPosition.Outside,
                fontSize: "10",
                color: "#555",
              },
            ]}
          />
        </div>
      );
}

export default BMISpeedometer