import express from "express";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Server is working!')
});

app.listen(PORT, () => {
    console.log('Server up on port number ', PORT);
})