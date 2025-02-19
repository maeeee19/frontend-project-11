import { string } from "yup";

export const urlSchema = string().required().url()