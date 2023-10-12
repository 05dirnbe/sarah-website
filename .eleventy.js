const tailwindcss = require('tailwindcss');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const htmlmin = require('html-minifier')

module.exports = eleventyConfig => {
  eleventyConfig.setUseGitIgnore(false);

  /* Date filter */
  eleventyConfig.addFilter("date", require("./lib/filters/dates.js") );
  eleventyConfig.addFilter("isoDate", require("./lib/filters/isoDate.js") );

  // Bibitem filters
  eleventyConfig.addFilter("bibitem", require("./lib/filters/bibitem.js") );

  /* Get development environment variable */
  require('dotenv').config()
  const { ELEVENTY_ENV } = process.env

  /* Files and fonts */
  eleventyConfig.addPassthroughCopy({ "src/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "assets/fonts" });

  /* Smart quotes filter */
  const smartypants = require("smartypants");
  eleventyConfig.addFilter("smart", str => smartypants.smartypants(str, 'qDe'));

  /* Bibtex to markdown */
  eleventyConfig.addPairedShortcode(
    "bibtex",
    require("./lib/functions/bib_to_markdown.js")
  );

  /* Markdown Plugins */
  var uslug = require('uslug');
  var uslugify = s => uslug(s);
  var anchor = require('markdown-it-anchor');
  var markdownIt = require("markdown-it");
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    typographer: true
  }).use(anchor, {slugify: uslugify, tabIndex: false}));
  var mdIntro = markdownIt({
    typographer: true
  });
  eleventyConfig.addFilter("markdown", markdown => mdIntro.render(markdown));

  const slugify = require("slugify");
  eleventyConfig.addFilter("slugify", str => {
    return slugify(str, {
      customReplacements: [
        ['+', ' plus '],
        ['@', ' at ']
      ],
      remove: /[*~.,–—()'"‘’“”!?:;]/g,
      lower: true
    });
  });

  /* Code syntax highlighting */
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  // Watch tailwind definitions for changes
  eleventyConfig.addWatchTarget("./src/tailwind/");
  eleventyConfig.addWatchTarget("./tailwind.config.js");

  /* RSS */
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);

  /* List all tags */
  eleventyConfig.addFilter("tags", collection => {
    const notRendered = ['all', 'project', 'teaching', 'dissemination', 'service', 'theses', 'publication'];
    return Object.keys(collection)
      .filter(d => !notRendered.includes(d))
      .sort();
  });

  /* List tags belonging to a page */
  eleventyConfig.addFilter("tagsOnPage", tags => {
    const notRendered = ['all', 'project', 'teaching', 'dissemination', 'service', 'theses', 'publication'];
    return tags
      .filter(d => !notRendered.includes(d))
      .sort();
  });

  /* Sort by order in front matter */
  eleventyConfig.addFilter("ordered", collection => {
    return collection.sort((a, b) => a.data.order - b.data.order);
  });

  /* Add limit for output */
  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  /* Remove current post from output */
  eleventyConfig.addFilter("removeCurrent", (arr, title) => {
    return arr.filter(item => {
      return item.url && item.data.title !== title;
    });
  });

  /* Get all the years that blog posts were posted */
  eleventyConfig.addFilter("getYears", (arr) => {
    const dates = arr.map(post => post.date.getFullYear());
    const uniqueYears = [...new Set(dates)];
    return uniqueYears;
  });

  /* Filter items by year */
  eleventyConfig.addFilter("filterByYear", (arr, year) => {
    return arr.filter(item => {
      return item.date.getFullYear() == year;
    })
  });

  /* If promoted posts in frontmatter, output them first */
  eleventyConfig.addFilter("promoteRelated", (arr, related) => {
    const relatedPosts = arr.filter(item => {
      return item.url && (related || []).includes(item.url.replace("/research/", "").replace(".html", ""));
    });
    const unrelatedPosts = arr.filter(item => {
      return item.url && !(related || []).includes(item.url.replace("/research/", "").replace(".html", ""));
    });
    return relatedPosts.concat(unrelatedPosts);
  });

  /* Get current year for footer */
  eleventyConfig.addFilter("getCurrentYear", () => new Date().getFullYear());

  /* Get current date */
  eleventyConfig.addFilter("getCurrentDate", () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
  });

  // Localhost server config
  eleventyConfig.setServerOptions({
    port: 3000,
  });

  // // Tailwind config
  // eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
  //   postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
  //     .process(cssCode)
  //     .then(
  //       (r) => done(null, r.css),
  //       (e) => done(e, null)
  //     );
  // });

  //Setup for html minifier
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

      return content
  });


  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats : ["njk", "html", "md", "txt", "webmanifest", "ico"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };
};
