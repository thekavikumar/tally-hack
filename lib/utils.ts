import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MongoClient, Db } from "mongodb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
