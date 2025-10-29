// -------------------
// Elements
// -------------------
const nameInputEl = document.getElementById("name-input");
const landingEl = document.getElementById("landing");
const terminalEl = document.getElementById("terminal");
const outputEl = document.getElementById("output");
const typedEl = document.getElementById("typed");
const promptEl = document.getElementById("terminal-prompt");
const backBtn = document.getElementById("back-btn");

let nameInput = "";
let userInput = "";
let stage = "landing"; // 'landing' or 'terminal'

// -------------------
// Terminal commands
// -------------------
const commands = {
  help: "Available commands: about, projects, skills, resume, clear, exit",
  about: "Hi, I’m a data enthusiast passionate about pushing for positive impact and internet safety.",
  projects: "1. from mind to matter - aka gamifying the human experience",
  skills: "python, sql, blah blah (present a skills hexagon)",
  resume: "📄 <a href='#' target='_blank'>View Resume</a>",
  clear: () => outputEl.innerHTML = "",
  exit: () => backToLanding()
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

  promptEl.textContent = `welcome@portfolio:~$`;

  outputEl.innerHTML = `
    <div>Welcome, <strong>${name}</strong>!</div>
    <div>Type 'help' to get started.</div>
  `;

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
    response(); // e.g., clear or exit
  } else if (response) {
    outputEl.innerHTML += `<div><span style="color:#00ff7f">${promptEl.textContent}</span> ${cmd}</div><div>${response}</div>`;
  } else {
    outputEl.innerHTML += `<div><span style="color:#00ff7f">${promptEl.textContent}</span> ${cmd}</div><div>Command not found. Try 'help'.</div>`;
  }

  outputEl.scrollTop = outputEl.scrollHeight;
}

// -------------------
// BACK BUTTON FUNCTION
// -------------------
backBtn.addEventListener("click", backToLanding);

function backToLanding() {
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

  // Remove terminal key listener
  document.removeEventListener("keydown", handleTerminalInput);

  // Restore landing listener
  stage = "landing";
  document.addEventListener("keydown", handleLandingInput);
}

// -------------------
// INIT
// -------------------
document.addEventListener("keydown", handleLandingInput);
