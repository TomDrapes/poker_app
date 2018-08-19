import { UPDATE_BET } from "../Actions/BetActions";

export default function betReducer ( state = null, action ) {
    switch (action.type) {
        case UPDATE_BET: 
            return action.payload
        default:
            return state
    }
}