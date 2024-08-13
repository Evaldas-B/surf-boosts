import { Boost } from "@/utils/storage/boosts"
import pack from "./_pack"

const boost: Boost = {
  id: "oyc3jihc4tlvxkrh4o8i85px",
  name: "Update H1",
  pack: pack.name,
  isPublic: true,
  matchPatterns: ["*://*.example.com/*"],
  category: "Index Page",
  group: "Macros",
  javascript: `
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
  });
`,
}

export default boost
