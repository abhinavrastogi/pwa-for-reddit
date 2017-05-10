import {
    TOGGLE_IMAGES
} from '../actions'

export default function config(state = {
    showFullImages: false
}, action) {
    switch (action.type) {
        case TOGGLE_IMAGES:
            return Object.assign({}, state, {
                showFullImages: !state.showFullImages
            })
        default:
            return state
    }
}
