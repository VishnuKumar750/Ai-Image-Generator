import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';
import { searchQueryApi } from '../controllers/openaiapi.js';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
   res.send('Hello from Dalle');
})

router.route('/').post(async (req, res) => {
   try {
      // console.log('api hit')
      const { prompt } = req.body;

      const aiResponse = await openai.createImage({
         prompt,
         n: 1,
         size: "1024x1024",
         response_format: 'b64_json'
      })

      
      const image = aiResponse.data.data[0].b64_json;
      // console.log()

      res.status(200).json({
         photo: image,
         success: true,
         message: 'image generated'
      })

   } catch(error) {
      console.log(error);
      res.status(500).send(error?.response.data.error.message)
   }
})

export default router;