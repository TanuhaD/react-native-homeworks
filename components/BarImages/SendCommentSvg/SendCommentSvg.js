import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function SendCommentSvg(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={17} cy={17} r={17} fill="#FF6C00" />
      <Path
        d="M17 10l.354-.354a.5.5 0 00-.708 0L17 10zm4.646 5.354a.5.5 0 00.708-.708l-.708.708zm-10-.708a.5.5 0 00.708.708l-.708-.708zM16.5 24a.5.5 0 001 0h-1zm.146-13.646l5 5 .708-.708-5-5-.708.708zm0-.708l-5 5 .708.708 5-5-.708-.708zM16.5 10v7h1v-7h-1zm0 7v7h1v-7h-1z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SendCommentSvg;
