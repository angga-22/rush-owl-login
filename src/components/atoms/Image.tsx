import { FC } from "react";
interface Image {
  className?: string;
  src: string;
  alt: string;
}

const Image: FC<Image> = ({ className, src, alt }) => {
  return <img className={className} src={src} alt={alt} />;
};

export default Image;
