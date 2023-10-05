const Cite = require('citation-js');
const Autolinker = require('autolinker');

/**
 * Converts Bibtex references into APA-styled HTML.
 *
 * @param {*} content Bibtex references
 * @returns
 */
module.exports = function(content) {
  let bibtexCounter = 1;

  // Parse bibtex string
  const input = Cite.input(content);

  // Put in Cite object and get HTML out of it!
  const data = new Cite(input);
  const html = data.format('bibliography', {
    format: 'html',
    template: 'apa',
    lang: 'en-US'
  });

  // Convert all links in the output HTML to actual <a> tags
  return Autolinker.link(html, {
    newWindow: true,
    email: false,
    phone: false,
    stripPrefix: false,
    stripTrailingSlash: false,
    className: "no-underline",
  });
};
