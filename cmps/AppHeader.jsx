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
         <NavLink to="/home">Home</NavLink>
         <NavLink to="/about">About Us</NavLink>
         <NavLink to="/book">Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
