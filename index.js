require("dotenv").config();
const clipboardy = require("node-clipboardy");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

var oldClip = clipboardy.readSync();

setInterval(() => {
  if (clipboardy.readSync() != oldClip) {
    console.clear();
    oldClip = clipboardy.readSync();
    console.log(oldClip);
    search(oldClip);
  }
}, 1000);

async function search(text) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 2048,
  });
  response.data.choices.map((choice) => {
    console.log(choice.text);
  });
}
