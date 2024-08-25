import createBoostFactory from "@/packs-builder/createBoostFactory"
import { js } from "@/packs-builder/templateLiterals"

const createBoost = createBoostFactory(import.meta.url)

export default createBoost({
  matchPatterns: ["*://*.example.com/*"],
  javascript: await js`
  const button = document.createElement('button');
  button.textContent = 'Click me';

  const div = document.querySelector("div")
  div.appendChild(button);

  button.addEventListener('click', () => {
    const h1 = document.querySelector('h1');
    if (h1) {
      h1.textContent = 'changed';
    } else {
      console.log('No h1 element found');
    }
  });`,
})
