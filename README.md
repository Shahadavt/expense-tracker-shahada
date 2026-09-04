# Expense Tracker

A complete, modern Expense Tracker web application built with HTML5, CSS3, and vanilla JavaScript. Track your income and expenses with ease, featuring data persistence, filtering, and visual summaries.

## Features

### Core Functionality
- **Add Transactions**: Record income and expenses with amount, category, date, and description
- **Edit Transactions**: Modify existing transactions
- **Delete Transactions**: Remove transactions with confirmation
- **Balance Summary**: View total income, total expenses, and current balance

### Data Management
- **Local Storage**: All data persists in browser Local Storage
- **Data Persistence**: Transactions remain after page refresh
- **No Server Required**: Runs entirely in the browser

### Filtering & Organization
- **Filter by Type**: View all transactions, income only, or expenses only
- **Filter by Category**: Filter transactions by specific categories
- **Clear Filters**: Reset all filters with one click

### Visual Features
- **Monthly Summary**: View income, expenses, and balance for the current month
- **Category Chart**: Visual bar chart showing expenses by category
- **Dark/Light Mode**: Toggle between dark and light themes

### User Experience
- **Form Validation**: Helpful error messages for invalid inputs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Categories

### Available Categories
- Food
- Travel
- Shopping
- Bills
- Health
- Education
- Salary
- Other

## Project Structure

```
Expense_Tracker/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── app.js              # Application logic and functionality
└── README.md           # Documentation
```

## How to Use

### Running the Application
1. Open `index.html` in a web browser
2. No installation or server required - it runs directly in the browser

### Adding a Transaction
1. Select transaction type (Income or Expense)
2. Enter the amount
3. Choose a category
4. Select the date (defaults to today)
5. Enter a description
6. Click "Add Transaction"

### Editing a Transaction
1. Click the "Edit" button on any transaction
2. Modify the fields as needed
3. Click "Update Transaction" to save changes
4. Click "Cancel Edit" to discard changes

### Deleting a Transaction
1. Click the "Delete" button on any transaction
2. Confirm the deletion in the popup dialog

### Filtering Transactions
1. Use the "Filter Transactions" section
2. Select type filter (All Types, Income Only, Expense Only)
3. Select category filter (All Categories or specific category)
4. Click "Clear Filters" to reset

### Dark/Light Mode
- Click the moon/sun icon in the header to toggle between themes
- Theme preference is saved and persists across sessions

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS variables, Flexbox, and Grid
- **Vanilla JavaScript**: No frameworks or libraries

### Key JavaScript Concepts Used
- **DOM Manipulation**: Dynamic content rendering and event handling
- **Local Storage API**: Data persistence
- **Event Listeners**: Form submission, button clicks, and filter changes
- **Array Methods**: filter, map, reduce for data processing
- **Date Objects**: Date formatting and month calculations
- **CSS Variables**: Theme switching via data attributes

### Responsive Design
- Mobile-first approach with media queries
- Flexible grid layouts using CSS Grid
- Adaptive layouts for different screen sizes
- Touch-friendly button sizes on mobile

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with Local Storage support

## Data Privacy
- All data is stored locally in your browser
- No data is sent to any server
- Clear your browser's Local Storage to remove all data
- Data is specific to the browser and device used

## Interview Talking Points

### Key Features to Discuss
1. **Local Storage Implementation**: How data persists without a backend
2. **Form Validation**: Client-side validation with user feedback
3. **State Management**: Managing transaction data and UI updates
4. **Responsive Design**: Mobile-first CSS approach
5. **Theme System**: CSS variables for dark/light mode
6. **Data Processing**: Using array methods for filtering and calculations

### Code Organization
- Separation of concerns (HTML structure, CSS styling, JS logic)
- Modular functions for specific tasks
- Clear naming conventions
- Comments for complex logic

### Performance Considerations
- Efficient DOM updates (batch rendering)
- Event delegation where applicable
- CSS animations using transforms (GPU accelerated)

## Future Enhancements (Optional)
- Export data to CSV/JSON
- Import transactions from file
- Add budget limits and alerts
- Transaction search functionality
- Multi-currency support
- Recurring transactions
- Data backup/restore

## License
This project is open source and available for educational purposes.
