
import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridEditRowsModel,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import makeStyles from '@mui/styles/makeStyles';
import { StatePropsPanelProps } from '../../interfaces/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { deletePassedInProps } from '../../redux/reducers/slice/appStateSlice';

const TableStateProps = props => {

  const { state, contextParam } = useSelector((store) => ({
    state: store.appState,
    contextParam: store.contextSlice,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      editable: false
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 90,
      editable: true
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 90,
      editable: true
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
      editable: false
    },
    {
      field: 'delete',
      headerName: 'X',
      width: 70,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px` }}
            onClick={() => {
              handleDeleteState(params.id);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
        );
      }
    }
  ];
  const handleDeleteState = selectedId => {
    // get the current focused component
    // remove the state that the button is clicked
    // send a dispatch to rerender the table
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    const filtered = currentComponent.stateProps.filter(
      element => element.id !== selectedId
    );

    dispatch(deletePassedInProps({stateProps: filtered, rowId: selectedId, contextParam: contextParam}));
  };

  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  const { selectHandler }: StatePropsPanelProps = props;
  // the delete button needs to be updated to remove
  // the states from the current focused component
  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }
  }, [state.canvasFocus.componentId]);
  // rows to show are either from current component or from a given provider
  let rows = [];
  if (!props.providerId) {
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    rows = currentComponent.stateProps.slice();
  } else {
    const providerComponent = state.components[props.providerId - 1];
    // changed to get whole object
    if (props.displayObject){
      const displayObject = props.displayObject;
      // format for DataGrid
      let id=1;
      for (const key in displayObject) {
        // if key is a number make it a string with brackets aroung number
        const newKey = isNaN(key) ? key : '[' + key + ']';
        const type = Array.isArray(displayObject[key]) ? 'array' : typeof (displayObject[key]);
        rows.push({ id: id++, key: newKey, value: displayObject[key], type: type});
      }
    } else {
      rows = providerComponent.stateProps.slice();
    }
  }


  return (
    <div className={'state-prop-grid'}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick={selectHandler}
        className={props.isThemeLight ? classes.themeLight : classes.themeDark}
      />
    </div>
  );
};

const useStyles = makeStyles({
  themeLight: {
    color: 'rgba(0,0,0,0.54)',
    '& .MuiTablePagination-root': {
      color: 'rbga(0,0,0,0.54)'
    }
  },
  themeDark: {
    color: 'white',
    '& .MuiTablePagination-root': {
      color: 'white'
    },
    '& .MuiIconButton-root': {
      color: 'white'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '& .MuiDataGrid-window': {
      backgroundColor: 'rgba(0,0,0,0.54)'
    }
  }
});

export default TableStateProps;
