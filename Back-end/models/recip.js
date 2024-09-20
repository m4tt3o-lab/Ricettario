import mongoose from "mongoose";

const recipSchema = mongoose.Schema({
    image:{
        type: String,
        required: true    },
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    ingredients: {
        type: String,
        required: true,
    },
    instructions:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Primo", "Secondo", "Dessert"] 
      }
}, { timestamps: true });

export const Recip = mongoose.model('Recipe', recipSchema);

