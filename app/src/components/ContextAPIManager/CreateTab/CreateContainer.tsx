import React, { useEffect, useState, useContext } from 'react';
import { useStore } from 'react-redux';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import DataTable from './components/DataTable';
import AddDataForm from './components/AddDataForm';
import AddContextForm from './components/AddContextForm';
// import * as actions from '../../../redux/actions/actions';
import { Typography } from '@mui/material';
import StateContext from '../../../context/context';
import { addContext, deleteContext, addContextValues } from '../../../redux/reducers/slice/contextReducer';
import { useSelector, useDispatch } from 'react-redux';
import { deleteElement } from '../../../redux/reducers/slice/appStateSlice';

const CreateContainer = () => {
  const defaultTableData = [{ key: 'Enter Key', value: 'Enter value' }];
  const state = useSelector(store => store.contextSlice);

  const store = useStore();
  // const [state, setState] = useState([]);
  const [tableState, setTableState] = React.useState(defaultTableData);
  const [contextInput, setContextInput] = React.useState(null);
  // const [stateContext, dispatchContext] = useContext(StateContext);
  const dispatch = useDispatch();

  //pulling data from redux store
  // useEffect(() => {

  //   setState(allContext)
  //   // setState(store.getState().contextSlice);

  // }, [allContext]);



  //update data store when user adds a new context
  const handleClickSelectContext = () => {
    //prevent user from adding duplicate context
    for (let i = 0; i < state.allContext.length; i += 1) {
      if (state.allContext[i].name === contextInput.name) {
        return;
      }
    }
    setContextInput('');
    dispatch(addContext(contextInput));

    // setState(allContext);
  };

  //update data store when user add new key-value pair to context
  const handleClickInputData = ({ name }, { inputKey, inputValue }) => {
    dispatch(
      addContextValues({ name, inputKey, inputValue })
    );
    // setState(allContext);
  };

  //update data store when user deletes context
  const handleDeleteContextClick = () => {
    dispatch(deleteContext(contextInput));
    setContextInput('');
    // setState(allContext);
    setTableState(defaultTableData);

    dispatch(deleteElement({id:'FAKE_ID', contextParam: state}))
    // dispatchContext({
    //   type: 'DELETE ELEMENT',
    //   payload: 'FAKE_ID'
    // });
  };

  //re-render data table when there's new changes
  const renderTable = targetContext => {
    if (
      targetContext === null ||
      targetContext === undefined ||
      !targetContext.values
    ) {
      // if (targetContext === null || targetContext === undefined) {
      setTableState(defaultTableData);
    } else {
      setTableState(targetContext.values);
    }
  };
  return (
    <>
      <Grid container display="flex" justifyContent="space-evenly">
        <Grid item>
          <Grid
            container
            spacing={2}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <AddContextForm
                contextStore={state}
                handleClickSelectContext={handleClickSelectContext}
                handleDeleteContextClick={handleDeleteContextClick}
                renderTable={renderTable}
                contextInput={contextInput}
                setContextInput={setContextInput}
              />
            </Grid>

            <Divider variant="middle" />
            <Grid item>
              <AddDataForm
                handleClickInputData={handleClickInputData}
                contextInput={contextInput}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
          <Typography
            style={{ color: 'black' }}
            variant="h6"
            gutterBottom={true}
          >
            Context Data Table
          </Typography>
          <DataTable target={tableState} contextInput={contextInput} />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateContainer;