import { useState, useEffect } from "react";
import reactDom from "react-dom";
import styles from "./Modal.module.css";

import { FaTimes } from "react-icons/fa";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose && onClose();
    console.log("CLOSE");
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return reactDom.createPortal(modalContent, document.getElementById("modal-root"));
  }

  return null;
}
