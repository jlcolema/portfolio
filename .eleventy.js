const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {

	let metadata = await Image(src, {
		urlPath: "/media/work/",
		widths: [300, 600, null],
		formats: ["jpg"]
	});

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

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

	// Images
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

 // Get only content that matches a tag
	  eleventyConfig.addCollection("work", function(collectionApi) {
		return collectionApi.getFilteredByTag("project");
	  });

	return {
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site"
		}
	};
};
