import { bookService } from "../services/book.service.js"
import { BookList } from "./BookList.jsx"

const {useEffect, useState} = React

export function BookIndex(){

  const[books, setBooks] = useState(null)

  useEffect(()=>{
    loadBooks()
  },[])


  function loadBooks(){
    bookService.query()
    .then(setBooks)
    .catch(err=> {
      console.log(`Problem getting books.. ${err}`)
    })

  }
  if(!books) return <h1>Loading....</h1>
  return(
    <section className="book-index">
    <BookList books={books}/>
    </section>
  )  
}