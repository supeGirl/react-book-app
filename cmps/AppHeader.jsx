export function AppHeader({onSetPage}) {
  return (
    <header className="app-header main-layout">
      <section>
        <h1>BOOXIØ</h1>
        <nav className="app-nav">
          <a onClick={() => onSetPage('home')} href="#">
            Home
          </a>
          <a onClick={() => onSetPage('about')} href="#">
            About Us
          </a>
          <a onClick={() => onSetPage('book')} href="#">
            Books
          </a>
        </nav>
      </section>
    </header>
  )
}
