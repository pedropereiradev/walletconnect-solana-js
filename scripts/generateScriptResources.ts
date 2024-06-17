import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let code = 'export const scripts = {\n';

const outputDirectory = `${__dirname}/../verification-script/out/release`;
const abiPath = `${outputDirectory}/verification-script-abi.json`;
const bytecodePath = `${outputDirectory}/verification-script.bin`;

const abi = fs.readFileSync(abiPath, 'utf8');
const bytecode = fs.readFileSync(bytecodePath);

code += `  'verification-script': {\n`;
code += `    abi: ${abi},\n`;
code += `    bytecode: base64ToUint8Array('${bytecode.toString('base64')}'),\n`;
code += '  },\n';

code += `
};

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
`;

fs.writeFileSync(`${__dirname}/../src/generated/script-release.ts`, code);
console.log('Generated');
