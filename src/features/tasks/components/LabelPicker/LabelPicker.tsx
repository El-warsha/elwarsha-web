import { useState, useRef, useEffect } from "react";
import { Label } from "@entities/assignment";
import styles from "./LabelPicker.module.css";

interface LabelPickerProps {
  availableLabels: Label[];
  selectedLabelIDs?: string[];
  onLabelsChange: (labels: string[]) => void;
}

export default function LabelPicker({ availableLabels, selectedLabelIDs = [], onLabelsChange }: LabelPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLabel = (labelId: string) => {
    if (selectedLabelIDs.includes(labelId)) {
      onLabelsChange(selectedLabelIDs.filter(id => id !== labelId));
    } else {
      onLabelsChange([...selectedLabelIDs, labelId]);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button 
        type="button" 
        className={styles.dropdownToggle} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedLabelIDs.length > 0 
            ? `Selected (${selectedLabelIDs.length})` 
            : "Select Labels..."}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {availableLabels.length === 0 ? (
            <div className={styles.emptyItem}>No labels available</div>
          ) : (
            availableLabels.map(label => (
              <label key={label.id} className={styles.dropdownItem}>
                <input
                  type="checkbox"
                  checked={selectedLabelIDs.includes(label.id)}
                  onChange={() => toggleLabel(label.id)}
                  className={styles.checkbox}
                />
                <span className={styles.labelName}>{label.name}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}