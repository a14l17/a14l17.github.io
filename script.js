
const output = document.getElementById("output");
const typed = document.getElementById("typed");

let commands = {
  help: "Available commands: about, projects, contact, clear",
  about: "Hi! I’m Alex, a data scientist passionate about ML and visualization.",
  projects: "1. Predictive Model  2. Data Dashboard  3. NLP Analysis",
  contact: "Email: alex@example.com | GitHub: alexdev",
  clear: () => output.innerHTML = ""
};

let current = "";

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) {
    current += e.key;
    typed.textContent = current;
  } else if (e.key === "Backspace") {
    current = current.slice(0, -1);
    typed.textContent = current;
  } else if (e.key === "Enter") {
    runCommand(current);
    current = "";
    typed.textContent = "";
  }
});

function runCommand(cmd) {
  let response = commands[cmd];
  if (typeof response === "function") {
    response();
  } else if (response) {
    output.innerHTML += `<div>visitor@alex:~$ ${cmd}</div><div>${response}</div>`;
  } else {
    output.innerHTML += `<div>visitor@alex:~$ ${cmd}</div><div>command not found</div>`;
  }
  window.scrollTo(0, document.body.scrollHeight);
}
