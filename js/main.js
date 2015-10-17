'use strict';

var GitHub = require('./github');
var config = {
   username: 'YOUR_USERNAME',
   password: 'YOUR_PASSWORD', // Either your password or an authentication token if two-factor authentication is enabled
   auth: 'basic',
   repository: 'A_REPOSITORY_NAME',
   branchName: 'master'
};
var gitHub = new GitHub(config);

/**
 * Reads the content of the file provided. Returns a promise whose resolved value is an object literal containing the
 * name (<code>filename</code> property) and the content (<code>content</code> property) of the file.
 *
 * @param {File} file The file to read
 *
 * @returns {Promise}
 */
function readFile(file) {
   return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function (event) {
         var content = event.target.result;

         // Strip out the information about the mime type of the file and the encoding
         // at the beginning of the file (e.g. data:image/gif;base64,).
         content = atob(content.replace(/^(.+,)/, ''));

         resolve({
            filename: file.name,
            content: content
         });
      });

      fileReader.addEventListener('error', function (error) {
         reject(error);
      });

      fileReader.readAsDataURL(file);
   });
}

/**
 * Save the files provided on the repository with the commit title specified. Each file will be saved with
 * a different commit.
 *
 * @param {FileList} files The files to save
 * @param {string} commitTitle The commit title
 *
 * @returns {Promise}
 */
function uploadFiles(files, commitTitle) {
   // Creates an array of Promises resolved when the content
   // of the file provided is read successfully.
   var filesPromises = [].map.call(files, readFile);

   return Promise
      .all(filesPromises)
      .then(function(files) {
         return files.reduce(
            function(promise, file) {
               return promise.then(function() {
                  // Upload the file on GitHub
                  return gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: config.branchName,
                     filename: file.filename,
                     content: file.content,
                     commitTitle: commitTitle
                  });
               });
            },
            Promise.resolve()
         );
      });
}

document.querySelector('form').addEventListener('submit', function (event) {
   event.preventDefault();

   var files = document.getElementById('file').files;
   var commitTitle = document.getElementById('commit-title').value;

   uploadFiles(files, commitTitle)
      .then(function() {
         alert('Your file has been saved correctly.');
      })
      .catch(function(err) {
         console.error(err);
         alert('Something went wrong. Please, try again.');
      });
});