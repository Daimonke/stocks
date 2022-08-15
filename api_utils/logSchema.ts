import { Schema, model, models } from "mongoose";

const logSchema = new Schema({
  companyName: String,
  stockPrices: Array,
  dateRange: {
    starts: String,
    ends: String,
  },
});

const Log = models.Log || model("Log", logSchema);

export default Log;
