import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
export const heightPixel = (e) => {

    const fheight = windowHeight * e / 812
    return fheight;
}
export const widthPixel = (e) => {

    const fheight = windowWidth * e / 375
    return fheight;
}