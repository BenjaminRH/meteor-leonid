Npm.depends({
	'ddp': '0.3.2'
});

Package.on_use(function (api) {
	api.add_files('ddp.js', 'server');
});