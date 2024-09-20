import { Recip } from "../models/recip.js";

export const allRecipes = async (req, res) => {
    try {
        const recipes = await Recip.find();
        res.send(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const categoryRecipes = async (req, res) => {   
    const { category } = req.params; 
    try {
        const recipes = await Recip.find({ category: category });
        res.status(200).json(recipes)
    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
};


export const postRecip = async (req, res) => {
    const recip= req.body;
    const newRecip = new Recip(recip);
    try {
        await newRecip.save();
        res.status(201).json(newRecip);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const deleteRecip = async (req, res) => {
    const { id } = req.params;

    try {
        const recip = await Recip.findByIdAndDelete(id);
        if (recip) {
            res.send('ricetta eliminata con successo');
        } else {
            res.status(404).send('ID non trovato');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const patchRecip = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body} //  dati che vogliamo passare per aggiornare il nostro utente
    try {
        const recip = await Recip.findByIdAndUpdate(id,data, {new:true}) 
        res.status(200).json(recip)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}