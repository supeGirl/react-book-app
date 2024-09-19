export function AppHeader({onSetPage}) {

  const links = [
    {title:'Home', href :'home'},
    {title:'About', href :'about'},
    {title:'Book', href :'book'},
  ]
  return (
    <header className="app-header full main-layout">
      <section>
        <h1>BOOXIØ</h1>
        <nav className="app-nav">
          {links.map((link,idx) => {
            return <a key={idx} onClick={()=> onSetPage(link.href)}>{link.title}</a>
          })}
          {/* <a onClick={() => onSetPage('home')} href="#">Home</a>
          <a onClick={() => onSetPage('about')} href="#">About Us</a>
          <a onClick={() => onSetPage('book')} href="#">Books</a> */}
        </nav>
      </section>
    </header>
  )
}
