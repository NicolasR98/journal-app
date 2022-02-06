import { types } from "../types/types";

export const uiSetError = (err) => ({
    type: types.uiSetError,
    payload: err
});

export const uiRemoveError = () => ({
    type: types.uiRemoveError,
});

export const uiStartLoading = () => ({
    type: types.uiStartLoading,
});

export const uiStopLoading = () => ({
    type: types.uiStopLoading,
});