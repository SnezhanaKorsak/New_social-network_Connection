import React from "react";
import {ActionsType, SideBarType} from "./store";

const initialState: SideBarType = {}

export const sideBarReducer = (state = initialState, action: ActionsType): SideBarType => {

    return state
}