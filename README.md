
# User/Post Management Task



## Key Features

- #### Dual Data-Handling Strategies:
  - Client-Side Processing for the Users table (fast, for small datasets).
  - Server-Side Processing for the Posts table (scalable, for large datasets).

- #### Pagination, Filtering, and Column Sorting for both tables.

- #### TanStack Query (React Query): Manages server state, caching, and data fetching logic.

- #### Zustand: Manages global UI state (e.g., theme, sidebar visibility) with a simple, hook-based API.

- #### Robust UI & UX:
  - shadcn/ui: A set of beautifully designed, accessible, and composable components.
  - Responsive Design: A collapsible sidebar (drawer) for mobile and a card-based layout for tables on small screens.
  - Intelligent Theming: Supports Light, Dark, and System-preference themes, with the user's choice persisted in localStorage.
  - Resilient Error Handling: Features a robust Error Boundary for the server-side table, allowing users to retry failed network requests.
  - URL State Management: All state for the server-side table (page, filter, sort) is stored in the URL, making the view shareable and refresh-proof.
  
## Data Handeling

 ### 1. Users Table : Client-Side Processing
   - The Task fetches all user data in a single network request upon initial load.
   - Efficient Caching: The fetched data is managed by TanStack Query with specific cache settings. The data is considered fresh (staleTime) for 2 minutes, meaning no network requests will be made during this period. The data remains in the cache (cacheTime) for 2 minutes after it becomes inactive, allowing for quick retrieval if the user navigates away and returns.
   - Processing: All subsequent operations (sorting, filtering, pagination) are performed entirely in the browser using JavaScript (useMemo hooks).
   - User Experience: Operations are instantaneous with no loading indicators, providing a seamless, desktop-like feel.

### 2. Posts Table : Server-Side Processing(JsonPlaceHolder)
  - Data Fetching: The app only fetches the specific "slice" of data needed for the current view. A new API request is triggered for every operation, including changing pages, applying filters, or sorting columns.
  - Processing: All heavy lifting is delegated to the server. The client sends query parameters (e.g., ?page=2&q=react&sort=title) to the API, and the server is responsible for returning the correct, processed data.
  - State Management: All state for this table is stored in the URL's query parameters. This makes the current view shareable, refresh-proof, and accessible via browser history.
  - User Experience: Each operation triggers a network request, so a subtle "Updating..." indicator is shown. In case of a network failure, a robust Error Boundary appears with a "Try again" button, providing a resilient user experience.



## Installation

Install my task with npm

```bash
  git clone https://github.com/hossein-rg/jsonplaceholder.git
  cd jsonplaceholder
  npm install
  npm run dev
```
    