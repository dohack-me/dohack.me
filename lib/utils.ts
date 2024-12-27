import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {FileObject} from "@supabase/storage-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isFolder(file: FileObject) {
  return (!file.metadata)
}