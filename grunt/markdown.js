module.exports = {
	slides: {
    files: [
      {
      	expand: true,
      	cwd: 'slides/md',
        src: '*.md',
        dest: 'slides/',
        ext: '.html'
      }
    ],
    options: {
      template: 'slides/md/template.jst'
    }
  }
};