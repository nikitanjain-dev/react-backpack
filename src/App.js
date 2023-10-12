import React, { useRef, useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import "./App.css";
import { colors } from "./settings/theme.js";
import { SWIPER_DATA } from "./settings/constant.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

import right_arrow from "./assets/images/right_arrow.png";

function App() {
  let scrl = useRef(null);
  let iconRef = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const calculateBarHeight = () => {
    return activeStep === 0 ? "bar" : `bar expand`;
  };

  const _checkIconFirstClass = (index) => {
    return activeStep === 0 ? "icon" : index < 6 ? `icon icon${index}` : "";
  };

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

  const scrollCheck = () => {
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
            className="root"
            sx={[
              styles.container,
              {
                background: data.color,
              },
            ]}
          >
            {index == 0 ? (
              <Box sx={styles.introContainer}>
                <Box sx={styles.introTitleContainer}>
                  <Typography
                    sx={[
                      styles.introTitle,
                      { color: data.darkTheme ? colors.white : colors.black },
                    ]}
                  >
                    {"YOUR BACKPACK"}
                  </Typography>
                  <Box
                    component="img"
                    alt="Logo"
                    sx={styles.introLogo}
                    src={require(`./assets/images/${data?.logoName}`)}
                  />
                  <Box
                    component="img"
                    alt="Image"
                    sx={styles.image}
                    src={require(`./assets/images/${data?.imgName}`)}
                  />
                  <Box sx={styles.introButtonContainer}>
                    <Typography sx={styles.introButtonTitle}>
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
              <Box sx={[styles.subcontainerWithMenu]}>
                <Box
                  component="img"
                  alt="Logo"
                  src={require(`./assets/images/${data?.logoName}`)}
                />
                <Box sx={styles.titleContainer}>
                  <Typography
                    sx={[
                      styles.title,
                      { color: data.darkTheme ? colors.white : colors.black },
                    ]}
                  >
                    {data?.title}
                  </Typography>
                </Box>
                <Box sx={styles.subtitleConttainer}>
                  <Typography
                    sx={[
                      styles.subtitle,
                      {
                        color: data.darkTheme ? colors.white : colors.black,
                      },
                    ]}
                  >
                    {data?.subTitle}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  alt="Image"
                  sx={[styles.image]}
                  src={require(`./assets/images/${data?.imgName}`)}
                />
                <Button
                  sx={[
                    styles.button,
                    {
                      backgroundColor: data.darkTheme
                        ? colors.white
                        : colors.black,
                      color: data.darkTheme ? colors.black : colors.white,
                      ":hover": {
                        backgroundColor: data.darkTheme
                          ? colors.white
                          : colors.black,
                        color: data.darkTheme ? colors.black : colors.white,
                      },
                    },
                  ]}
                  // variant="outlined"
                >
                  {data?.buttonTitle}
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </SwipeableViews>

      <div className={calculateBarHeight()}>
        <Box
          sx={[
            styles.prevArrrow,
            {
              opacity: activeStep == 0 ? 0 : 1,
            },
          ]}
        >
          {scrollX !== 0 && (
            <Box
              component="img"
              alt="Icon"
              src={require(`./assets/images/caret_left.png`)}
              onClick={() => {
                slide(-iconRef.current.getBoundingClientRect().width);
              }}
            />
          )}
        </Box>
        <div
          ref={scrl}
          onScroll={scrollCheck}
          className="menu-bar"
          style={styles.menuBar}
        >
          {SWIPER_DATA.map((data, index) =>
            index != 0 ? (
              <Box
                ref={iconRef}
                className={_checkIconFirstClass(index)}
                sx={[
                  styles.menuIconContainer,
                  {
                    backgroundColor:
                      activeStep == index ? colors.white80 : "transparent",
                    border:
                      activeStep == index
                        ? `1px solid ${colors.lightGrey}`
                        : null,
                  },
                ]}
              >
                <Box
                  component="img"
                  alt="Icon"
                  sx={{ width: "32px", height: "32px" }}
                  src={require(`./assets/images/${data?.iconName}`)}
                  onClick={() => {
                    handleStepChange(index);
                  }}
                />
              </Box>
            ) : null
          )}
        </div>
        <Box sx={[styles.nextArrow, { opacity: activeStep == 0 ? 0 : 1 }]}>
          {!scrolEnd && (
            <Box
              component="img"
              alt="Icon"
              src={require(`./assets/images/caret_right.png`)}
              onClick={() => {
                slide(iconRef.current.getBoundingClientRect().width);
              }}
            />
          )}
        </Box>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    overflow: "auto",
  },
  subcontainerWithMenu: {
    // height: "100%",
    // minHeight: "100%",
    // backgroundColor: "red",
    // overflow: "auto",
    pt: "10vh",
    // pl: "10vw",
    // pr: "10vw",
    // pt: "80px",
    pl: "24px",
    pr: "24px",
    pb: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    textAlign: "center",
    mt: "3vh",
    pl: "8px",
    pr: "8px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    fontFamily: "Roboto Regular",
    lineHeight: "38px",
  },
  subtitleConttainer: {
    display: "flex",
    textAlign: "center",
    // mt: "16px",
    mt: "1vh",
    pl: "8px",
    pr: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Roboto Regular",
    lineHeight: "24px",
  },
  image: { mt: "3vh", pl: "16px", pr: "16px" },
  // image: { mt: "32px" },
  button: {
    mt: "3vh",
    // mt: "32px",
    pt: "16px",
    pb: "16px",
    minWidth: "60vw",
    borderRadius: "40px",
    fontSize: "17px",
    fontWeight: "700",
    lineHeight: "24px",
    fontFamily: "Roboto Regular",
    letterSpacing: "1.7px",
  },
  prevArrrow: {
    width: "7vw",
    display: "flex",
    alignItems: "center",
  },
  menuBar: {
    width: "70vw",
    display: "flex",
    overflowX: "auto",
  },
  menuIconContainer: {
    minWidth: "14vw",
    width: "14vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nextArrow: {
    width: "7vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  introContainer: {
    height: "100%",
    pt: "80px",
    pl: "24px",
    pr: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  introTitleContainer: {
    mt: "16px",
    display: "flex",
    flexDirection: "column",
    width: "247px",
  },
  introTitle: {
    fontSize: "48px",
    fontWeight: "900",
    fontFamily: "Roboto Regular",
    lineHeight: "44px",
  },
  introLogo: { width: "152px", alignSelf: "end" },
  introButtonContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    mt: "52px",
  },
  introButtonTitle: {
    fontSize: "17px",
    color: colors.black,
    fontWeight: "700",
    fontFamily: "Roboto Regular",
    mr: "8px",
  },
};

export default App;
