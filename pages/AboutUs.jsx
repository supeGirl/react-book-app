const { Link, Outlet } = ReactRouterDOM

export function AboutUs(){
    return (
        <section className="about">
   <nav className="about-nav flex justify-between">
   <Link to='/about/Team'><i className="fa-solid fa-people-group"></i>About Us</Link>
   <Link to='/about/Goal'><i className="fa-brands fa-golang"></i>About our goal</Link>
   </nav>
        <h1 className="flex justify-center">About books and us...</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente, iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>
   <Outlet />
    </section>
    )
}