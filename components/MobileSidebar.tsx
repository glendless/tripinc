// @ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"
import { Link } from "react-router"
import NavItems from "./NavItems"

const MobileSidebar = () => {
    let sidebar: SidebarComponent

    const toggleSidebar = () => {
        sidebar.toggle()
    }

    return (
        <div className="mobile-sidebar wrapper">
            <header className="">
                <Link to="/">
                    <img src="/assets/icons/logotripinc.svg" alt="logo" className="size-[32px]" />
                    <h1 className="text-base md:text-2xl font-bold">Tripinc</h1>
                </Link>

                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>
            </header>

            <SidebarComponent
                width={270}
                ref={(Sidebar) => sidebar = Sidebar}
                created={() => sidebar.hide()}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
            >
                <NavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    )
}

export default MobileSidebar