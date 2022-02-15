import React from "react";
import { Text } from "react-native";

type Props = {
    textError: string;
}

const TextError = ({textError}: Props) => {
    return(
        <Text style={{color: "#a11f1f", fontSize: 12}}>{textError}</Text>
    )
}

export default TextError;