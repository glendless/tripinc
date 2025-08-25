import { Link, NavLink, useLoaderData, useNavigate } from "react-router"
import { logoutUser } from "~/appwrite/auth"
import { sidebarItems } from "~/constants"
import { cn } from "~/lib/utils"

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
    const user = useLoaderData()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser()
        navigate('/sign-in')
    }

    return (
        <section className="nav-items">
            <Link to="/" className="link-logo">
                <img src="/assets/icons/logotripinc.svg" alt="logo" className="size-[32px]" />
                <h1 className="text-base md:text-2xl font-bold">Tripinc</h1>
            </Link>

            <div className="container">
                <nav>
                    {sidebarItems.map(({ id, icon, label, href }) =>
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div className={cn('group nav-item', {
                                    'bg-lime-600 !text-white': isActive
                                })} onClick={handleClick}>

                                    <img src={icon} alt={label} className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert ' : 'text-dark-200'} `} />
                                    {label}
                                </div>
                            )}
                        </NavLink>

                    )}
                </nav>

                <footer className="nav-footer">
                    <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name} referrerPolicy="no-referrer" />

                    <article className="">
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer">
                        <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
                    </button>
                </footer>
            </div>
        </section>
    )
}

export default NavItems