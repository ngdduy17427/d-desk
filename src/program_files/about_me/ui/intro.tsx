import DImage from "components/d_image";
import { memo } from "react";
import TextTyping from "./text_typing";

const Intro = (): JSX.Element => {
  return (
    <div className="intro">
      <DImage
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/getImage?image=/thumb/my_thumb.png`}
        alt="My Thumb"
        className="my-thumb"
      />
      <span className="greeting">
        <TextTyping texts="Hello there! Welcome to my portfolio." />
      </span>
    </div>
  );
};

export default memo(Intro);
