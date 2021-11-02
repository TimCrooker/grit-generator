"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    prompts() {
        return [
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the new generator (must be sao-*)',
                default: `sao-${this.outDir.replace(/^sao-/, '')}`,
                filter: val => val.toLowerCase(),
                validate: val => val.startsWith('sao-')
            },
            {
                name: 'description',
                type: 'input',
                message: 'How would you describe the new template',
                default: `my awesome SAO generator`
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
                default(data) {
                    return `github.com/${data.answers.username}`;
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
                // If we use `package.json` directly
                // Then `template` folder will be treated as a package too, which isn't safe
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
