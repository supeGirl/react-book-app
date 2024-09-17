Books App

Description
Books App is an application designed to help users manage their book collection. It allows users to add, view, update, and delete books. Users can also filter, sort, and group their book collection to find and organize their books easily.

Main Features
• Book Management: Add, view, update, and delete books.
• Book List: View a list of books with options for filtering, sorting, and grouping.
• Text Filtering: Filter books by title or other text criteria.
• Sorting: Sort books by various attributes (e.g., publication date).
• Grouping: Group books by categories (e.g., author, publication date).

Book Details:
• View detailed information about a selected book.
• Book thumbnail image is displayed.
• Pricing details, including currency and sale status.
• Responsive Design: Adaptable UI with responsive padding using clamp.


Book Object Format
Here is the format of the book object used by the app:
{
    "id": "OXeMG8wNskc",
    "title": "metus hendrerit",
    "description": "placerat nisi sodales suscipit tellus",
    "thumbnail": "http://example.com/BooksImages/1.jpg",
    "listPrice": {
        "amount": 109,
        "currencyCode": "EUR",
        "isOnSale": false
    }
}


Services
bookService
Provides methods for book management:

• query: Retrieve a list of books with optional filtering and sorting.
• get: Get details of a book by its ID.
• remove: Remove a book by its ID.
• save: Save a new or updated book.
• getEmptyBook: Get an empty book object with default values.
• getNextBookId: Get the ID of the next book in the list.
• getFilterBy: Get the current filter criteria.
• setFilterBy: Set filter criteria for querying books.


Components

BookList
Displays a list of books:
import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
    return (
        <ul className="book-list clean-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                </li>
            )}
        </ul>
    )
}

BookPreview
Displays a preview of a single book:
export function BookPreview({ book }) {
    // Extract image number from book ID (for example, by using a map or similar logic)
    const imgNumber = book.id.slice(0, 1); // Example logic; adjust based on actual logic
    const imgSrc = `../BooksImages/${imgNumber}.jpg`; // Adjust path if necessary

    return (
        <article className="book-preview">
            <img src={imgSrc} alt={book.title} />
            <h2>{book.title}</h2>
            <p>
                Price: {book.listPrice.amount} {book.listPrice.currencyCode}
                {book.listPrice.isOnSale && <span className="sale"> (On Sale)</span>}
            </p>
        </article>
    )
}


Responsive Padding
To ensure padding is responsive, use the following CSS with clamp:
.book-preview {
    padding: clamp(0.5rem, 1vw + 0.5rem, 1.5rem);
}
.sale {
    background-color: rgb(204, 12, 57);
    color: azure;
}


Usage
To integrate the app:

• Include Components: Import and use BookList and BookPreview in your main application component.
• Setup Services: Ensure bookService is properly implemented and connected to your storage.
Example Usage

import { BookList } from './components/BookList.jsx';
import { bookService } from './services/bookService.js';

function App() {
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        bookService.query().then(setBooks);
    }, []);

    return (
        <div className="app">
            <BookList books={books} />
        </div>
    )
}

export default App
