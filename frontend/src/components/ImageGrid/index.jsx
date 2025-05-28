import styles from "./index.module.scss";
import React from "react";

const ImageGrid = ({
  selected,
  sections,
  focusIndex,
  handleMouseDown = () => {},
  handleMouseEnter = () => {},
  handleMouseClick = () => {},
}) => {
  return (
    <div
      className={styles.grid}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {Array.from({ length: 150 }).map((_, index) => {
        const isSelected = selected?.has(index);
        const section = sections?.find((s) => s.cells.includes(index));
        const isLabelCell = section && section.cells[0] === index;
        const backgroundColor = isSelected
          ? "rgba(0, 76, 214, 0.4)"
          : section?.color || "transparent";

        return (
          <div
            key={index}
            className={styles["grid-cell"]}
            style={{ backgroundColor }}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleMouseClick(index)}
          >
            {isLabelCell && (
              <span className={styles["section-label"]}>{section.name}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
