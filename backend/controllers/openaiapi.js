export const searchQueryApi = async (req, res, next) => {
   try {
      const { prompt } = req.body;
      const aiResponse = await OpenAIApi.create
   } catch(err) {
      console.log(err);
   }

}