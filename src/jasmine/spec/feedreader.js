/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('each feed has a URL defined and it is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined and it is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /*added function before each of the specs to test the elements to have a class*/
        beforeEach(function() {
            jasmine.addMatchers({
                toHaveClass: function() {
                    return {
                        compare: function(actual, className) {
                            return {
                                pass: $(actual).hasClass(className)
                            };
                        }
                    };
                },
            });
        });

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should have class "menu-hidden" by default', function() {
            var body = $('body');
            expect(body).toHaveClass("menu-hidden");
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('toggles between hidden and visible on click', function() {
            $trigger = $('.menu-icon-link');
            $body = $('body');
            //click first time toggleClass
            $trigger.trigger('click');
            expect($body).not.toHaveClass('menu-hidden');
            //click second time
            $trigger.trigger('click');
            expect($body).toHaveClass('menu-hidden');
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* add a funciton to test for a dom element to exist*/
        beforeEach(function() {
            jasmine.addMatchers({
                toExist: function() {
                    return {
                        compare: function(actual) {
                            return {
                                pass: $(actual).length
                            };
                        }
                    };
                }
            });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });


        // Here the done call is not needed, as long as there is no additional code waiting for this it to finish. Also, apart from deleting the done() call, the done parameter must be deleted as well.
        it('should have at least one entry', function() {
            expect($('.feed .entry')).toExist();
        });

    });

    /* A new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        var oldEntryContent;
        var newEntryContent;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                $entry = $('.entry');
                oldEntryContent = $entry[0].innerText; //the headline of the first entry
                loadFeed(1, function() {
                    $entry = $('.entry');
                    newEntryContent = $entry[0].innerText; //the headline of the first entry
                    done();
                });
            });
        });

        it('should alter the content', function(done) {
            expect(oldEntryContent).not.toEqual(newEntryContent); //testing if the first headlines of the two different loadFeeds are different
            done();
        });

    });
}());