"use client";

import { connect } from "react-redux";
import {
  calculateCakeCost,
  generateImages,
  generateImagesNew,
  getCoating,
  getDecors,
  getFillings,
  postCake,
} from "@/utils/httpRequests";
import { CakeElementModel, GenerateImageRequest } from "@/utils/interfaces";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as actions from "@/store/actions/actions";
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const steps = [
  "Choose a cake shape",
  "Choose a filling",
  "Choose a coating",
  "Specify the weight",
  "Decor",
  "Insription on the cake",
  "Upload or Generate an image",
  "Order",
];

const cakeShapes = [
  { image: "/rounded.jpg", label: "Round", id: 0 },
  { image: "/square.jpg", label: "Square", id: 1 },
];

function Page({ toggleOrderForm }) {
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
  const [isLoading, setLoading] = useState(false);
  const [orderComment, setOrderComment] = useState("");

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [locality, setLocality] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryType, setDeliveryType] = useState(null);



  const constructedCake = {
    shape: cakeShapes[cakeShape],
    fillingId: filling?.id,
    decorId: decor?.id,
    coatingId: coating?.id,
    weight: weight,
    productType: 2,
    comments: orderComment,
    inscription: inscription,
    totalPrice: totalPrice,
    aiPromt: promt,
    currency: 0,
    imageName: null,
    imageUrl: generatedImage,
    createdBy: "User",
    createdAt: "2023-11-10T22:00:00.000+00:00",
    updatedBy: null,
    updatedAt: null,
    productId: null,
  };

  const postOrderModel = {
    firstName: firstName,
    lastName: lastName,
    locality: locality,
    phoneNumber: phoneNumber,
    address: address,
    deliveryDate: deliveryDate,
    deliveryType: deliveryType,
    orderedProduct: constructedCake
  };

  const imageRequest: GenerateImageRequest = {
    shape: cakeShape,
    coating: coating?.title,
    decor: decor?.title,
    inscription: inscription,
    prompt: promt
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getTotalPrice = async () => {
    const res = await calculateCakeCost(constructedCake);

    const data = await res
      .json()
      .catch((e) => console.log("Error: ", e.message));
    setTotalPrice(data.totalPrice);
  };

  const postOrder = async () => {
    postOrderRequest();
  }

  const postOrderRequest = async () => {
    await postCake(postOrderModel);
  }

  const onGenerateImages = async () => {
    setLoading(true);

    await generateImagesNew(imageRequest)
      .then((res) => res.json())
      .then((data) => {
        setGeneratedImages(data.imageUrls);
        setLoading(false);
      });
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

    handleNext();
  };

  const onGeneratedImageClick = (imageUrl) => {
    setGeneratedImage(imageUrl);

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
            <FormLabel id="demo-radio-buttons-group-label">Weight</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={weight}
              name="radio-buttons-group"
              onChange={(e) => setWeight(e.target.value)}
            >
              <FormControlLabel
                value="1.5"
                control={<Radio />}
                label="1.5 kg"
              />
              <FormControlLabel value="2" control={<Radio />} label="2 kg" />
              <FormControlLabel
                value="2.5"
                control={<Radio />}
                label="2.5 kg"
              />
              <FormControlLabel value="3" control={<Radio />} label="3 kg" />
              <FormControlLabel
                value="3.5"
                control={<Radio />}
                label="3.5 kg"
              />
            </RadioGroup>
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
          <div className="row">
            <FormControl>
              <InputLabel>Insription on the Cake</InputLabel>
              <Input
                id="weight"
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
              />

              <button onClick={handleNext} className="primary-btn form-btn">
                Save
              </button>
            </FormControl>
          </div>
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
                disabled={isLoading}
              >
                Generate Image
              </button>
            </FormControl>

            {isLoading && (
              <div className="d-flex justify-content-center gap-3">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

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
                        onClick={() => onGeneratedImageClick(imageUrl)}
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
          <div className="row">
            <FormControl>
                <TextField
                  id="outlined-controlled"
                  label="Order comments"
                  value={orderComment}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setOrderComment(event.target.value);
                  }}
                />
               <TextField
                  id="outlined-controlled"
                  label="First Name"
                  value={firstName}
                  sx={{ marginTop: 2 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFirstName(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-controlled"
                  label="Last Name"
                  value={lastName}
                  sx={{ marginTop: 2 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLastName(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-controlled"
                  label="Location"
                  value={locality}
                  sx={{ marginTop: 2 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setLocality(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-controlled"
                  label="Address"
                  value={address}
                  sx={{ marginTop: 2 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-controlled"
                  label="Phone number"
                  value={phoneNumber}
                  sx={{ marginTop: 2 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
                <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                  <InputLabel id="demo-simple-select-label">Delivery Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deliveryType}
                    label="Delivery Type"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDeliveryType(event.target.value);
                    }}
                  >
                    <MenuItem value={0}>Pickup</MenuItem>
                    <MenuItem value={1}>Courier Delivery</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Controlled picker"
                    value={deliveryDate}
                    onChange={(newValue) => setDeliveryDate(newValue)}
                  />
                </LocalizationProvider>
            </FormControl>
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
            <div className="d-flex h-100 flex-column justify-content-between gap-4 gap-lg-5">
              <div>
                <h5>Total Price: {totalPrice} MDL</h5>
                <ul className="ms-auto">
                  {cakeShape && <li>Shape: {cakeShape}</li>}
                  {filling && <li>Filling: {filling.title}</li>}
                  {coating && <li>Coating: {coating.title}</li>}
                  {weight && <li>Weight: {weight} kg</li>}
                  {decor && <li>Decor: {decor.title}</li>}
                  {inscription && <li>Inscription: {inscription}</li>}
                  {generatedImage && (
                    <li>
                      <Image
                        src={generatedImage}
                        alt="selected image"
                        width={50}
                        height={50}
                      />
                    </li>
                  )}

                  {orderComment && <li> Comment: {orderComment}</li>}
                </ul>
              </div>

              {activeStep === 7 && (
                <button
                  className="primary-btn form-btn"
                  onClick={async () => await postCake(postOrderModel)}
                >
                  Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleOrderForm: (data) => dispatch(actions.showOrderForm(data)),
  };
};

export default connect(null, mapDispatchToProps)(Page);
