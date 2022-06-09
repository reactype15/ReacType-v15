import * as types from '../constants/actionTypes';

export const darkModeToggle = () => ({
  type: types.DARK_MODE_TOGGLE
});

export const addContextActionCreator = contextName => ({
  type: types.ADD_CONTEXT,
  payload: contextName
});

export const addContextValuesActionCreator = newEntry => ({
  type: types.ADD_CONTEXT_VALUES,
  payload: newEntry
});

export const addComponentToContext = newEntry => ({
  type: types.ADD_COMPONENT_TO_CONTEXT,
  payload: newEntry
});

export const deleteContext = (contextInput) => ({
  type: types.DELETE_CONTEXT,
  payload: contextInput
})
