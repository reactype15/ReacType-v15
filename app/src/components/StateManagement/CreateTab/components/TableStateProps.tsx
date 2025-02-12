import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridEditRowsModel,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import makeStyles from '@mui/styles/makeStyles';
import { StatePropsPanelProps } from '../../../../interfaces/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { deletePassedInProps } from '../../../../redux/reducers/slice/appStateSlice';

const TableStateProps = props => {
  const { state, contextParam } = useSelector((store) => ({
    state: store.appState,
    contextParam: store.contextSlice,
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  
  // formatting for data grid columns 
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
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
      headerName: 'Initial Value',
      width: 100,
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
      width: 30,
      editable: false,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black'}}
            onClick={() => {
              deleteState(params.id, params.key);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
        );
      }
    }
  ];

  const deleteState = (selectedId, stateName) => {
    // get the current focused component
    // send a dispatch to rerender the table
    const currentId = state.canvasFocus.componentId;
    const currentComponent = state.components[currentId - 1];
    // returns an array of the remaining props after deleting selected prop
    const filtered = currentComponent.stateProps.slice();
    let otherId;
    for (let i = 0; i < filtered.length; i++) {
      let curr = filtered[i];
      if (curr.id === selectedId) {
        if (i %2 ===0) {
          otherId = filtered[i + 1];
          filtered.splice(i, 2);
        } else {
          otherId = filtered[i - 1];
          filtered.splice(i - 1, 2);
        }
      }
    }
    dispatch(deletePassedInProps({stateProps: filtered, rowId: selectedId, otherId: otherId.id, contextParam: contextParam}))
  };

  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  const { selectHandler }: StatePropsPanelProps = props;
  
  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }

  }, [state.canvasFocus.componentId]);

  // rows to show are either from current component or from a given provider
  let rows = [];
  currentComponent.stateProps?.forEach((prop) => rows.push(prop)); 


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
