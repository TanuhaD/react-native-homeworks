import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Grid = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      clipRule="evenodd"
      d="M1 1h7v7H1V1ZM12 1h7v7h-7V1ZM12 12h7v7h-7v-7ZM1 12h7v7H1v-7Z"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Grid;
