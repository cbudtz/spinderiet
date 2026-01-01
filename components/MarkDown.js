import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../api/api";

export default function MarkDown({ children }) {
  if (!children) {
    children = "";
  }
  // Ensure markdown is always a string to avoid hydration issues
  let markdown = String(children);
  // Replace <br> tags with line breaks (two spaces + newline for markdown line breaks)
  // This handles both <br> and <br/> tags, case-insensitive
  markdown = markdown.replace(/<br\s*\/?>/gi, "  \n");
  
  if (typeof markdown.replaceAll === "function") {
    markdown = markdown.replaceAll("(/uploads/", "(" + BASE_URL + "uploads/");
  } else {
    // Fallback for environments without replaceAll (older Node.js)
    markdown = markdown.replace(/\(\/uploads\//g, "(" + BASE_URL + "uploads/");
  }
  // if (markdown) {
  //     markdown = markdown.replaceAll("\n\n", "{x}");
  //     markdown = markdown.replaceAll("\n", "\xa0\xa0\n");
  //     markdown = markdown.replaceAll("{x}", "\n\n");
  //     console.log(markdown);
  // }
  const components = {
    img: ({ alt, src, title, ...props }) => {
      // Parse dimensions from alt text format: "alt text=widthxheight"
      const altParts = alt?.split("=") || [];
      const altText = altParts[0] || alt || "";
      const dimensions = altParts[1]?.split("x") || [];
      const width = dimensions[0] ? Number(dimensions[0]) : NaN;
      const height = dimensions[1] ? Number(dimensions[1]) : NaN;
      
      // Only use width/height if they are valid numbers
      const hasValidWidth = !isNaN(width) && width > 0;
      const hasValidHeight = !isNaN(height) && height > 0;
      const isLargeImage = hasValidWidth && width > 500;
      
      // Create style object - ensure all properties are explicitly set
      const imgStyle = {
        height: "auto",
        width: "100%",
      };
      
      if (hasValidWidth) {
        imgStyle.maxWidth = `${width}px`;
      } else {
        imgStyle.maxWidth = "100%";
      }
      
      // Image component with ref to set styles after render if needed
      const ImageWithStyle = () => {
        const imgRef = useRef(null);
        
        useEffect(() => {
          if (imgRef.current) {
            // Ensure styles are applied even if they were stripped
            imgRef.current.style.height = "auto";
            imgRef.current.style.width = "100%";
            if (hasValidWidth) {
              imgRef.current.style.maxWidth = `${width}px`;
            } else {
              imgRef.current.style.maxWidth = "100%";
            }
          }
        }, [hasValidWidth, width]);
        
        // For large images, use block display
        if (isLargeImage) {
          return (
            <span style={{ display: "block" }}>
              <img
                {...props}
                ref={imgRef}
                alt={altText}
                src={src}
                title={title}
                style={imgStyle}
                data-width={hasValidWidth ? width : undefined}
              />
            </span>
          );
        }
        
        // For smaller images, use inline span
        return (
          <span style={{ display: "inline-block" }}>
            <img
              {...props}
              ref={imgRef}
              alt={altText}
              src={src}
              title={title}
              style={imgStyle}
              data-width={hasValidWidth ? width : undefined}
            />
          </span>
        );
      };
      
      return <ImageWithStyle />;
    },
  };
  return (
    <ReactMarkdown components={components}>
      {markdown}
    </ReactMarkdown>
  );
}
