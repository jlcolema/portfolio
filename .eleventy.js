const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
	// Output directory: _site

	// Copy `media/` to `_site/media`
	eleventyConfig.addPassthroughCopy("media");

	// Copy `assets` to `_site/assets`
	eleventyConfig.addPassthroughCopy("assets");

	// Inline Minified CSS
	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
};
