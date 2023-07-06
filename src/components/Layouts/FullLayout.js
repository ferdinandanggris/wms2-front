import { Fragment, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Footer from "../Footer"

const FullLayout = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toogleMenu = (e) => {
    e.preventDefault();

    setShowMenu(!showMenu);
  };

  return (
    <Fragment>
      <Navbar toogleMenu={toogleMenu} showMenu={showMenu} />
      <div className="container-fluid">
        <div className="row app-content">
          <Sidebar showMenu={showMenu} />
          <main role="main" className={`${showMenu ? 'col-md-10' : 'col-md-12'} ml-sm-auto p-0 main`} style={{ overflowX: "hidden" }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default FullLayout
