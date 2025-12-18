async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  if (!message) return;

  addMessage("You", message);
  input.value = "";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message
      })
    }
  );

  const data = await response.json();
  addMessage("Bot", data[0].generated_text);
}

function addMessage(sender, text) {
  const messages = document.getElementById("messages");
  messages.innerHTML += `<p><b>${sender}:</b> ${text}</p>`;
  messages.scrollTop = messages.scrollHeight;
}
