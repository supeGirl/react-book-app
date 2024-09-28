const {Link, NavLink, useNavigate} = ReactRouterDOM

export function AppHeader() {
  const navigate = useNavigate()

  function onBack() {
    navigate(-1)
  }

  return (
    <header className="app-header full main-layout">
      <section>
        <h1>BOOXIØ</h1>
        <nav className="app-nav">
         <NavLink to="/home" className="nav-link"> 
         <i className="fa-solid fa-house-chimney"></i>Home</NavLink>
         <NavLink to="/about" className="nav-link">
         <i className="fa-solid fa-circle-info"></i>About Us</NavLink>
         <NavLink to="/book" className="nav-link">
         <i className="fa-solid fa-book"></i>Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
