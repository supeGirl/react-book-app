const {useState} = React

import { AboutUs } from './cmps/AboutUs.jsx'
import {AppHeader} from './cmps/AppHeader.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'
import {Home} from './cmps/Home.jsx'

export function App() {
  const [page, setPage] = useState('book')

  function onSetPage(page) {
    setPage(page)
}

  return (
    <section className="app">
      <AppHeader onSetPage={onSetPage}/>
      <main className="main-layout">
        {page === 'home' && <Home />}
        {page === 'about' && <AboutUs />}
        {page === 'book' && <BookIndex />}
        </main>
    </section>
  )
}
