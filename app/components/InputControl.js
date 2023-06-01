"use client";

import FormControl from "@mui/material/FormControl";
import { Box, ListItem, TextField} from "@mui/material";
import {Select,makeStyles} from '@material-ui/core'
import  CurrencyFlag  from "react-currency-flags";

const useStyles = makeStyles({
  input: {
    fontWeight:"bold",
    width:'40%',
    '& input[type=number]': {
        '-moz-appearance': 'textfield',
        outline:'none',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
    }
  },
  selectRoot: {
    background:'#eff4fe',
    padding:'5px',
    borderRadius:'10px',
    textAlign:'center',
    color:'#1e5ef3',
    fontWeight:'500',
    "&:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-select": {
      height: "20px",
    },
    "& .MuiSelect-menu": {
      height:'100px',
      marginTop: "58px", 
      borderRadius: "5px", 
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiSelect-icon": {
      display: "none",
    },
    "& .MuiInput-root":{
      width:'80px',
    },
    "& .MuiInput-input":{
      width:'100%',
     display:'grid',
     gridTemplateColumns:'1fr 1fr',
     placeItems:"center"
    },
  },
})

const InputControl = (props) => {
  const{label, amount, currencies, currency, handleAmountChange, handleCurrencyChange, isSmallScreen} = props;
  const classes = useStyles();

  return (
    <Box
        sx={{
          margin: "0px 15px",
          minWidth: "33vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isSmallScreen ? "50px 25px" :"35px 25px",
          border: "1px solid #c2c2c2",
          borderRadius: "30px",
        }}
      >
      <TextField
        id="filled-number"
        type="number"
        className={classes.input}
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        value={amount}
        onChange={(e)=>handleAmountChange(e.target.value)}
      />
      <Box zIndex={100}>
      <FormControl variant="filled" sx={{ marginTop:'9px', minWidth: 90}}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          className={classes.selectRoot}
          value={currency}
          variant="standard"
          MenuProps={{
            anchorOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
          disableUnderline
          onChange={(e)=>handleCurrencyChange(e.target.value)}
        >
       {
        currencies.map((currency)=>(
          <ListItem value={currency} key={currency} style={{width:'100%',display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
            <CurrencyFlag currency={currency} size="md"/>
            {currency}
            </ListItem>
        ))
       }
        </Select>
      </FormControl>
      </Box>
    </Box>
  );
};

export default InputControl;


// useEffect(()=>{
// axios.get("https://restcountries.com/v3.1/all").then((response)=>{
//   console.log(response.data[0].flags, response.data[0].currencies)
// })
// },[])