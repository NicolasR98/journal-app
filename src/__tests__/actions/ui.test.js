import { uiRemoveError, uiSetError, uiStartLoading, uiStopLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Tests on ui-actions', () => {
    const errorMsg = 'Test error msg';

    test('all actions should work', () => {
        // uiSetError
        const actionSetError = uiSetError(errorMsg);
        const expectedSetError = {
            type: types.uiSetError,
            payload: errorMsg,
        };

        // uiRemoveError
        const actionUiRemoveError = uiRemoveError()
        const expectedUiRemoveError = { type: types.uiRemoveError };

        // uiSetError
        const actionUiStartLoading = uiStartLoading();
        const expectedUiStartLoading = { type: types.uiStartLoading };

        // uiStopLoading
        const actionUiStopLoading = uiStopLoading();
        const expectedUiStopLoading = { type: types.uiStopLoading };

        expect(actionSetError).toEqual(expectedSetError);
        expect(actionUiRemoveError).toEqual(expectedUiRemoveError);
        expect(actionUiStartLoading).toEqual(expectedUiStartLoading);
        expect(actionUiStopLoading).toEqual(expectedUiStopLoading);
    });
});