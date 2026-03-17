// icons/index.tsx или ваш файл с AlertIcon
import React, { useEffect, useState } from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

interface AlertIconProps {
  type: "info" | "warning" | "success" | "error";
  size?: number;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ type, size = 48 }) => {
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setError(null);
  }, [type]);

  if (error) {
    console.error('SVG Error:', error);
    return null;
  }

  const svgProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
  };

  try {
    switch (type) {
      case "success":
        return (
          <Svg {...svgProps} key={`success-${size}-${Date.now()}`}>
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="#4CAF50"
            />
          </Svg>
        );
      case "warning":
        return (
          <Svg {...svgProps} key={`warning-${size}-${Date.now()}`}>
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="#FFC107"
            />
          </Svg>
        );
      case "error":
        return (
          <Svg {...svgProps} key={`error-${size}-${Date.now()}`}>
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="#f44336"
            />
          </Svg>
        );
      default:
        return (
          <Svg {...svgProps} key={`info-${size}-${Date.now()}`}>
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              fill="#2196F3"
            />
          </Svg>
        );
    }
  } catch (err) {
    setError(err as Error);
    return null;
  }
};