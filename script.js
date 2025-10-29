const nameInputEl = document.getElementById("name-input");
const landingEl = document.getElementById("landing");
const terminalEl = document.getElementById("terminal");
const outputEl = document.getElementById("output");
const typedEl = document.getElementById("typed");
const promptEl = document.getElementById("terminal-prompt");

let nameInput = "";
let userInput = "";
let stage = "landing"; // stages: landing → terminal

const commands = {
  help: "Available commands: about, projects, skills, resume, clear",
  about: "Hi, I’m a data enthusiast passionate about building and visualizing machine learning models.",
  projects: "1. Predictive Analytics<br>2. Data Visualization Dashboard<br>3. NLP Sentiment Model",
  skills: "Python | SQL | Tableau | Scikit-learn | React",
  resume: "📄 <a href='#' target='_blank'>View Resume</a>",
  clear: () => outputEl.innerHTML = ""
};

// --- LANDING SCREEN ---
document.addEventListener("keydown", (e) => {
  if (stage === "landing") {
    if (e.key.length === 1 && e.key !== " ") {
      nameInput += e.key;
      nameInputEl.textContent = nameInput;
    } else if (e.key === "Backspace") {
      nameInput = nameInput.slice(0, -1);
      nameInputEl.textContent = nameInput;
    } else if (e.key === "Enter" && nameInput.trim() !== "") {
      startTerminal(nameInput);
    }
  } else if (stage === "terminal") {
    handleTerminalInput(e);
  }
});

// --- TRANSITION TO TERMINAL ---
function startTerminal(name) {
  landingEl.classList.add("hidden");
  terminalEl.classList.remove("hidden");
  promptEl.textContent = `${name}@portfolio:~$`;
  outputEl.innerHTML = `<div>Welcome, <strong>${name}</strong>!</div><div>Type 'help' to get started.</div>`;
  stage = "terminal";
}

// --- TERMINAL INPUT HANDLER ---
function handleTerminalInput(e) {
  if (e.key.length === 1 && e.key !== " ") {
    userInput += e.key;
    typedEl.textContent = userInput;
  } else if (e.key === "Backspace") {
    userInput = userInput.slice(0, -1);
    typedEl.textContent = userInput;
  } else if (e.key === "Enter") {
    runCommand(userInput);
    userInput = "";
    typedEl.textContent = "";
  }
}

// --- COMMAND PROCESSOR ---
function runCommand(cmd) {
  let response = commands[cmd];
  if (typeof response === "function") {
    response();
  } else if (response) {
    outputEl.innerHTML += `<div>${promptEl.textContent} ${cmd}</div><div>${response}</div>`;
  } else {
    outputEl.innerHTML += `<div>${promptEl.textContent} ${cmd}</div><div>Command not found. Try 'help'.</div>`;
  }
  outputEl.scrollTop = outputEl.scrollHeight;
}
