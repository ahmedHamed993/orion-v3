import React from "react";
import styles from "./loader.module.css";
const CirclesLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <span className={styles.loader}></span>
    </div>
  );
};

export default CirclesLoader;
