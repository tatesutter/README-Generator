// TODO: Include packages needed for this application
import inquirer from "inquirer";
import fs from "fs";


// TODO: Create an array of questions for user input
const questions = [
    "What is the title of your project?",
    "What is the description of your project?",
    "What are the installation instructions for your project?",
    "What is the usage information for your project?",
    "What are the contribution guidelines for your project?",
    "What are the test instructions for your project?",
    "What is your GitHub username?",
    "What is your email address?",
    "Choose a license for your project"
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("README.md file has been created!");
    });
}


function generateReadMe(response) {
    // Generate license badge based on user choice
    const licenseBadge = response.license !== "None" 
        ? `![License](https://img.shields.io/badge/license-${response.license.replace(/ /g, "%20")}-blue.svg)` 
        : "";

    // Generate license text
    const licenseNotice = response.license !== "None"
        ? `This application is covered under the ${response.license} license.`
        : "This application is not licensed.";

    return `
# ${response.title}
${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [License](#license)
- [Questions](#questions)

## Description
${response.description}

## Installation Instructions
${response.installation}

## Usage Information
${response.usage}

## Contribution Guidelines
${response.contribution}

## Test Instructions
${response.test}

## License
${licenseNotice}

## Questions
If you have any questions, you can reach out to me through:
- GitHub: [${response.github}](https://github.com/${response.github})
- Email: [${response.email}](mailto:${response.email})
`;
}


// Updated init function
function init() {
    inquirer.prompt([
        {
            type: "input",
            message: questions[0],
            name: "title"
        },
        {
            type: "input",
            message: questions[1],
            name: "description"
        },
        {
            type: "input",
            message: questions[2],
            name: "installation"
        },
        {
            type: "input",
            message: questions[3],
            name: "usage"
        },
        {
            type: "input",
            message: questions[4],
            name: "contribution"
        },
        {
            type: "input",
            message: questions[5],
            name: "test"
        },
        {
            type: "input",
            message: questions[6],
            name: "github"
        },
        {
            type: "input",
            message: questions[7],
            name: "email"
        },
        {
            type: "list",
            message: questions[8],
            name: "license",
            choices: ["MIT", "Apache 2.0", "GPL v3", "BSD 3-Clause", "None"]
        }
    ]).then((response) => {
        const data = generateReadMe(response);
        writeToFile("README.md", data);
    });
}

// Function call to initialize app
init();
