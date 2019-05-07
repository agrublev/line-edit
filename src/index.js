import chalk from "chalk";
import inquirer from "inquirer";
import { MultiSelect, Snippet, Select } from "enquirer";
import { boxInform } from "./helpers";
// import yosay from "yosay";
import colors from "ansi-colors";
const enable = (choices, fn) => choices.forEach(ch => (ch.enabled = fn(ch)));

export const run = async ({ question, ...rest }) => {
    console.log(chalk.bold.red("starti2asd22ng..."));
    return new Promise(resolve => {
        inquirer
            .prompt({
                type: `text`,
                name: `answer`,
                message: question + ": ",
                ...rest
            })
            .then(({ answer }) => {
                resolve(answer);
            });
    });
};

export const snippet = async ({ question, ...rest }) => {
    const prompt = new Select({
        name: "color",
        message: "Pick a color",
        header: boxInform({
            message: "welcome",
            secondary: "tohelll",
            padding: { left: 4, top: 0, bottom: 0, right: 4 }
        }), //chalk.bold.red("Welcome to my awesome generator!"),
        footer: colors.dim("(Scroll up and down to reveal more choices)"),
        limit: 5,
        choices: ["aqua", "black", "blue", "fuchsia", "gray", "green"]
    });
    return new Promise(resolve => {
        prompt
            .run()
            .then(answer => {
                console.log("Answer:", answer);
                resolve(answer);
            })
            .catch(console.error);
    });
};

export const form = async ({ question, ...rest }) => {
    // console.log(chalk.bold.red("starti2asd22ng..."));

    const formTem = new Snippet({
        name: "username",
        message: "Please add the following config values",
        template: `
      First Name: #{first_name}
       Last Name: #{last_name}
 GitHub username: #{username}
`
    });
    return new Promise(resolve => {
        formTem
            .run()
            .then(answer => {
                // console.log("Answer:", answer.result);
                resolve(answer.result);
            })
            .catch(console.error);
    });
};

export const multiSelect = async ({ question, ...rest }) => {
    let chociues = [
        { name: "lasagna", message: "Lasagna", initial: "yes", selected: true, enabled: true },
        { name: "pizza", message: "Pizza" },
        { name: "aapizza", message: "aaPizza", disabled: true },
        { name: "chicken_curry", message: "Chicken Curry" },
        { name: "tacos", message: "Tacos" }
    ];
    const mSelect = new MultiSelect({
        name: "food",
        message: "What are your favorite foods?",
        choiceMessage(state, choice) {
            if (chociues[choice].enabled) {
                return chalk.green(chociues[choice].name);
            }
            return chalk.red(chociues[choice].name);
        },
        indicator(state, choice) {
            if (choice.enabled) {
                return chalk.green.bold("◉");
            }
            return chalk.dim.gray("◯");
        },
        choices: chociues
    });

    const mSelect2 = new MultiSelect({
        name: "example-groups",
        message: "What packages do you want to install?",
        indicator(state, choice) {
            if (choice.enabled) {
                return chalk.green.bold("◉");
            }
            return chalk.dim.white.bgBlack("◯");
        },
        choices: [
            {
                name: "dependencies",
                choices: [{ name: "ansi-colors", hint: "Good description" }, { name: "picomatch" }]
            },
            { name: "devDependencies", choices: ["kind-of", "enquirer"] }
        ]
    });

    const mSelect3 = new MultiSelect({
        name: "food",
        message: "What are your favorite foods?",
        choices: [
            {
                name: "all",
                message: colors.italic("All"),
                onChoice(state, choice, i) {
                    if (state.index === i && choice.enabled) {
                        enable(state.choices, ch => ch.name !== "none");
                    }
                }
            },
            {
                name: "none",
                message: colors.italic("None"),
                onChoice(state, choice, i) {
                    if (state.index === i) {
                        if (choice.enabled) {
                            enable(state.choices, ch => ch.name === "none");
                        }
                    }
                    if (state.keypress && state.keypress.name === "a") choice.enabled = false;
                    if (state.index !== i && state.choices[state.index].enabled === true) {
                        choice.enabled = false;
                    }
                }
            },
            { role: "separator" },
            { name: "lasagna", message: "Lasagna" },
            { name: "pizza", message: "Pizza" },
            { name: "chicken_curry", message: "Chicken Curry" },
            { name: "tacos", message: "Tacos" }
        ],
        symbols: { indicator: "❤" },
        indicator(state, choice) {
            let style = choice.enabled ? colors.red : colors.dim.gray;
            return style(state.symbols.indicator);
        }
    });

    return new Promise(resolve => {
        mSelect2
            .run()
            .then(answer => {
                console.log("Answer:", answer);

                resolve(answer);
            })
            .catch(console.error);
    });
};

// module.exports = { run, snippet };
