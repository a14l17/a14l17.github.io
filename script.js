// Elements
const nameInputEl = document.getElementById("name-input");
const landingEl = document.getElementById("landing");
const terminalEl = document.getElementById("terminal");
const outputEl = document.getElementById("output");
const typedEl = document.getElementById("typed");
const promptEl = document.getElementById("terminal-prompt");

let nameInput = "";
let userInput = "";
let stage = "landing"; // 'landing' or 'terminal'

// Terminal commands
const commands = {
  help: "Available commands: about, projects, skills, resume, clear",
  about: "Hi, I’m a data enthusiast passionate about building and visualizing machine learning models.",
  projects: "1. Predictive Analytics<br>2. Data Visualization Dashboard<br>3. NLP Sentiment Model",
  skills: "Python | SQL | Tableau | Scikit-learn | React",
  resume: "📄 <a href='#' target='_blank'>View Resume</a>",
  clear: () => outputEl.innerHTML = ""
};

// -------------------
// LANDING INPUT
// -------------------
function handleLandingInput(e) {
  if (stage !== "landing") return;

  if (e.key.length === 1 && e.key !== " ") {
    nameInput += e.key;
    nameInputEl.textContent = nameInput;
  } else if (e.key === "Backspace") {
    nameInput = nameInput.slice(0, -1);
    nameInputEl.textContent = nameInput;
  } else if (e.key === "Enter" && nameInput.trim() !== "") {
    // --- FIX: Do NOT execute name as command ---
    document.removeEventListener("keydown", handleLandingInput);
    startTerminal(nameInput.trim());
  }
}

// -------------------
// START TERMINAL
// -------------------
function startTerminal(name) {
  landingEl.classList.add("hidden");
  terminalEl.classList.remove("hidden");
  stage = "terminal";

  // Set terminal prompt
  promptEl.textContent = `${name}@portfolio:~$`;

  // Welcome message
  outputEl.innerHTML = `
    <div>Welcome, <strong>${name}</strong>!</div>
    <div>Type 'help' to get started.</div>
  `;

  // Enable terminal input
  document.addEventListener("keydown", handleTerminalInput);
}

// -------------------
// TERMINAL INPUT
// -------------------
function handleTerminalInput(e) {
  if (stage !== "terminal") return;

  if (e.key.length === 1 && e.key !== " ") {
    userInput += e.key;
    typedEl.textContent = userInput;
  } else if (e.key === "Backspace") {
    userInput = userInput.slice(0, -1);
    typedEl.textContent = userInput;
  } else if (e.key === "Enter") {
    runCommand(userInput.trim());
    userInput = "";
    typedEl.textContent = "";
  }
}

// -------------------
// RUN COMMAND
// -------------------
function runCommand(cmd) {
  if (!cmd) return;

  let response = commands[cmd];

  if (typeof response === "function") {
    response(); // e.g., clear
  } else if (response) {
    // Show the typed command above response (static)
    outputEl.innerHTML += `<div><span style="color:#00ff7f">${promptEl.textContent}</span> ${cmd}</div><div>${response}</div>`;
  } else {
    outputEl.innerHTML += `<div><span style="color:#00ff7f">${promptEl.textContent}</span> ${cmd}</div><div>Command not found. Try 'help'.</div>`;
  }

  // Scroll to bottom
  outputEl.scrollTop = outputEl.scrollHeight;
}

// -------------------
// INIT
// -------------------
document.addEventListener("keydown", handleLandingInput);

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
  // Hide terminal, show landing
  terminalEl.classList.add("hidden");
  landingEl.classList.remove("hidden");

  // Reset landing input
  nameInput = "";
  nameInputEl.textContent = "";

  // Clear terminal output and input
  outputEl.innerHTML = "";
  userInput = "";
  typedEl.textContent = "";

  // Remove terminal listener
  document.removeEventListener("keydown", handleTerminalInput);

  // Restore landing listener
  stage = "landing";
  document.addEventListener("keydown", handleLandingInput);
});
