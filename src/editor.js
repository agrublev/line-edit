const LineByLineReader = require("line-by-line");

const path = require("path");
const lineReplace = require("line-replace");

let filePath = path.join(__dirname, "./testFoo.js");

const readTheLine = async function(f, n) {
    return new Promise(resolve => {
        let count = 1;
        // process.stdout.write("\x1b[2J");
        // process.stdout.write("\x1b[0f");
        const lr = new LineByLineReader(f, {
            encoding: "utf8",
            skipEmptyLines: false
            // start: 10,
            // end: 15
        });

        lr.on("error", function(err) {
            console.error("-- Console ER", err);
            // 'err' contains error object
        });

        lr.on("line", function(line) {
            if (count === n) {
                resolve(line);
            }
            count++;
            // 'line' contains the current line without the trailing newline character.
        });

        lr.on("end", function(e) {
            console.info("-- Console e", e);
            // All lines are read, file is closed now.
        });
    });
};

module.exports = async ({ file, line, selected, varName }) => {
    const lineText = await readTheLine(file, line);
    return new Promise(resolve => {
        lineReplace({
            file: file,
            line: line,
            text: `console.warn("LineEdit: ",${selected || varName});\n${lineText}`,
            addNewLine: true,
            callback: ({ file, line, text, replacedText }) => {
                resolve();
            }
        });
    });
};
