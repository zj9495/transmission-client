import { IAppState } from '../types'

export const getSpeedBytesSelector = (state: IAppState) => state.session.units.speedBytes
export const getSpeedUnitsSelector = (state: IAppState) => state.session.units.speedUnits
export const getSizeBytesSelector = (state: IAppState) => state.session.units.sizeBytes
export const getSizeUnitsSelector = (state: IAppState) => state.session.units.sizeUnits

export const getMenuOpen = (state: IAppState) => state.menuOpen