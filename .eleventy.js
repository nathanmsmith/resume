const yaml = require('js-yaml')
const katex = require('katex')
const pluginSass = require('eleventy-plugin-sass')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginSass, { watch: 'source/*.{scss,sass}' })

  eleventyConfig.addFilter('katex', (value) => {
    if (value.toLowerCase() === 'latex') {
      return katex.renderToString('\\LaTeX').trim()
    }
    return value.trim()
  })

  eleventyConfig.addDataExtension('yaml', (contents) => yaml.safeLoad(contents))
  // eleventyConfig.dir = { data: '.' }
  // return eleventyConfig
}
