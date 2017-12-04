/**
 * Declare all states to return
 */


import {initialUploadState, UploadReducer, UploadState} from './upload';

export interface RootState {
	Upload: UploadState;
}

/**
 * Declare all reducers used in app.module.ts
 */
export const reducers = {
	Upload: UploadReducer
};

/**
 * Initial state for all your reducers.
 */
export const initialRootState = (): RootState => ({
	Upload: initialUploadState
});
