import mongoose, { Schema, Document } from "mongoose";

export interface IProductConfig extends Document {
  productId: string;
  name: string;
  qtyCol: number;
}

export interface SupplyPayload {
  [key: string]: number;
}

const productConfigSchema = new Schema<IProductConfig>({
  productId: { type: String, required: true, unique: true }, 
  name:      { type: String, required: true },               
  qtyCol:    { type: Number, required: true },               
});

export const ProductConfig = mongoose.model<IProductConfig>(
  "ProductConfig",
  productConfigSchema,
  "progs"
);