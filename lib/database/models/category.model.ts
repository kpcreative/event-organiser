import { model, models, Schema} from "mongoose";
import { Document } from "mongoose";
export interface ICategory extends Document {
    _id: string;
    name: string;
}
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
})
//now lets make this schema into a model
const Category = models.Category || model("Category", CategorySchema);

export default Category;