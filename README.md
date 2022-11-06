# CAPSTONE-FALL-22
 Team Maverick <br />
 Teaching Algorithm Run-Time Complexity Analysis <br />
 Milestone 1 Branch: jdschnee <br />

## Purpose
We are building a web application that is meant to help students better learn and understand run-time complexity analysis of algorithms. The tool is meant to provide students with a means of analyzing blocks of Java code for run-time complexity, then quiz them on the true Big-O notation representing the complexity. We also plan to provide additional resources such as videos, articles, and more for  students to explore while learning about the topic.
## Usage
On the home screen, there are buttons that correspond to different activities. You are able to learn more about how the tool works, watch video tutorials, or go straight to using the tool. After clicking on "Start Calculating" or scrolling down to the "Run-Time Analysis Calculator", there is a text box with a for loop that you can replace with your code to analyze. Then, click "Calculate" and you will be presented with a quiz to attempt to guess the Big-O notation of your code. You will see if you are right or guess again if you are wrong. There is a quiz button beneath calculate which will take you to a multiple-choice quiz with several exapmle code snippets.
## Release Notes
We now use a more robust parser that is deployed as an API on AWS. The repository for that API is available [here](https://github.com/cmcgrath454/BigOAPI).
## Branches
- master: This will be our main branch. We will commit the main features to this branch as
we work on them.
- ColinsBranch: This branch is for developing a more robust complexity analysis tool that uses a Java parser to more efficiently handle all possible variations of code. This will be committed to the main branch after the parser is fully developed to analyze for loops, then the next main feature will be while loops.
- JustinsBranch: Branch off of main. Working on getting the create quiz functionality and will soon be removing React as a framework from our application
- removingReactBranch: The branch used to work on removing the React framework from our application.
- jdschnee: This is our main branch for Milestone 1
- old: Deprecated version of master.
- main: Deprecated version of master.




