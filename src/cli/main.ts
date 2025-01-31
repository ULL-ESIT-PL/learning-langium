import type { Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { MiniLogoLanguageMetaData } from '../language/generated/module.js';
import { createMiniLogoServices } from '../language/minilogo-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJSON } from './generator.js';
import { NodeFileSystem } from 'langium/node';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createMiniLogoServices(NodeFileSystem).miniLogoServices;
    const model = await extractAstNode<Model>(fileName, services);
    const generated = generateJSON(model);
    console.log(chalk.green(`Generated successfully: ${generated}`));
    const destination = opts.destination || '.';
    const destinationPath = path.resolve(destination, path.basename(fileName, path.extname(fileName)) + '.json');
    await fs.writeFile(destinationPath, generated); 
    console.log(chalk.green(`Generated file: ${destinationPath}`));
};

export const generateCmds = async (fileName: string): Promise<void> => {
    const services = createMiniLogoServices(NodeFileSystem).miniLogoServices;
    const model = await extractAstNode<Model>(fileName, services);
    const generatedResult = generateCmds(model);
    console.log(chalk.green(`Generated successfully: ${generatedResult}`));
};
export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    const fileExtensions = MiniLogoLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generateJSON')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code for the minilogo source file')
        .action(generateAction);

    program
        .command('generateCmds ')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code for the minilogo source file')
        .action(generateCmds);  

    program.parse(process.argv);
}
