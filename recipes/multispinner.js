const colors = require('ansi-colors');
const spinners = require('cli-spinners');
const Prompt = require('../lib/prompts/multiselect');
const animate = require('./animate');

const prompt = new Prompt({
  name: 'example-groups',
  message: 'What are your favorite colors?',
  hint: 'Thinking...',
  choices: ['Foo', 'Bar', 'Baz']
});

const separator = animate(prompt, 'separator', { ...spinners.star, styles: ['cyan', 'white', 'dim', 'white', 'cyan', 'white'], blacklist: [] });
const prefix = animate(prompt, 'prefix', { ...spinners.christmas, offset: 50, interval: 1000, styles: ['none'] });

prompt.once('run', () => {
  separator.start();
  prefix.start();
});

setTimeout(() => {
  separator.stop();
  prompt.symbols.separator = prompt.symbols.bullet;
}, 300);

prompt.once('close', () => {
  separator.stop();
  prefix.stop();
});

prompt.run()
  .then(answer => console.log('Answer:', answer))
  .catch(console.error);
