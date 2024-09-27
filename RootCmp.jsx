const Router = ReactRouterDOM.HashRouter
const {Routes, Route, Navigate} = ReactRouterDOM

import {AboutUs} from './pages/AboutUs.jsx'
import {BookIndex} from './pages/BookIndex.jsx'
import {Home} from './pages/Home.jsx'
import {AppHeader} from './cmps/AppHeader.jsx'
import {BookEdit} from './pages/BookEdit.jsx'
import {BookDetails} from './pages/BookDetails.jsx'
import {NotFound} from './cmps/NotFound.jsx'
import {UserMsg} from './cmps/UserMsg.jsx'
import {AboutTeam} from './cmps/AboutTeam.jsx'
import {AboutGoal} from './cmps/AboutGoal.jsx'

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />}>
              <Route path="/about/Team" element={<AboutTeam />} />
              <Route path="/about/Goal" element={<AboutGoal />} />
            </Route>
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
