import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatNumber = (n: number) => n.toLocaleString("en-CA");

export const pad2 = (n: number) => String(n).padStart(2, "0");
