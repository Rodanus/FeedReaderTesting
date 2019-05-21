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
    /* This suite is all about the RSS
    *  feeds definitions, the allFeeds variable in our application.
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


        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have URLs", () => {
            allFeeds.forEach(obj => {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).toBeGreaterThan(0);
            });
        });


        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have names", () => {
            allFeeds.forEach(obj => {
                expect(obj.name).toBeDefined();
                expect(obj.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* new test suite "The menu" */
    describe("The menu", () => {
        let body,
            menuIcon;

        beforeEach(() => {
           body = document.querySelector("body"),
           menuIcon = document.querySelector(".menu-icon-link");
        });

        /* ensures the menu element is
         * hidden by default.
         */
        it("the menu is hidden by default", () => {
            expect(body).toHaveClass("menu-hidden");
        });

         /* ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it("the menu changes visibility when menu icon is clicked", () => {
            menuIcon.click();
            expect(body).not.toHaveClass("menu-hidden");

            menuIcon.click();
            expect(body).toHaveClass("menu-hidden");
        });
    });

    /* new test suite "Initial Entries" */
    describe("Initial Entries", () => {
        let entries;

        beforeEach( done => {
            loadFeed(0, done);
        });

        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it("there is one or more element within .feed container", done => {
            entries = document.querySelectorAll(".feed .entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });

    });


    /* new test suite "New Feed Selection" */
    describe("New Feed Selection", () => {
        let feedLink, // to store first element's link
            feedsContainer = document.querySelector(".feed");

        beforeEach( done => {
            setTimeout(() => {
                // before laoding a new feed, store first element's link.
                feedLink = feedsContainer.firstElementChild.href;
                loadFeed(1, done);
            }, 2000);

        });

        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it("content changes when a new feed is loaded", done => {
            setTimeout(() => {
                expect(feedsContainer.firstElementChild.href).not.toBe(feedLink);
                done();
            }, 4000);
        });

    });

}());
