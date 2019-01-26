import { UPDATE_SETTINGS } from './actionTypes';

export function updateControls(settings) {
    return {
        type: UPDATE_SETTINGS,
        settings,
    };
}
