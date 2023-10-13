
async function handleCodeCopying() {
  const copyButtonLabel = "Copy";
  await new Promise(r => setTimeout(r, 2000));
  // use a class selector if available
  let blocks = document.querySelectorAll("pre");

  blocks.forEach((block) => {

    //get prism class name from strings like language-x
    let name = block.className.split('-')[1];
    if (typeof name === 'undefined') {
      block.className = "language-undefined";
    };

    let div = document.createElement("div");
    block.prepend(div);

    if (typeof name !== 'undefined') {
      let p = document.createElement("p");
      p.innerText = name;
      div.appendChild(p);
    };

    // only add button if browser supports Clipboard API
    if (navigator.clipboard) {
      let button = document.createElement("button");

      button.innerText = copyButtonLabel;
      div.appendChild(button);

      button.addEventListener("click", async () => {
        await copyCode(block, button);
      });
    }
  });
};

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;
  const copyButtonLabel = "Copied";

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
};

export { handleCodeCopying };
