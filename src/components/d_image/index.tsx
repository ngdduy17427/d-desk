import Image from "next/image";
import { memo } from "react";
import { WCDImage } from "web_components";
import "./css.css";

interface IDImageProps {
  id?: string;
  src: string;
  alt: string;
  className?: string;
  unoptimized?: boolean;
  onLoad?: () => void;
  onClick?: () => void;
}

const DImage = ({
  id,
  src,
  alt,
  className,
  unoptimized,
  onLoad,
  onClick,
}: IDImageProps): JSX.Element => {
  return (
    <WCDImage id={id} className={className} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={100}
        priority
        unoptimized={unoptimized}
        onLoad={onLoad}
      />
    </WCDImage>
  );
};

export default memo(DImage);
