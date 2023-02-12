// my backend server
const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const openAI = require('openai')
const { Configuration, OpenAIApi }=openAI





const configuration = new Configuration({
    organization: "org-hhDspFEWExuwuHz98gtNWI5L",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express();
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
const port = 3001;
app.use(bodyparser.json());

app.post('/',async (req,res)=>{
    const {message}= req.body;

    const imgresponse = await openai.createImage({
        prompt: `${message}`,
        n: 1,
        size: "1024x1024",
        // response_format:url
    });
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
    });
    

    
      

    console.log(response.data)
    console.log(imgresponse.data)

    
    if(response.data.choices[0].text && imgresponse.data.data[0].url ){
        res.json({
            message:response.data.choices[0].text,
            imgpath:imgresponse.data.data[0].url
        })
    }
      
})

app.listen(port,()=>{
    console.log('server listening at port',port);
})

