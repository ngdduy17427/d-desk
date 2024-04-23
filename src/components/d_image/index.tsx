import Image from "next/image";
import { memo } from "react";
import { WCDImage } from "web_components";
import "./css.css";

interface IDImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DImage = ({ src, alt, className }: IDImageProps): JSX.Element => {
  return (
    <WCDImage className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={100}
        priority
      />
    </WCDImage>
  );
};

export default memo(DImage);
