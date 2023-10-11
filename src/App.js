import React, { useRef, useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import "./App.css";
import { colors } from "./settings/theme.js";
import { SWIPER_DATA } from "./settings/constant.js";
import myData from "./fruits.json";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

import right_arrow from "./assets/images/right_arrow.png";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
  },
};

function App() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const _checkActiveBtn = () => {
    return activeStep === 0 ? "menu-bar" : "menu-bar expand";
  };

  const checkClassName = () => {
    return activeStep === 0 ? "menu" : "menu expand";
  };

  const _checkIconFirstClass = (index) => {
    return activeStep === 0 ? "icon" : `icon icon${index}`;
  };

  const checkParenttClass = () => {
    return activeStep === 0 ? "parent" : "parent expand";
  };

  const checkChildClass = () => {
    return activeStep === 0 ? "child" : `child expand`;
  };

  const calculateBarHeight = () => {
    return activeStep === 0 ? "bar" : `bar expand`;
  };
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  // const anim = (e) => {
  //   gsap.from(e.target, { scale: 1 });
  //   gsap.to(e.target, { scale: 1.5 });
  // };
  // const anim2 = (e) => {
  //   gsap.from(e.target, { scale: 1.5 });
  //   gsap.to(e.target, { scale: 1 });
  // };

  const scrollCheck = () => {
    console.log(scrl.current.scrollLeft, scrl.current.scrollWidth);
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (
    <>
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {SWIPER_DATA.map((data, index) => (
          <Box
            sx={[
              styles.container,
              {
                background: data.color,
              },
            ]}
          >
            {index == 0 ? (
              <Box
                sx={{
                  height: "100%",
                  pt: "80px",
                  pl: "24px",
                  pr: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mt: "16px",
                    display: "flex",
                    flexDirection: "column",
                    width: "247px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "48px",
                      color: data.darkTheme ? colors.white : colors.black,
                      fontWeight: "900",
                      fontFamily: "Roboto Regular",
                      lineHeight: "44px",
                      // alignSelf: "center",
                      // placeSelf: "center",
                      // justifySelf: "center",
                    }}
                  >
                    {"YOUR BACKPACK"}
                  </Typography>
                  <Box
                    component="img"
                    alt="Logo"
                    sx={{ width: "152px", alignSelf: "end" }}
                    src={require(`./assets/images/${data?.logoName}`)}
                  />
                  <Box
                    component="img"
                    alt="Image"
                    sx={{ mt: "32px" }}
                    src={require(`./assets/images/${data?.imgName}`)}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: "52px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "17px",
                        color: colors.black,
                        fontWeight: "700",
                        fontFamily: "Roboto Regular",
                        mr: "8px",
                      }}
                    >
                      {data?.buttonTitle}
                    </Typography>
                    <Box
                      component="img"
                      alt="Logo"
                      src={require(`./assets/images/right_arrow.png`)}
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                  pt: "80px",
                  pl: "24px",
                  pr: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  alt="Logo"
                  src={require(`./assets/images/${data?.logoName}`)}
                />
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    mt: "16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "32px",
                      color: data.darkTheme ? colors.white : colors.black,
                      fontWeight: "600",
                      fontFamily: "Roboto Regular",
                    }}
                  >
                    {data?.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    mt: "16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: data.darkTheme ? colors.white : colors.black,
                      fontWeight: "400",
                      fontFamily: "Roboto Regular",
                    }}
                  >
                    {data?.subTitle}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  alt="Image"
                  sx={{ mt: "32px" }}
                  src={require(`./assets/images/${data?.imgName}`)}
                />
                <Button
                  sx={{
                    mt: "32px",
                    backgroundColor: data.darkTheme
                      ? colors.white
                      : colors.black,
                    pt: "16px",
                    pb: "16px",
                    width: "228px",
                    borderRadius: "40px",
                    color: data.darkTheme ? colors.black : colors.white,
                    fontSize: "17px",
                    fontWeight: "700",
                    fontFamily: "Roboto Regular",
                  }}
                  variant="outlined"
                >
                  {data?.buttonTitle}
                </Button>
              </Box>
            )}

            <Box>kdjns</Box>
          </Box>
        ))}
      </SwipeableViews>

      <div className={calculateBarHeight()}>
        <div
          style={{
            width: "7vw",
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            opacity: activeStep == 0 ? 0 : 1,
          }}
        >
          {scrollX !== 0 && (
            <IconButton name="details" onClick={() => slide(-60)}>
              <ArrowBackIosIcon />
            </IconButton>
          )}
        </div>

        <div
          ref={scrl}
          onScroll={scrollCheck}
          className="menu-bar"
          style={{
            width: "70vw",

            display: "flex",
            overflowX: "auto",
          }}
        >
          {SWIPER_DATA.map((data, index) =>
            index != 0 ? (
              <div
                style={{
                  minWidth: "14vw",
                  width: "14vw",
                  backgroundColor:
                    activeStep == index ? colors.white80 : "transparent",
                  border:
                    activeStep == index
                      ? `1px solid ${colors.lightGrey}`
                      : null,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => {
                    handleStepChange(index);
                    console.log("hello");
                  }}
                >
                  <Box
                    component="img"
                    alt="Logo"
                    src={require(`./assets/images/${data?.iconName}`)}
                  />
                </Button>
              </div>
            ) : null
          )}
        </div>
        <div
          style={{
            width: "7vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: activeStep == 0 ? 0 : 1,
          }}
        >
          {!scrolEnd && (
            <IconButton name="details" onClick={() => slide(60)}>
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
