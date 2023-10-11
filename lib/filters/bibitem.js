const Cite = require('citation-js');
const { plugins } = require('@citation-js/core');
const Autolinker = require('autolinker');

let config = plugins.config.get('@csl');

// Load custom citation style from file
const fs = require("fs");
const template = fs.readFileSync("./lib/citation/ama.csl", "utf-8");
const templateName = 'custom';
config.templates.add(templateName, template);

// Load custom language locale from file
const language = 'en-GB'
const locale = fs.readFileSync("./lib/citation/locales-en-GB.xml", "utf-8");
config.locales.add(language, locale);


// Generate the citation from a given input and format the output as html
function generate_citation_html(input) {

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

// Mutate citation id to generate unique html entry id fields
function add_id_suffix(selection, suffix) {

  selection.forEach(function(item) {
    item.id += ('-'+this.field);
  }, { field: suffix });

  return selection;
};

// Select only title field from full bib element
function select_field_title(input, field = 'title') {

  var selection = input.map((item) => {
      return {
         id: item.id,
         type: item.type,
         'citation-key': item['citation-key'],
         title: item.title
      };
  });

  return add_id_suffix(selection, field);
};

// Select only title field from full bib element
function select_field_author(input, field = 'author') {

  var selection = input.map((item) => {
      return {
         id: item.id,
         type: item.type,
         'citation-key': item['citation-key'],
         author: item.author
      };
  });

  return add_id_suffix(selection, field);
};

// Select eveything except title and author
function select_field_other(input, field = 'other') {

  var selection = input.map((item) => {
      const {title, author, ...selection} = item;
      return selection;
  });

  return add_id_suffix(selection, field);
};


/*
An extractor for getting selected fields of bibitems properly rendered as html
*/
module.exports = function(markdown, field) {


  // Parse bibtex string
  const full_citation = Cite.input(markdown, '@bibtex/text');

  // console.log(full_citation)

  if(field == 'title') {
    return generate_citation_html(select_field_title(full_citation));
  } else if (field == 'author') {
    return generate_citation_html(select_field_author(full_citation));
  } else if (field == 'other') {
    return generate_citation_html(select_field_other(full_citation));
  } else {
    return generate_citation_html(full_citation);
  };
};

