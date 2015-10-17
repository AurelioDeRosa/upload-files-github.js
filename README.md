# Upload files on GitHub using Github.js

This repository contains the demo I've developed as a part of [an article written for my blog](http://www.audero.it/blog/2015/10/17/upload-files-on-github-using-github-js). The project shows how to use Github.js to upload any file on GitHub, including images, documents, PDFs, and much more.

## Run the project

Before you can use the demo you have to perform two simple steps:

1. Update the `username`, `password`, and `repository` properties of the `config` variable defined in the [js/main.js](js/main.js) file:  
   - `username`is your username on GitHub.
   - `password` is either your password or, if you enabled the two-factor authentication on GitHub, [an authentication token](https://github.com/settings/tokens).
   - `repository` is the name of the repository where you want to upload the files.
   - `branchName` (optional) The name of the repository's branch you want to update. If the repository hasn't the branch you specify, the request will fail. If you don't change this value, the demo will search for a branch called `master`.
2. Once updated the configuration, run the following commands:
```bash
npm install
npm run-script build
```

Done! You're ready to go.

## License

This demo is licensed under the [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) ("Creative Commons Attribution 4.0").

## Author

[Aurelio De Rosa](http://www.audero.it) ([@AurelioDeRosa](https://twitter.com/AurelioDeRosa))