const yaml = require('js-yaml');
const katex = require('katex');
const PostCSSPlugin = require('eleventy-plugin-postcss');
const MarkdownIt = require("markdown-it");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(PostCSSPlugin);

  const mdRender = new MarkdownIt();
  eleventyConfig.addFilter("md", (rawString) => {
    const renderedMd = mdRender.render(rawString);
    return renderedMd.replace("<p>", "").replace("</p>", "");
  });

  eleventyConfig.addFilter('katex', (value) => {
    if (value.toLowerCase() === 'latex') {
      return katex.renderToString('\\LaTeX').trim();
    }
    return value.trim();
  });

  eleventyConfig.addFilter('formatCourse', (course) => {
    if (typeof course === 'string') return course;

    let output = course.title;
    if (course.TA) {
      output += '<div class="course-info">(Undergraduate TA)</div>';
    }
    if (course.graduate) {
      output += '<div class="course-info">(Graduate Level Course)</div>';
    }
    return output;
  });

  eleventyConfig.addPairedHandlebarsShortcode('currentDate', () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return today.toLocaleString('en-US', options);
  });

  eleventyConfig.addFilter('arrayToText', (array) => {
    const text = array.join(', ');
    return text;
  });

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // eleventyConfig.dir = { data: '.' }
  // return eleventyConfig
};
