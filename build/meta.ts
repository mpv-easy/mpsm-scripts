import { writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const files = readdirSync("./es5");
for (const name of files) {
	const metaPath = join("./src", name.replace(".js", ".meta"));
	const jsPath = join("./es5", name);
	const meta = readFileSync(metaPath, "utf8");
	const js = readFileSync(jsPath, "utf8");

	writeFileSync(jsPath, [meta, js].join("\n\n"));
}
