const { spawn } = require("child_process");
const readline = require("readline");

const args = process.argv.slice(2);
let part = args[0];
let projectName = args[1];
const extraArgs = args.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function main() {
  if (!part) {
    part = await ask("Part folder (e.g. part2): ");
  }

  if (!projectName) {
    projectName = await ask("Project name: ");
  }

  const target = `${part}/${projectName}`;

  rl.close();

  console.log(`Creating Vite project in ${target}...`);

  const child = spawn("npm", ["create", "vite@latest", target, ...extraArgs], {
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
