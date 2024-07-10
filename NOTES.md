# Notes

## Features

A summary of features implemented:

- dashboard stats
- view and create cinemas
- view and create screens
- view and filter screenings

## Assumptions

Regarding the API, as there was no further doumentation regarding fetching all the data or filtering by fields, i.e. name, id, etc, for the purposes of this task I have queried a large page size (99). Could make multiple requests to the same end point and check if it’s the last set of data but opted to save time or in some cases use a autocomplete search.

## Further improvements

Improvements that could be looked into given more time:

- Unit test coverage
- Error handling on api requests and state, e.g. home/dashboard forkJoin
- Loading state, e.g. per stat card on home/dashboard
- Create base api and pagination services for common logic (abstract)
- Reusable components; heading, table, container, app-layout
- Use of state management tool
- Linting via eslint and stylelint
- Could move component data/stores into their own services for better separation of concerns
  - i.e. component for UI logic, store service for state management and network calls
