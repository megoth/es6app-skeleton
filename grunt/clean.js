module.exports = {
  preBuild: ['css', 'slides'],
  postBuild: ['slides/slides.env.html']
};