Tests are broken up into three distinct types- unit and integration, and benchmark tests.

See the README.md file in each directory for more information about the distinction and purpose of each type of test.

The following conventions are true for all three types of tests:

    Instead of partitioning tests for various components into subdirectories, the test files are located in the top level of the directory for their test type (i.e. /test/TEST_TYPE/*.test.js).
    All test filenames have the *.test.js suffix.
    Each test file for a particular component is namespaced with a prefix describing the relevant component (e.g. models.Users.test.js, assets.sync_adder.test.js, etc.).

    Reasoning

    Filenames like these make it easy to differentiate tests from core files when performing a flat search on the repository (i.e. CMD/CTRL+P in Sublime). Likewise, this makes the process easier to automate-- you can quickly grab all the test files with a simple recursive find on the command-line, for instance.

