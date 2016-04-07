# TDD, Test Driven Development

Writing tests to make sure all the applications in the feed reader blog is working properly.


## How to download and build
The files in the `dist` folder are minified and ready to use.

From the `src` code
- download `package.json`, `gulpfile.js` and the `src` folder and put in a _directory_ of your choice on your computer
- direct yourself to _the directory_ that you choosed in the terminal and run `npm install`. This will create a file `node-modules` in your directory with the files you need to run `gulp`.
- run `gulp`, which will _minify_ all of the **css and js** files and put them in a directory called `dist` in the correct folders. It will also copy all the other files to their correct destinations.
- open `index.html` from the `dist` file in your favorite browser

###Gulpfile.js
The gulpfile.js also contains jshint, which has been used for validateing the js files and jsbeautifier which will prettify the feedreader.js test file. The .js files (that are not in a lib directory) have been concatenated and minified into a `all.min.js` file in the `js/` folder


# The tests include
In the test suite `RSS Feeds`.
- A test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
- A test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.

In the test suite `The menu`.
- A test that ensures the menu element is hidden by default. 
- A test that ensures the menu changes visibility when the menu icon is clicked. The test have two expectations: does the menu display when clicked and does it hide when clicked again.

In the test suite `Initial Entries`.
- A test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. The function loadFeed() is asynchronous so this test requires the use of Jasmine's beforeEach and asynchronous done() function.

In the test suite `New Feed Selection`.
- A test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. 

