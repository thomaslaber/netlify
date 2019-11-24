---
title: "Test-Driven Development (TDD)"
url: "test-driven-development"
editor_options: 
  chunk_output_type: inline
date: 2019-11-20
thumbnail: img/banner/tdd.png
categories:
  - "post"
tags:
  - "R"
draft: true
---

> “Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: requirements are turned into very specific test cases, then the software is improved to pass the new tests, only. This is opposed to software development that allows software to be added that is not proven to meet requirements.”, from [TDD - Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)

# Why TDD and testing?

Few things you should think about when writing code:

- How do you know that your code is working?
  -  A function defines a contract and a set of expectations on how it should behave.
    -    Does a function do what it is expected to do?
    -    Is the code right?
- Have you changed some existing code?
    - How do you know that your code is still working?
    - How do you know that you have not introduced “unwanted” features/side effects?

TDD and tests are important because allow you to be sure that the code is working as expected when you write it for the first time, and/ or when you change it. TDD and tests allow you:

- to save time and energy
  - decreased frustration
  - be more efficient when changing existing code
-  to minimize the risk around your code
  - increased confidence when making changes
- to move into incremental design
  - better code structure and design

Setting up a battery of tests around your code and functionality can play a big role in maintaining and keeping smooth operations.

## The TDD mantra

`testthat` is a testing framework for R implemented by Hadley Wickham, as the author says [“an R package to make test fun”][1].

The main goal of this package is to make the initial effort around testing as small as possible, and then gradually and incrementally increase the formality and complexity of your tests. And it can be used to use to introduce Test Driven Development into your way of working.

## How to install the testthat

{{< highlight r >}}
#The package is available on CRAN
#Run the following line to install the package locally in your machine
install.packages("testthat")
{{< /highlight >}}

## Test structures

testthat has an hierarchical structure that is made up of expectations, tests and contexts.

- **context** groups together multiple tests that test related functionality,
- **test** groups together multiple expectations,
- **expectation** describe one expected result from a function,
  - given certain inputs to the function, the expected result is
    - does it have the right value and type?
    - does it produce a message, warning, error?

### Expectations

An expectation is a binary assertion about whether of not a returned value is as expected. If an expectation is not true then `testthat` will raise an error. The format of an expectation is very simple to read “I expect that a will be equal to b“.

An expectation, actually the same expectation, can be be expressed using one of the following formats

{{< highlight r >}}
#An old-style expectation
#still supported but sift deprecated
testthat::expect_that(object = 10, condition = testthat::equals(10))

#New style expectation
testthat::expect_equal(object = 10, expected = 10)
{{< /highlight >}}

Information on available expectations can be found in the help page for the package (see `help(package="testthat")`).

### Tests

Each test should test a single item of functionality and have an informative name. When a test fails it should be straight forward to know where to look for the problem in the code.

A test is created using `testthat::test_that` with a test name and code block as arguments. The test name should complete the sentence “*Test that …*” while the code block should be a collection of expectations.

Each test is run in its own environment and is self-contained but if you change the R landscape `testthat` does not know how to clean up. So if you change

- the filesystem, creating and deleting files, changing the working directory, etc. 
- the search path, `library()` or `attach()`
- global options, like `options()` and `par()`

then it is your responsibility to clean up (CLEAN UP AFTER YOURSELF).

Let’s say to have a simple function `make_filename()`, given the year as argument it creates a file name as a string with the following format accident_<year>.csv.bz2. An example of a test checking if the function behave correctly is given below

{{< highlight r >}}
testthat::test_that("make_filename returns expected filename when passing year as integer",{
  testthat::expect_match("accident_2017.csv.bz2", make_filename(2017))
})
{{< /highlight >}}

### Contexts

Tests are grouped together using a context, the context describes the functionality under test. Normally there is one context per file.

An example below

{{< highlight r >}}
#File: test_make_filename.R
context("make_filename tests")

test_that("make_filename returns expected filename when passing year as integer",{
  expect_match("accident_2017.csv.bz2", make_filename(2017))
})

test_that("make_filename returns expected filename when passing year as character",{
  expect_match("accident_2013.csv.bz2", make_filename("2013"))
})

test_that("make_filename returns a warning when passing an invalid character",{
  invalid_year = "a_string"
  expect_warning(make_filename(invalid_year), "NAs introduced by coercion")
})
{{< /highlight >}}

## How to use the testthat package

- run all tests in a file, using `testthat::test_file()`, or directory, using `testthat::test_dir()`
- run tests automatically everytime the code is changes or a test is changed using `testthat::auto_test()`
- run the tests using `R CMD check`

A step-by-step example of how to apply TDD to solve a simple exercise can be found in the following [repository](https://github.com/pparacch/tdd_r_with_testthat).

### Source

https://pparacch.github.io/2017/05/18/test_driven_development_in_r.html

- [1]: [‘testthat’ package](https://github.com/hadley/testthat), by Hadley Wickham
- [2]: [‘testthat: Get Started with Testing’](https://journal.r-project.org/archive/2011-1/RJournal_2011-1_Wickham.pdf), by Hadley Wickham 
- [3]: [‘R Packages’](http://r-pkgs.had.co.nz/tests.html), by Hadley Wickham, O’Reilly April 2015.