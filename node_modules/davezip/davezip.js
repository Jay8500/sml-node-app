var myVersion = "0.4.4", myProductName = "davezip";

const fs = require ("fs"); 
const utils = require ("daveutils");
const archiver =  require ("archiver");

exports.createArchive = function (f, callback) {
	var theArchive = {
		output: fs.createWriteStream (f),
		archive: archiver ('zip', {
			zlib: {level: 9} 
			}),
		addFileToArchive: function (f, options) {
			theArchive.archive.file (f, options);
			},
		addDirectoryToArchive: function (folder, name) {
			theArchive.archive.directory (folder, name);
			},
		finalize: function () {
			theArchive.archive.finalize ();
			}
		};
	
	theArchive.output.on ('close', function() {
		if (callback !== undefined) {
			var data = {
				f: f,
				size: theArchive.archive.pointer ()
				};
			callback (undefined, data);
			}
		});
	theArchive.output.on ("end", function () {
		});
	theArchive.archive.on ("error", function (err) {
		if (callback !== undefined) {
			callback (err);
			}
		throw err;
		});
	theArchive.archive.pipe (theArchive.output);
	
	return (theArchive);
	};
