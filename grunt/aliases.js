module.exports = {
	'default': ['http-server'],
	'dev': ['clean:preBuild', 'wintersmith:local', 'copy:slides', 'compass', 'clean:postBuild'],
	'con': ['dev', 'watch:dev']
};