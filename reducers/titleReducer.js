import {
    SET_TITLE
} from '../actions'

export default function title(state = {
    text: ''
}, action) {
    switch (action.type) {
        case SET_TITLE:
            return Object.assign({}, state, {
                text: action.text
            })
        default:
            return state
    }
}
