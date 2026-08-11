const { spawn } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

function isProjectType(arg) {
  return arg === "frontend" || arg === "backend";
}

// Parse arguments in a backward-compatible way:
//   npm run init -- <part> <projectName> [type] [...extraArgs]
// Type defaults to "frontend" so existing scripts keep working.
let part = args[0];
let projectName = args[1];
let type = "frontend";
let extraArgs = args.slice(2);

if (isProjectType(args[2])) {
  type = args[2];
  extraArgs = args.slice(3);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function run(command, commandArgs, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, options);
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0 || code === null) {
        resolve();
      } else {
        reject(
          new Error(
            `Command "${command} ${commandArgs.join(" ")}" exited with code ${code}`,
          ),
        );
      }
    });
  });
}

async function initFrontend(target) {
  console.log(`Creating Vite project in ${target}...`);

  await run("npm", ["create", "vite@latest", target, ...extraArgs], {
    stdio: "inherit",
  });
}

async function initBackend(target) {
  console.log(`Creating backend project in ${target}...`);

  if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
    throw new Error(`Directory ${target} already exists and is not empty.`);
  }

  fs.mkdirSync(target, { recursive: true });

  const packageJson = {
    name: projectName,
    version: "0.0.1",
    type: "commonjs",
    main: "index.js",
    scripts: {
      start: "node index.js",
      dev: "node --watch index.js",
      test: 'echo "Error: no test specified" && exit 1',
    },
    dependencies: {
      express: "^5.2.1",
    },
  };

  fs.writeFileSync(
    path.join(target, "package.json"),
    JSON.stringify(packageJson, null, 2) + "\n",
  );

  const indexJs = `const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

  fs.writeFileSync(path.join(target, "index.js"), indexJs);

  console.log("Installing dependencies...");
  await run("npm", ["install", ...extraArgs], {
    stdio: "inherit",
    cwd: target,
  });
}

async function main() {
  if (!part) {
    part = await ask("Part folder (e.g. part2): ");
  }

  if (!projectName) {
    projectName = await ask("Project name: ");
  }

  if (!isProjectType(type)) {
    const answer = await ask(
      "Project type (frontend/backend, default frontend): ",
    );
    type = answer || "frontend";
  }

  if (!isProjectType(type)) {
    console.error(
      `Unknown project type: "${type}". Use "frontend" or "backend".`,
    );
    process.exit(1);
  }

  const target = `${part}/${projectName}`;

  rl.close();

  if (type === "backend") {
    await initBackend(target);
  } else {
    await initFrontend(target);
  }

  console.log(`Project initialized in ${target}`);
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
