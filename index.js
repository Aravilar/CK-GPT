import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: "", // Own organization
    apiKey: "", // Own API key
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const {messages} = req.body;

    console.log(messages);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "system", "content": "You are a helpful assistant for an air conditioning company named Béla."},
            {"role": "system", "content": "Read these urls and all other urls found on them and answer questions about it:" +
                //"https://www.fisherklima.hu/termekek/hoszivattyu https://www.fisherklima.hu/termekek/hoszivattyu/fisher-leveg%C5%91-v%C3%ADz-h%C5%91szivatty%C3%BA-10-kw-adatlap?limitstart=0"},
                "https://www.fisherklima.hu/letoltesek/FI_OM_FHF-WHS-081-101-121-161CE3_WHS-MBIO-001_20220427.pdf"},
            ...messages
        ],
    });
    
    res.json({
        completion: completion.data.choices[0].message,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});