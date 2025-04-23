# pension-finder

## Run locally

```
npm run build
npm start
```

**NOTE**: I used Node 22 to build the app. See `.nvmrc`.

## API Routes

All routes are GET endpoints:

### Pension Pots

- `/pension-pots` - Get all pension pots
- `/pension-pots/forecast` - Get forecasted balances for pension pots

### Searching

- `/pots/search?name={name}` - Search pots by name
- `/pots/search/over?value={number}` - Get pots over a specified value (positive number)
- `/pots/search/under?value={number}` - Get pots under a specified value (positive number)
- `/pots/search/employer?name={name}` - Search pots by employer name
- `/pots/search/provider?name={name}` - Search pots by provider name

### Individual Pots

- `/pots/:id` - Get a specific pot by ID
- `/all-pots` - Get all pots

### Searched Pensions

- `/searched-pensions` - Get all searched pensions
- `/searched-pensions/found` - Get all found searched pensions

## Running tests

```
npm test
```

## Todo

- Write more tests!
- Refactor search by name and id to be a bit cleaner overall. The current goal was to exit early from a search for a specific term while maintaining type safety and improving response value validation.
