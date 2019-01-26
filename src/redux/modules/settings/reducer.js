import { UPDATE_SETTINGS } from './actionTypes';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_SETTINGS: {
            const { controls } = action;
            return { ...state, ...controls };
        }
        default:
            return state;
    }
}
