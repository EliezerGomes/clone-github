export interface PositionButton {
    top: number
    lef: number
}

export interface PropertiesProp {
    options: { [key: string]: string }
    positions: PositionButton
}