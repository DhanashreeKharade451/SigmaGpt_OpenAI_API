import "dotenv/config";

//here we are sending a message and getting a response from openAi API
const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: Json.stringify({
      model: "gpt-6-astra",
      messages: [
        {
          role: "user",
          //content: "Hello!", // this is static content insted of we will use req.body
          content: message,
        },
      ],
    }),
  };

  try {
    //to test API Endpoint
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );
    const data = await response.json();
    // console.log(data.choices[0].message.content); // this is final reply
    return data.choices[0].message.content; // here we are simply returning because this is not an API call
  } catch (err) {
    console.log(err);
  }
};

export default getOpenAIAPIResponse;
