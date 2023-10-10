const Cite = require('citation-js');
const { plugins } = require('@citation-js/core');
const Autolinker = require('autolinker');


let config = plugins.config.get('@csl')

// Load custom citation style from file
const fs = require("fs");
const template = fs.readFileSync("./lib/citation/ama.csl", "utf-8");
const templateName = 'custom'
config.templates.add(templateName, template)

// Load custom language locale from file
const language = 'en-GB'
const locale = fs.readFileSync("./lib/citation/locales-en-GB.xml", "utf-8");
config.locales.add(language, locale)

/**
 * Converts Bibtex references into APA-styled HTML.
 *
 * @param {*} content Bibtex references
 * @returns
 */
module.exports = function(content) {

  let config = plugins.config.get('@bibtex');

  let bibtexCounter = 1;

  // Parse bibtex string
  const input = Cite.input(content, '@bibtex/text');

  // Put in Cite object and get HTML out of it!
  const data = new Cite(input);
  const html = data.format('bibliography', {
    format: 'html',
    template: 'ama',
    lang: language
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
