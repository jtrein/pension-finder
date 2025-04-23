# pension-finder

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
