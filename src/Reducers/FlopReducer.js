import { UPDATE_FLOP, RESET_FLOP } from '../Actions/FlopActions'

export default function flopReducer (state = [], { type, payload }) {
    switch (type) {
        case UPDATE_FLOP:
            return payload
        case RESET_FLOP:
            return payload
        default:
            return state
    }
}