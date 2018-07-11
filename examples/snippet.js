const Prompt = require('../recipes/snippet');
const prompt = new Prompt({
  name: 'username',
  message: 'What is your GitHub username?',
  initial: {
    name: 'awesome-lib'
  },
  template: `{
  "name": "{{name}}",
  "description": "{{description}}",
  "version": "{{version}}",
  "homepage": "https://github.com/{{username}}/{{name}}",
  "author": "{{author_name}} (https://github.com/{{username}})",
  "repository": "{{username}}/{{name}}",
  "bugs": {
    "url": "https://github.com/{{username}}/{{name}}/issues"
  },
  "engines": {
    "node": ">=4"
  },
  "license": "{{license}}",
  "scripts": {
    "test": "mocha"
  },
  "keywords": []
}
`
});

prompt.run()
  // .then(answer => console.log('Answer:', answer))
  .catch(console.error);
