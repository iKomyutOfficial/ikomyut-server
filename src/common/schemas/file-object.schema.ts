import { Schema, Document } from "mongoose";

export interface FileObject {
  name?: string;
  url?: string;
}

export const FileObjectSchema = new Schema<FileObject>({
  name: { type: String, default: "" },
  url: { type: String, default: "" },
}, { _id: false });
