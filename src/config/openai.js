import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

console.log('Environment variables:', process.env);
console.log('REACT_APP_OPENAI_API_KEY:', apiKey);

if (!apiKey) {
  console.error('REACT_APP_OPENAI_API_KEY is not set in the environment');
}

let openai;

try {
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
} catch (error) {
  console.error('Error initializing OpenAI:', error);
}

export async function sendMsgToOpenAI(message) {
  if (!apiKey) {
    throw new Error('OpenAI API key is not set');
  }

  if (!openai) {
    throw new Error('OpenAI client is not initialized');
  }

  try {
    const res = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0
    });

    return res.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}