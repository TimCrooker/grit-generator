"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
module.exports = {
    prompts() {
        return [
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the new generator (must be grit-*)',
                default: `grit-${path_1.default.basename(this.outDir).replace(/^grit-/, '')}`,
                filter: val => val.toLowerCase(),
                validate: val => val.startsWith('grit-')
            },
            {
                name: 'description',
                type: 'input',
                message: 'How would you describe the new template',
                default: `my awesome new Grit generator`
            },
            {
                name: 'username',
                type: 'input',
                message: 'What is your GitHub username',
                default: this.gitUser.username || this.gitUser.name,
                filter: val => val.toLowerCase(),
                store: true
            },
            {
                name: 'email',
                type: 'input',
                message: 'What is your email?',
                default: this.gitUser.email,
                store: true
            },
            {
                name: 'website',
                type: 'input',
                message: 'The URL of your website',
                default(answers) {
                    return `github.com/${answers.username}`;
                },
                store: true
            }
        ];
    },
    actions: [
        {
            type: 'add',
            files: '**',
            transformExclude: 'template/**'
        },
        {
            type: 'move',
            patterns: {
                gitignore: '.gitignore',
                '_package.json': 'package.json'
            }
        }
    ],
    async completed() {
        this.gitInit();
        await this.npmInstall();
        this.showProjectTips();
    }
};
