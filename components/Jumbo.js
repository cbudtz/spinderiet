import { useState } from "react";
import { getStrapiMedia } from "../api/api";
import { resolveImage, useWindow } from "../api/window";

export default function Jumbo({ images, text }) {
  const [windowWidth, setWindowWidth] = useState(2000);
  useWindow(setWindowWidth);
  let image = "";
  if (images && images[0]) {
    image = resolveImage(windowWidth, images[0]);
  } else {
    return <></>;
  }
  return (
    <div
      className="bg-light rounded p-5 mb-4"
      style={{
        width: "100%",
        paddingBottom: windowWidth > 800 ? "40%" : "60%",
        backgroundImage: "url('" + getStrapiMedia(image) + "')",
        backgroundRepeat: "space",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}
