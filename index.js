// #!/usr/bin/env node
const argv = require("yargs").argv;
import { run, snippet, multiSelect, form } from "./src/index.js";
import editor from "./src/editor";
import chalk from "chalk";

process.stdout.write("\x1b[2J");
process.stdout.write("\x1b[0f");
console.log(`${chalk.gray.bgWhite("Updated " + new Date())}`);

(async function() {
    // console.log(chalk.green("Starting..."));
    //
    // // let aa = await run({ question: "HOW IS IT" });
    // // let aas = await snippet({ question: "HOW IS IT" });
    // let aas = await multiSelect({ question: "HssIS IT" });
    // // console.warn("-- Console UIT US", aas);
    // // let aas = await form({ question: "HOW IS IT" });
    //
    // console.warn("-- Console UIT US", aas);
    //--file=$FilePath$ --line=$LineNumber$ --selected=$SelectedText$ --extra=$Prompt$
    // if (argv.ships > 3 && argv.distance < 53.5) {
    //     console.log("Plunder more riffiwobbles!");
    // } else {
    //     console.log("Retreat from the xupptumblers!");
    // }
    const { file, line, selected = "", varName = "" } = argv;
    await editor({ file, line, selected, varName });
})();
