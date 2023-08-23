import React, { forwardRef } from "react";

import { useImage } from "@/hooks/useImage";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallback?: React.ReactElement;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ fallbackSrc, fallback, ...props }, ref) => {
    const status = useImage(props);
    console.log("status", status);

    if (status !== "loaded") {
      if (fallback) return fallback;
      return <img {...props} src={fallbackSrc} ref={ref} />;
    } else {
      return <img {...props} ref={ref} />;
    }
  }
);

Image.displayName = "Image";

export default Image;
