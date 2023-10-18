import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import "./App.css";
import { Helmet } from "react-helmet";

import { colors } from "./settings/theme.js";
const swiperData = require("./resources/swiper_data.json");

function App() {
  let scrollRef = useRef(null);
  let menuIconRef = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([]);

  /** setting data */
  useEffect(() => {
    setData(swiperData);
  }, []);

  /**
   * @method handleStepChange
   * @description Updating state on scroll
   * @param step Updated step
   */
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  /**
   * @method getBarClassName
   * @description to get class for bar
   */
  const getBarClassName = () => {
    return activeStep === 0 ? "bar" : `bar expand`;
  };

  /**
   * @method getIconClassName
   * @description to get class for icon
   * @param index index of icon
   */
  const getIconClassName = (index) => {
    return activeStep === 0 ? "icon" : index < 6 ? `icon icon${index}` : "";
  };

  /**
   * @method slideNextPrev
   * @description to slide icons next or prev
   * @param shift slide amount in pixels
   */
  const slideNextPrev = (shift) => {
    scrollRef.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  /**
   * @method scrollCheck
   * @description to update scroll position
   */
  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft);
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const renderMenuItems = () => {
    return (
      <div className={getBarClassName()}>
        <Box
          sx={[
            styles.prevArrrow,
            {
              opacity: activeStep == 0 ? 0 : 1,
            },
          ]}
        >
          {scrollX !== 0 && data && data.length > 6 && (
            <Box
              component="img"
              alt="Icon"
              sx={styles.caretLeft}
              src={require(`./assets/images/caret_left.png`)}
              onClick={() => {
                slideNextPrev(
                  -menuIconRef.current.getBoundingClientRect().width
                );
              }}
            />
          )}
        </Box>
        <div
          ref={scrollRef}
          onScroll={scrollCheck}
          className="menu-bar"
          style={styles.menuBar}
        >
          {data.map((data, index) =>
            index != 0 ? (
              <Box
                key={index}
                ref={menuIconRef}
                className={getIconClassName(index)}
                sx={[
                  styles.menuIconContainer,
                  {
                    backgroundColor:
                      activeStep == index ? colors.white80 : "transparent",
                    borderLeft:
                      activeStep == index
                        ? `1px solid ${colors.lightGrey}`
                        : null,
                    borderRight:
                      activeStep == index
                        ? `1px solid ${colors.lightGrey}`
                        : null,
                  },
                ]}
              >
                <Box
                  component="img"
                  alt="Icon"
                  sx={styles.itemIcon}
                  src={require(`./assets/images/${data?.itemIcon}`)}
                  onClick={() => {
                    handleStepChange(index);
                  }}
                />
              </Box>
            ) : null
          )}
        </div>
        <Box sx={[styles.nextArrow, { opacity: activeStep == 0 ? 0 : 1 }]}>
          {!scrolEnd && data && data.length > 6 && (
            <Box
              component="img"
              alt="Right Icon"
              sx={styles.caretLeft}
              src={require(`./assets/images/caret_right.png`)}
              onClick={() => {
                slideNextPrev(
                  menuIconRef.current.getBoundingClientRect().width
                );
              }}
            />
          )}
        </Box>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      {data && data.length > 0 ? (
        <>
          <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
            {data.map((data, index) => (
              <Box
                key={index}
                className="root"
                sx={[
                  styles.container,
                  {
                    background: data?.backgroundColor ?? colors.lavender,
                  },
                ]}
              >
                {index == 0 ? (
                  <Box sx={styles.introContainer}>
                    <Box sx={styles.introTitleContainer}>
                      <Typography sx={[styles.introTitle]}>{"YOUR"}</Typography>
                      <Typography sx={[styles.introTitle]}>
                        {"BACKPACK"}
                      </Typography>
                      <Box
                        component="img"
                        alt="Logo"
                        sx={styles.introLogo}
                        src={require(`./assets/images/${data?.logoName}`)}
                      />
                    </Box>
                    <Box
                      component="img"
                      alt="Image"
                      sx={styles.introImage}
                      src={require(`./assets/images/${data?.imageName}`)}
                    />
                    <Box sx={styles.introButtonContainer}>
                      <Typography sx={styles.introButtonTitle}>
                        {data?.button?.title ?? ""}
                      </Typography>
                      <Box
                        component="img"
                        sx={styles.rightArrow}
                        alt="RightArrow"
                        src={require(`./assets/images/right_arrow.png`)}
                      />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ height: "100vh" }}>
                      <Box sx={{ height: "84vh" }}>
                        <Box sx={[styles.subcontainerWithMenu]}>
                          <Box
                            component="img"
                            alt="Logo"
                            sx={styles.logo}
                            src={require(`./assets/images/${data?.logoName}`)}
                          />
                          <Box sx={styles.titleContainer}>
                            <Typography
                              sx={[
                                styles.title,
                                {
                                  color: data?.title?.color ?? colors.black,
                                },
                              ]}
                            >
                              {data?.title?.text ?? ""}
                            </Typography>
                          </Box>
                          <Box sx={styles.subtitleConttainer}>
                            <Typography
                              sx={[
                                styles.subtitle,
                                {
                                  color: data?.subTitle?.color ?? colors.black,
                                },
                              ]}
                            >
                              {data?.subTitle?.text ?? ""}
                            </Typography>
                          </Box>
                          <Box
                            component="img"
                            alt="Image"
                            sx={[styles.image]}
                            src={require(`./assets/images/${data?.imageName}`)}
                          />
                          <Button
                            sx={[
                              styles.button,
                              {
                                backgroundColor:
                                  data?.button?.backgroundColor ?? colors.black,
                                color: data?.button?.titleColor ?? colors.black,
                                ":hover": {
                                  backgroundColor:
                                    data?.button?.backgroundColor ??
                                    colors.black,
                                  color:
                                    data?.button?.titleColor ?? colors.black,
                                },
                              },
                            ]}
                          >
                            {data?.button?.title ?? ""}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </SwipeableViews>
          {renderMenuItems()}
        </>
      ) : (
        renderLoader()
      )}
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    overflow: "auto",
  },
  subcontainerWithMenu: {
    pt: "9.5vh",
    pl: "4vw",
    pr: "4vw",
    pb: "5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    textAlign: "center",
    mt: "1.9vh",
    pl: "3vw",
    pr: "3vw",
  },
  title: {
    fontSize: "3.8vh",
    fontWeight: "600",
    fontFamily: "Roboto Regular",
    lineHeight: "4.5vh",
  },
  subtitleConttainer: {
    display: "flex",
    textAlign: "center",
    mt: "1vh",
    pl: "3vw",
    pr: "3vw",
  },
  subtitle: {
    fontSize: "1.9vh",
    fontWeight: "400",
    fontFamily: "Roboto Regular",
    lineHeight: "2.9vh",
  },
  image: {
    mt: "3.8vh",
    height: "32vh",
    width: "90vw",
    objectFit: "contain",
  },

  button: {
    mt: "3.8vh",
    pt: "1.9vh",
    pb: "1.9vh",
    minWidth: "60vw",
    borderRadius: "4.8vh",
    fontSize: "2vh",
    fontWeight: "700",
    lineHeight: "2.9vh",
    fontFamily: "Roboto Bold",
    letterSpacing: "0.2vh",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ml: "24px",
    mr: "24px",
  },
  introTitleContainer: { display: "flex", flexDirection: "column" },
  introTitle: {
    fontSize: "5.7vh",
    fontWeight: "900",
    fontFamily: "Roboto Black",
    lineHeight: "5.3vh",
    color: colors.black,
  },
  introLogo: {
    height: "3.8vh",
    width: "auto",
    objectFit: "contain",
    alignSelf: "end",
  },
  introImage: {
    mt: "3.8vh",
    height: "44vh",
    width: "auto",
    objectFit: "contain",
  },
  introButtonContainer: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    mt: "6.1vh",
  },
  introButtonTitle: {
    fontSize: "2vh",
    color: colors.black,
    fontWeight: "700",
    fontFamily: "Roboto Bold",
    mr: "2vw",
    lineHeight: "2.99vh",
    letterSpacing: "0.2vh",
  },
  rightArrow: {
    width: "1.2vh",
    height: "1vh",
  },
  logo: {
    height: "4.3vh",
    width: "90vw",
    objectFit: "contain",
  },
  caretLeft: {
    width: "3vh",
    height: "3vh",
  },
  itemIcon: {
    width: "4vh",
    height: "4vh",
  },
};

export default App;
