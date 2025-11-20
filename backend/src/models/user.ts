import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    workspace: [{ type: Schema.Types.ObjectId, ref: "Workspace" }]
  },
  { timestamps: true }
);

// Infer TypeScript type from schema
export type IUser = InferSchemaType<typeof userSchema>;

export const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
