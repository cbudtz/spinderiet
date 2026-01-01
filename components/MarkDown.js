import React, { useLayoutEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { BASE_URL } from "../api/api";

export default function MarkDown({ children }) {
  const containerRef = useRef(null);
  
  // Function to apply styles to images - can be called multiple times
  const applyImageStyles = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const images = containerRef.current.querySelectorAll('img[data-width]');
      images.forEach((img) => {
        const width = img.getAttribute('data-width');
        if (width) {
          // Set styles directly on DOM element - this works even if React props are stripped
          // Also set CSS custom property as fallback
          img.style.setProperty('--img-max-width', `${width}px`);
          img.style.setProperty('height', 'auto', 'important');
          img.style.setProperty('width', '100%', 'important');
          img.style.setProperty('max-width', `${width}px`, 'important');
        }
      });
    }
  };
  
  // useLayoutEffect runs synchronously before browser paint - ensures styles are set before render
  // This handles cases where inline styles are stripped during SSR/build
  useLayoutEffect(() => {
    applyImageStyles();
    
    // Also run after a short delay to catch any late-rendered images
    const timeoutId = setTimeout(applyImageStyles, 0);
    
    // Use MutationObserver to catch dynamically added images
    if (containerRef.current && typeof window !== 'undefined' && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        applyImageStyles();
      });
      
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
      
      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
    
    return () => clearTimeout(timeoutId);
  }, [children]);
  
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
      
      // For large images, use block display
      if (isLargeImage) {
        return (
          <span style={{ display: "block" }}>
            <img
              {...props}
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
            alt={altText}
            src={src}
            title={title}
            style={imgStyle}
            data-width={hasValidWidth ? width : undefined}
          />
        </span>
      );
    },
  };
  return (
    <div ref={containerRef}>
      <ReactMarkdown components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
