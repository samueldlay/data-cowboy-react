# Data Cowboy - Wrangle That Data!

----
This project began as a prompt from one of my more experienced programmer friends who sought to challenge me to learn about some more advanced concepts in JavaScript.

## The Prompt:
Imagine you work at a company that pays customers for their used mobile devices. Your job is to take the raw information collected about the devices being received and create an interface for the business office to use for gathering insight about these devices being purchased from customers. Display useful information about the dataset according to user parameters.

# Concepts used:
* Reducers
* Filters
* Async/await
* Map and Set
* Integrating third-party libraries and web services such as Material.io and Google Charts

# Usage:
This app generates a fully filterable user interface that utilizes a dataset fetched from a JSON file that contains an array of objects with top-level key-value pairs.
* Select any category, set a value range, or search by the device ID to narrow your search
* Select any category above the pie chart to view specific details about the data that has been filtered 

----
The code that I wrote to generate the UI (located in 'uiapi.js') for this app can be used with any data structure that meets the aforementioned requirements -- that is, and array of objects that contain top-level key value pairs.

# [Demo](https://samueldlay.github.io/data-cowboy-react/)