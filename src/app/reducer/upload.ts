import {Action, createFeatureSelector, createSelector} from '@ngrx/store';

/**
 * Declare 2 actions (objects):
 * - login: get logged in user
 * - logout: user empty
 */
export const UPLOAD_NOEUD = 'UploadNoeud';
export const UPLOAD_CHEMINEMENT = 'UploadCheminement';

export class UploadNoeud implements Action {
	readonly type = UPLOAD_NOEUD;

	constructor() {
	}
}

export class UploadCheminement implements Action {
	readonly type = UPLOAD_CHEMINEMENT;
}

export type UploadActions = UploadNoeud | UploadCheminement;

/**
 * Declare the object to return with initial state.
 */
export interface UploadState {
	msg: String;
}

export const initialUploadState: UploadState = {
	msg: ''
};

/**
 * Declare reducer that takes a state and an action and run a function which update the state.
 * @param state is the old state
 * @param action is the action to run (type, payload)
 */
export function UploadReducer(state: UploadState = initialUploadState, action: UploadActions): UploadState {
	switch (action.type) {
		case UPLOAD_NOEUD:
			// TODO keycloak logout
			return {msg: 'noeud'};

		case UPLOAD_CHEMINEMENT:
			return {msg: 'cheminement'};

		default:
			return state;
	}
}

/**
 * Export functions as fromUser.
 */
export const getUploadState = createFeatureSelector<UploadState>('Upload');
export const getUpload = createSelector(
	getUploadState,
	(state: UploadState) => state.msg
);
