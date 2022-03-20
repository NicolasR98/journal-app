import { types } from "../../types/types";

describe('Tests on types.js', () => {
    test('Types object should be like expected', () => {
        const expected = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start isLoading',
            uiStopLoading: '[UI] Stop isLoading',

            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdate: '[Notes] Update note saved',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutClean: '[Notes] Logout clean',
        };

        expect(types).toEqual(expected);
    });
});