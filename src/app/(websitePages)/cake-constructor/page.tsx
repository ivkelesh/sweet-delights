"use client";

import { getFillings } from "@/utils/httpRequests";
import { Step, StepLabel, Stepper } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const steps = [
  "Choose a cake shape",
  "Choose a filling",
  "Choose a coating",
  " Specify the weight",
  "Decor",
  "Insription on the cake",
  "Upload or Generate an image",
  "Order comments",
];

const cakeShape = [
  { image: "/rounded.jpg", label: "Round" },
  { image: "/square.jpg", label: "Square" },
];

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [fillings, setFillings] = useState(null);

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await getFillingsList();
        break;
      case 1:

      case 2:
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setCakeShape = (cakeShape: string) => {
    //fetch set cake
    handleNext();
  };

  const getFillingsList = async () => {
    // const res = await getFillings();
    // const data = await res
    //   .json()
    //   .catch((e) => console.log("Error: ", e.message));
    // setFillings(data.items);
  };

  const stepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="d-flex justify-content-between flex-wrap">
            {cakeShape.map((i) => (
              <div className="col-md-6" key={i.image}>
                <Image
                  src={i.image}
                  alt={i.label}
                  width={450}
                  height={450}
                  className="rounded"
                  role="button"
                  onClick={() => setCakeShape(i.label)}
                />

                <h2 className="text-center mt-3">{i.label}</h2>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="page-container ">
      <div className="container ">
        <div className="row my-5">
          <div className="col-md-3">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step} onClick={() => setActiveStep(index)}>
                  <StepLabel role="button">{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="col-md-9">
            <h1 className="mb-5">{steps[activeStep]}</h1>

            {stepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
