import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const automationSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    parentWorkspace: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },

    nodes: { type: [Schema.Types.Mixed], default: [] },
    edges: { type: [Schema.Types.Mixed], default: [] }
  },
  { timestamps: true }
);

export type IAutomation = InferSchemaType<typeof automationSchema>;

export const Automation: Model<IAutomation> =
  models.Automation as Model<IAutomation> || model<IAutomation>("Automation", automationSchema);
