"use client";

import styles from "./taking.module.css";
import { ReactNode, useEffect } from "react";
import dayjs from "dayjs";
import React from "react";

export default function TakingLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
