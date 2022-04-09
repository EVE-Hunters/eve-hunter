import {proxy} from "valtio";

const modes = ['translate', 'rotate', 'scale'];
const state = proxy({current: null, mode: 0})

export {
    modes,
    state
}
