import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import "./App.css";
import { Helmet } from "react-helmet";
import ReactPlayer from "react-player";
import zeemeeVideo from "./assets/videos/zeemee_intro_video.mp4";

import { colors } from "./settings/theme.js";
const swiperData = require("./resources/swiper_data.json");

function App() {
  let backpackViewedCount = window?.BridgeApi?.getStoredInteger(
    "backpack_viewed_count"
  );
  let scrollRef = useRef(null);
  let menuIconRef = useRef(null);

  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([]);
  const [showProductData, setShowProductData] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);

  /** setting data */
  useEffect(() => {
    setData(swiperData);
  }, []);

  /** setting images width height data */
  useEffect(() => {
    {
      swiperData.map((item, index) => {
        const img = new Image();
        img.src = require(`./assets/images/${item?.logoName}`);
        img.onload = () => {
          swiperData[index].logoWidth = img.width;
          swiperData[index].logoHeight = img.height;
        };
        setData([...swiperData]);
      });
    }
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

  /**
   * @method onCTAClick
   * @description It will call a native method to open url in browser
   *  @param url url to open on button click
   */
  const onCTAClick = (url) => {
    if (url) {
      window?.BridgeApi?.openBrowser(url);
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
                        : `1px solid transparent`,
                    borderRight:
                      activeStep == index
                        ? `1px solid ${colors.lightGrey}`
                        : `1px solid transparent`,
                    transition: "background-color 1s",
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
      {!showProductData ? (
        <>
          {showSpinner && renderLoader()}
          <ReactPlayer
            url={zeemeeVideo}
            playsinline
            className="react-player"
            playing={true}
            muted
            width={"100vw"}
            height={"100vh"}
            controls={false}
            style={{ resizeMode: "cover", objectFit: "cover" }}
            onEnded={() => {
              setShowProductData(true);
            }}
            onPlay={() => {
              console.log(showSpinner, "onPlay");
              setShowSpinner(false);
            }}
            onBuffer={() => {
              console.log(showSpinner, "onBuffer");
              setShowSpinner(true);
            }}
          ></ReactPlayer>
        </>
      ) : data && data.length > 0 ? (
        <>
          <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
            {data.map((data, index) => (
              <Box
                key={index}
                className="root"
                sx={[
                  styles.container,
                  {
                    // background: data?.backgroundColor ?? colors.lavender,
                    backgroundImage: data?.backgroundColor
                      ? `radial-gradient(circle at center, ${data?.backgroundColor} 5% ,${data?.backgroundColor} 50%)` //#f1e3c4, #F5D38C
                      : `radial-gradient(circle at center, ${data?.backgroundColor} 5% , ${colors.lavender} 50%)`,
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
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component="img"
                        alt="Image"
                        aria-disabled
                        sx={styles.introImage}
                        src={require(`./assets/images/${data?.imageName}`)}
                      />
                    </div>
                    <Box sx={styles.introButtonContainer}>
                      <Box className="button button-anim">
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
                  </Box>
                ) : (
                  <>
                    <Box sx={{ height: "100vh" }}>
                      <Box sx={{ height: "84vh" }}>
                        <Box sx={[styles.subcontainerWithMenu]}>
                          <Box
                            component="img"
                            alt="Logo"
                            sx={[
                              styles.logo,
                              {
                                height:
                                  data?.logoWidth && data.logoWidth > 0
                                    ? data?.logoWidth / data.logoHeight > 2
                                      ? "6vh"
                                      : "10vh"
                                    : "7vh",
                              },
                            ]}
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
                          <div
                            style={{
                              position: "fixed",
                              top: 0,
                              height: "100vh",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              component="img"
                              alt="Image"
                              sx={[styles.image]}
                              src={require(`./assets/images/${data?.imageName}`)}
                            />
                          </div>
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
                            onClick={() => {
                              onCTAClick(data?.button?.url);
                            }}
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
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    overflow: "auto",
  },
  subcontainerWithMenu: {
    pt: "7vh", //9.5
    pl: "4vw",
    pr: "4vw",
    pb: "5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    height: "7vh", //4.3
    width: "90vw",
    objectFit: "contain",
  },
  titleContainer: {
    display: "flex",
    textAlign: "center",
    mt: "1.9vh",
    pl: "3vw",
    pr: "3vw",
  },
  title: {
    fontSize: "4.02vh",
    fontWeight: "600",
    fontFamily: "Roboto Regular",
    lineHeight: "4.7vh",
    letterSpacing: "inherit",
  },
  subtitleConttainer: {
    display: "flex",
    textAlign: "center",
    mt: "1vh",
    pl: "3vw",
    pr: "3vw",
  },
  subtitle: {
    fontSize: "2.36vh",
    fontWeight: "400",
    fontFamily: "Roboto Regular",
    lineHeight: "3.31vh",
    letterSpacing: "inherit",
  },
  image: {
    height: "32vh",
    width: "90vw",
    objectFit: "contain",
  },

  button: {
    // mt: "3.8vh",
    position: "fixed",
    bottom: "16vh",
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
    minWidth: "13.5vw",
    width: "13.5vw",
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
    // justifyContent: "center",
    ml: "24px",
    mr: "24px",
  },
  introTitleContainer: { pt: "7vh", display: "flex", flexDirection: "column" },
  introTitle: {
    fontSize: "6.5vh",
    fontWeight: "900",
    fontFamily: "Roboto Black",
    lineHeight: "6.0vh",
    color: colors.black,
  },
  introLogo: {
    height: "4.3vh",
    width: "auto",
    objectFit: "contain",
    alignSelf: "end",
  },
  introImage: {
    // mt: "3.8vh",
    height: "44vh",
    width: "auto",
    objectFit: "contain",
  },
  introButtonContainer: {
    position: "fixed",
    bottom: "5.7vh", //7.6
    // display: "flex",
    // flexDirection: "row",
    // textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center",
    // pt: "1.9vh",
    // pb: "1.9vh",
    // minWidth: "60vw",
    // borderRadius: "4.8vh",
    // backgroundColor: colors.black,
  },
  introButtonTitle: {
    fontSize: "2vh",
    color: colors.black,
    fontWeight: "700",
    fontFamily: "Roboto Bold",
    mr: "2vw",
    lineHeight: "2.9vh",
    letterSpacing: "0.2vh",
  },
  rightArrow: {
    width: "2.2vh",
    height: "2vh",
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
