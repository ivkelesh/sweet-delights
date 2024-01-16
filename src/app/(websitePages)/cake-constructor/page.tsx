"use client";

import {
  calculateCakeCost,
  generateImages,
  getCoating,
  getDecors,
  getFillings,
} from "@/utils/httpRequests";
import { CakeElementModel } from "@/utils/interfaces";
import {
  FormControl,
  Input,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  TextareaAutosize,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const cakeShapes = [
  { image: "/rounded.jpg", label: "Round", id: 0 },
  { image: "/square.jpg", label: "Square", id: 1 },
];

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [fillings, setFillings] = useState(null);
  const [filling, setFilling] = useState(null);
  const [coatings, setCoatings] = useState(null);
  const [coating, setCoating] = useState(null);
  const [decors, setDecors] = useState(null);
  const [decor, setDecor] = useState(null);
  const [inscription, setInscription] = useState("");
  const [cakeShape, setCakeShape] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [promt, setPromt] = useState("");
  const [generatedImages, setGeneratedImages] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    switch (activeStep) {
      case 1:
        getFillingsList();
        break;
      case 2:
        getCoatingList();
        break;
      case 3:
        break;
      case 4:
        getDecorList();
        break;
    }

    getTotalPrice();
  }, [activeStep]);

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getTotalPrice = async () => {
    // const res = await calculateCakeCost({
    //   shape: cakeShapes[cakeShape],
    //   fillingId: filling?.id,
    //   decorId: decor?.id,
    //   coatingId: coating?.id,
    //   weight: weight,
    // });
    // const data = await res
    //   .json()
    //   .catch((e) => console.log("Error: ", e.message));
    // setTotalPrice(data.totalPrice);
  };

  const onGenerateImages = async () => {
    const res = await generateImages(promt);
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));

    setGeneratedImages(data.ImageUrls);
  };

  const onCakeShapeClick = (cakeShape: string) => {
    setCakeShape(cakeShape);

    handleNext();
  };

  const onCakeFillingClick = (cakeFilling: CakeElementModel) => {
    setFilling(cakeFilling);

    handleNext();
  };

  const onCakeCoatingClick = (cakeCoating: CakeElementModel) => {
    setCoating(cakeCoating);

    handleNext();
  };

  const onCakeDecorClick = (cakeDecor: CakeElementModel) => {
    setDecor(cakeDecor);
    setTotalPrice((prevPrice) => (prevPrice += cakeDecor.pricePerKg));

    handleNext();
  };

  const getFillingsList = async () => {
    const res = await getFillings();
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
    setFillings(data);
  };

  const getCoatingList = async () => {
    const res = await getCoating();
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
    setCoatings(data);
  };

  const getDecorList = async () => {
    const res = await getDecors();
    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
    setDecors(data);
  };

  const stepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="d-flex justify-content-between flex-wrap">
            {cakeShapes?.map((i) => (
              <div className="col-md-6 p-3" key={i.image}>
                <Image
                  src={i.image}
                  alt={i.label}
                  width={450}
                  height={450}
                  className="rounded img-fluid"
                  role="button"
                  onClick={() => onCakeShapeClick(i.label)}
                />

                <h2 className="text-center mt-3">{i.label}</h2>
              </div>
            ))}
          </div>
        );

      case 1:
        return (
          <div className="d-flex flex-wrap">
            {fillings?.map((i) => (
              <div className="col-md-3 p-2" key={i.image}>
                <Image
                  src={i.imageUrl}
                  alt={i.title}
                  width={250}
                  height={250}
                  className="rounded img-fluid"
                  role="button"
                  onClick={() => onCakeFillingClick(i)}
                />

                <h2 className="text-center mt-3">{i.title}</h2>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="d-flex flex-wrap">
            {coatings?.map((i) => (
              <div className="col-md-3 p-2" key={i.image}>
                <Image
                  src={i.imageUrl}
                  alt={i.title}
                  width={250}
                  height={250}
                  className="rounded img-fluid"
                  role="button"
                  onClick={() => onCakeCoatingClick(i)}
                />

                <h2 className="text-center mt-3">{i.title}</h2>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <FormControl>
            <InputLabel>Weight</InputLabel>
            <Input
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              inputProps={{ maxLength: 25 }}
            />
          </FormControl>
        );

      case 4:
        return (
          <div className="d-flex flex-wrap">
            {decors?.map((i) => (
              <div className="col-md-3 p-2" key={i.image}>
                <Image
                  src={i.imageUrl}
                  alt={i.title}
                  width={250}
                  height={250}
                  className="rounded img-fluid"
                  role="button"
                  onClick={() => onCakeDecorClick(i)}
                />

                <h2 className="text-center mt-3">{i.title}</h2>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <FormControl>
            <InputLabel>Insription on the Cake</InputLabel>
            <Input
              id="weight"
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
            />
          </FormControl>
        );

      case 6:
        return (
          <div className="d-flex flex-column gap-4">
            <FormControl>
              <InputLabel>Generate an Image</InputLabel>
              <Input
                id="generate"
                value={promt}
                onChange={(e) => setPromt(e.target.value)}
              />

              <button
                onClick={onGenerateImages}
                className="primary-btn form-btn"
              >
                Generate Image
              </button>
            </FormControl>

            {generatedImages && (
              <div>
                <h2>Select generated Image</h2>

                <div className="row">
                  {generatedImages?.map((imageUrl) => (
                    <div className="col-md-3" key={imageUrl}>
                      <Image
                        src={imageUrl}
                        height={300}
                        width={300}
                        alt="Generated Image"
                        className="img-fluid"
                        onClick={() => setGeneratedImage(imageUrl)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <div>
            {generatedImages?.map((imageUrl) => (
              <div className="col-md-3" key={imageUrl}>
                <Image
                  src={imageUrl}
                  height={300}
                  width={300}
                  alt="Generated Image"
                  className="img-fluid"
                  onClick={() => setGeneratedImage(imageUrl)}
                />
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
          <div className="col-md-2">
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step} onClick={() => setActiveStep(index)}>
                  <StepLabel role="button">{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="col-md-8">
            <h1 className="mb-5">{steps[activeStep]}</h1>

            {stepContent()}
          </div>
          <div className="col-md-2">
            <h4>Total Price: {totalPrice}</h4>
            <ul className="ms-auto">
              {cakeShape && <li>{cakeShape}</li>}
              {filling && <li>{filling.title}</li>}
              {coating && <li>{coating.title}</li>}
              {decor && <li>{decor.title}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
