import { Dimensions } from "react-native"

const useScaleSize = (size: number) => {
    const baseWidth = 441.428
    const baseHeight = 797.714

    const WIDTH = Dimensions.get("window").width
    const HEIGHT = Dimensions.get("window").height

    let scaleWidth;
    let scaleHeight;

    if(WIDTH > HEIGHT) {
        scaleWidth = WIDTH / baseHeight
        scaleHeight = HEIGHT / baseWidth
    } else {
        scaleWidth = WIDTH / baseWidth
        scaleHeight = HEIGHT / baseHeight
    }

    const scale = Math.min(scaleWidth, scaleHeight);

    const scaledSize = Math.ceil((size * scale))

    return scaledSize;
}

export default useScaleSize;