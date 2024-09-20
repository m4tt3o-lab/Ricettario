import express from 'express';
import recipesRoutes from './routes/recip.js'
import { mongoose } from "mongoose";
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3000
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/Recipes'

app.use(express.json());
app.use(cors());

app.use('/recipes', recipesRoutes);

app.get('/', (req, res) => res.send('home page'));

mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));