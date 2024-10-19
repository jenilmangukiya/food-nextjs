import React from "react";
import classes from "./loading.module.css";

export const Loading = () => {
  return <p className={classes.loading}>Fetching meals...</p>;
};

export default Loading;
