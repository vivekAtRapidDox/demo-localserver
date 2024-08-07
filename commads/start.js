const path =  require("node:path");
const fs =  require("node:fs/promises");

const ext = (file) => path.extname(file).toLowerCase();

async function start(args) {
    fs.appendFile('./logs.txt', "Indside Start function \n")
	try {
        const decodedString = args.toString('utf-8');
        fs.appendFile('./logs.txt', `decodedString ${decodedString} \n`)
        if (decodedString === "[object Object]") {
            console.log("The buffer contains '[object Object]', which is not a valid JSON string.");
            console.log("You may need to stringify your object before converting it to a buffer.");
            return;
        }
        try {
            const jsonObject = JSON.parse(decodedString);
            console.log("Parsed JSON object:", jsonObject);
            
            const source = jsonObject.source;
            fs.appendFile('./logs.txt', `source => ${source} \n`)

			const filesAll = source && (await fs.readdir(source))
            .filter(file => [".twbx", ".twb"].includes(ext(file)))
            .map(file => path.join(source, file));
            
			console.log(filesAll);
        } catch (jsonError) {
            console.log("The decoded string is not a valid JSON:", jsonError.message);
        }
		
    } catch (error) {
        console.error("Error occured while processing." + (error && error instanceof Error ? error.stack : ""));
        fs.appendFile('./logs.txt', `error ${error} \n`)
		process.exit(500);
	}
}

module.exports = start