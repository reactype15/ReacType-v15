import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import {useSelector} from 'react-redux'

const AddDataForm = ({ handleClickInputData, contextInput }) => {
  //const [contextInput, setContextInput] = React.useState(null);
  const defaultInputData = {inputKey: '', inputValue: ''};
  const [dataContext, setDataContext] = React.useState(defaultInputData);
const {isDarkMode} = useSelector(store=> store.darkMode.isDarkMode)
  const saveData = () => {
    setDataContext(defaultInputData);
    handleClickInputData(contextInput, dataContext)
  }
const color = isDarkMode ? 'white' : 'black';

  const handleChange = e => {
    setDataContext(prevDataContext => {
      return {
        ...prevDataContext,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <Fragment>
      <Typography style={{ color: color }} variant="h6" gutterBottom={true}>
        Add context data 
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, color:'black' }}>
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          value={dataContext.inputKey}
          name="inputKey"
          onChange={e => handleChange(e)}
          InputProps={{style: { color: color }}}  
          style={{border:'1px solid black'}}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={dataContext.inputValue}
          name="inputValue"
          onChange={e => handleChange(e)}
          style={{border:'1px solid black'}}
          InputProps={{ style: { color: color }}}  
        />
        <Button
          variant="contained"
          onClick={saveData}
        >
          Save
        </Button>
      </Box>
    </Fragment>
  );
};

export default AddDataForm;