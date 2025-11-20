import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const workspaceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    automations: [{ type: Schema.Types.ObjectId, ref: "Automation" }]
  },
  { timestamps: true }
);

export type IWorkspace = InferSchemaType<typeof workspaceSchema>;

export const Workspace: Model<IWorkspace> =
  (models.Workspace as Model<IWorkspace>) || model<IWorkspace>("Workspace", workspaceSchema);
