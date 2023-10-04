import logo from "./logo.svg";
import "./App.css";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { red } from "@mui/material/colors";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import PedalBikeIcon from "@mui/icons-material/PedalBike";


const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//     style={{backgroundColor:'red', flexGrow:1, height:'100%' }}
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}

//     >
//       {value === index && (
//         <Box sx={{ p: 3, color: red, backgroundColor:red }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

const images = [
  {
    label: "Score extras for school & life",
    subTitle:
      "Get free perks from DoorDash, Calm and Prezi with your Chegg study subscription",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    color: "pink",
  },
  {
    label: "Bird",
    subTitle:
      "Get free perks from DoorDash, Calm and Prezi with your Chegg study subscription",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    color: "grey",
  },
  {
    label: "Bali, Indonesia",
    subTitle:
      "Get free perks from DoorDash, Calm and Prezi with your Chegg study subscription",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    color: "azure",
  },
  {
    label: "Goč, Serbia",
    subTitle:
      "Get free perks from DoorDash, Calm and Prezi with your Chegg study subscription",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    color: "floralwhite",
  },
];

function App() {
  let roomData = [
    { name: "Advisory Board", id: 1, type: 0 },
    { name: "Audit", id: 2, type: 1 },
    { name: "Communication", id: 3, type: 1 },
    { name: "Digital", id: 4, type: 1 },
    { name: "Finance", id: 5, type: 1 },
    { name: "Financial Expert", id: 6, type: 1 },
    { name: "Human Ressources", id: 7, type: 1 },
    { name: "IT", id: 8, type: 1 },
    { name: "Legal", id: 9, type: 1 },
    { name: "Marketing", id: 10, type: 1 },
    { name: "Operations", id: 11, type: 1 },
    { name: "Relationship Management", id: 12, type: 1 },
    { name: "Representation of Employees", id: 13, type: 1 },
    { name: "Risk & Compliance", id: 14, type: 1 },
    { name: "Sustainability", id: 15, type: 1 },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    console.log(step);
    setActiveStep(step);
  };

  const _checkActiveBtn = () => {
    return activeStep === 0 ? "menu-bar" : "menu-bar expand";
  };

  const _checkIconThirdClass = () => {
    return activeStep === 0 ? "icon" : "icon third";
  };


  const _checkIconSecondClass = () => {
    return activeStep === 0 ? "icon" : "icon second";
  };
  const _checkIconFirstClass = (index) => {
    return activeStep === 0 ? "icon" : `icon icon${index}`;
  };

  const _checkABagClass = () => {
    return activeStep ===  0 ? "bag" : "bag small";
  };

  React.useEffect(() => {
    if(activeStep !== 1) {

    } else {

    }
  }, [activeStep]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: "red", height: "100vh" }}
    >
          {/* <FadeIn>
        <div>Element 1</div>
        <div>Element 2</div>
        <div>Element 3</div>
        <div>Element 4</div>
        <div>Element 5</div>
        <div>Element 6</div>
      </FadeIn>
      <div className="basket">
        <button className="basketBtn">{"Close"}</button>
        <div>kndf</div>

      </div> */}
      <Box component="img" className={_checkABagClass()} src={'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'}></Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  backgroundColor: step.color,
                  pl: 5,
                  pr: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignSelf: "center",
                  justifySelf: "center",
                  height: "100vh",
                }}
              >
                <Typography variant="h5">{step.label}</Typography>

                <Typography variant="h6" sx={{ pt: 5 }}>
                  {step.subTitle}
                </Typography>
                <Box
                  mt={3}
                  position="absolute"
                  bottom="0px"
                  sx={{ width: "50%", backgroundColor: "red" }}
                >
                  <Stepper
                    nonLinear
                    activeStep={activeStep}
                    connector={false}
                  ></Stepper>
                </Box>
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
  
      
        <div className={_checkActiveBtn()} >
        {images.map((step, index) => (
          <Box className={_checkIconFirstClass(index)} onClick={() => handleStepChange(index)}></Box>
          ))}
          {/* <div className={_checkIconSecondClass()}></div>
          <div className={_checkIconThirdClass()}></div>
          
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon"></div> */}
        </div>

        <Stepper nonLinear activeStep={activeStep} connector={false} >
        {images.map((step, index) => (
          <Step key={step.label}>
            
            <StepButton
            icon={<PedalBikeIcon />}
            onClick={() => handleStepChange(index)}
          />

     <StepButton
            icon={<PedalBikeIcon />}
            onClick={() => handleStepChange(index)}
          />

          </Step>
        ))}
      </Stepper>
    

      {/* <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
         
              <Box
              sx={{
                height: 400,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: '100%',
                backgroundColor:red,
              }}
            >
              <Typography>jdskfm</Typography>
            </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <Stepper nonLinear activeStep={activeStep} connector={false} >
        {images.map((step, index) => (
          <Step key={step.label}>
            
            <StepButton
            icon={<PedalBikeIcon />}
            onClick={() => handleStepChange(index)}
          />

     <StepButton
            icon={<PedalBikeIcon />}
            onClick={() => handleStepChange(index)}
          />

          </Step>
        ))}
      </Stepper>
    </Box> */}
    </Container>
  );
}

export default App;
