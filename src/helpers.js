import boxen from "boxen";
import chalk from "chalk";

export const boxInform = async ({ message = "", secondary = "", ...rest }) => {
    console.log(
        boxen(
            chalk.hex("#717877")(" ") +
                chalk.bold.underline.hex("#438b34")(message) +
                chalk.hex("#717877")(" ") +
                chalk.hex("#717877")(secondary ? "\n" + secondary : ""),
            {
                padding: 0,
                margin: { left: 2, top: 0, bottom: 0, right: 0 },
                borderStyle: {
                    topLeft: chalk.hex("#5a596d")("╔"),
                    topRight: chalk.hex("#5a596d")("╗"),
                    bottomLeft: chalk.hex("#5a596d")("╚"),
                    bottomRight: chalk.hex("#5a596d")("╝"),
                    horizontal: chalk.hex("#5a596d")("═"),
                    vertical: chalk.hex("#5a596d")("║")
                }, //"round",
                align: "center",
                ...rest
            }
        )
    );
};
