import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { merge } from 'tailwind-merge';


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}