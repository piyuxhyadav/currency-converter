"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";
import { IoIosSwap } from "react-icons/io";
import { useMediaQuery } from "@mui/material";
import InputControl from "./components/InputControl";
import HomeLoader from "./components/HomeLoader";
import Navbar from "./components/Navbar";
import axios from "axios";
import Graphs from "./components/Graphs";


const BASE_URL = `http://data.fixer.io/api/latest?access_key=${YOUR_API_KEY}`

const page = () => {
  const isSmallScreen = useMediaQuery("(max-width: 660px)");

  const [initLoader, setInitLoader] = useState(true);

  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState();

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL)
      .then((response) => {
        setRates(response.data.rates);
        console.log(response.data.rates);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setInitLoader(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // To load initial/default set conversion.
  useEffect(() => {
    if (!!rates) {
      function init() {
        handleFromAmountChange(1);
      }
      init();
    }
  }, [rates]);

  const handleFromAmountChange = (fromAmount) => {
    const value = (
      (fromAmount * rates[toCurrency]) /
      rates[fromCurrency]
    ).toFixed(3);
    setToAmount(value.toLocaleString());
    setFromAmount(fromAmount);
  };

  const handleToAmountChange = (toAmount) => {
    const value = (
      (toAmount * rates[fromCurrency]) /
      rates[toCurrency]
    ).toFixed(3);
    setFromAmount(value.toLocaleString());
    setToAmount(toAmount);
  };

  const handleFromCurrencyChange = (selectedCurrency) => {
    if (selectedCurrency === toCurrency) {
      return alert("You can't convert the same currency!");
    }
    const value = (
      (fromAmount * rates[toCurrency]) /
      rates[selectedCurrency]
    ).toFixed(3);
    setToAmount(value.toLocaleString());
    setFromCurrency(selectedCurrency);
  };

  const handleToCurrencyChange = (selectedCurrency) => {
    if (selectedCurrency === fromCurrency) {
      return alert("You can't convert the same currency!");
    }
    const value = (
      (toAmount * rates[fromCurrency]) /
      rates[selectedCurrency]
    ).toFixed(3);
    setFromAmount(value.toLocaleString());
    setToCurrency(selectedCurrency);
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if(initLoader){
    return(
      <HomeLoader/>
    )
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputControl
            label="From"
            amount={fromAmount}
            currencies={Object.keys(rates)}
            currency={fromCurrency}
            handleAmountChange={handleFromAmountChange}
            handleCurrencyChange={handleFromCurrencyChange}
            isSmallScreen={isSmallScreen}
          />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin={isSmallScreen?"10px 0px":"0px"}
          >
            <Button
              sx={{
                padding: "15px 15px",
                borderRadius: "50%",
                transform: isSmallScreen ? "rotate(90deg)" : "none",
              }}
              onClick={handleSwapCurrencies}
            >
              <IoIosSwap size={40} />
            </Button>
            <Typography
              sx={{
                background: "#F0F8FF",
                padding: "5px",
                fontFamily: "Source Sans Pro",
                color: "darkblue",
                fontSize: "13px",
              }}
            >
              1 {fromCurrency}:{" "}
              {(rates[toCurrency] / rates[fromCurrency]).toFixed(2)}{" "}
              {toCurrency}
            </Typography>
          </Box>

          <InputControl
            label="To"
            amount={toAmount}
            currencies={Object.keys(rates)}
            currency={toCurrency}
            handleAmountChange={handleToAmountChange}
            handleCurrencyChange={handleToCurrencyChange}
            isSmallScreen={isSmallScreen}
          />
        </Box>
        <Button variant="contained" onClick={scrollBottom} sx={{ marginTop: "2rem" }}>
          Click Me!
        </Button>
      </Box>
      <Grid>
      <Graphs toCurrency={toCurrency} fromCurrency={fromCurrency}/>
      </Grid>
    </>
  );
};

export default page;
