import { useMemo } from "react";
import styles from "./Property1Default.module.css";
const Property1Default = ({
  property1DefaultPosition,
  property1DefaultCursor,
  property1DefaultTop,
  property1DefaultLeft,
  property1DefaultHeight,
  property1DefaultJustifyContent,
  attemptDisplay,
  onFrameButton5Click,
}) => {
  const property1DefaultStyle = useMemo(() => {
    return {
      position: property1DefaultPosition,
      cursor: property1DefaultCursor,
      top: property1DefaultTop,
      left: property1DefaultLeft,
      height: property1DefaultHeight,
      justifyContent: property1DefaultJustifyContent,
    };
  }, [
    property1DefaultPosition,
    property1DefaultCursor,
    property1DefaultTop,
    property1DefaultLeft,
    property1DefaultHeight,
    property1DefaultJustifyContent,
  ]);

  const attemptStyle = useMemo(() => {
    return {
      display: attemptDisplay,
    };
  }, [attemptDisplay]);

  return (
    <div
      className={styles.property1default}
      style={property1DefaultStyle}
      onClick={onFrameButton5Click}
    >
      <div className={styles.attempt} style={attemptStyle}>
        Attempt
      </div>
    </div>
  );
};

export default Property1Default;
