import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI("AIzaSyAW1cNBAWshkcoXXxIJV9Su-asgJF77DfM");

const sendChat = document.getElementById("sendChat");
const input = document.getElementById("message");
const responseDiv = document.getElementById("response");
const messageDiv = document.createElement("div");

// Listen for click on send button
sendChat.addEventListener("click", run);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (input.value != "") {
    // Prepare prompt for AI with movie-related instructions
    const prompt =
      "answer in 2 line max should be only related to all kinds of movies,tv shows and anime when i put the name or ask about it if else write(I only answer questions that's related to movies..etc) " +
      input.value;

    // Get AI response
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    showChat(response);
  }
}

// Display chat messages in the UI
function showChat(answer) {
  if (!input.value.trim()) return;

  // Show user message
  messageDiv.classList.add("message", "user");
  messageDiv.textContent = input.value;
  responseDiv.appendChild(messageDiv);

  // Show AI response
  const AIResponse = document.createElement("div");
  AIResponse.classList.add("message", "ai");
  AIResponse.textContent = answer;
  responseDiv.appendChild(AIResponse);

  // Clear input field
  input.value = "";

  // Scroll chat to bottom
  responseDiv.scrollTop = responseDiv.scrollHeight;
}

// Clear chat history when clicking "+ New Chat" button
document
  .querySelector(".sidebar button")
  .addEventListener("click", function () {
    responseDiv.innerHTML = "";
  });

// Allow sending message by pressing Enter key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendChat.click();
  }
});
