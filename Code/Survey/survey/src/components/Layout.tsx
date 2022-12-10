import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (<div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Survey">Survey</Link>
                </li>
                <li>
                    <Link to="/Question">Questions</Link>
                </li>
            </ul>

        </nav>
        <hr />
        <Outlet />
    </div>
    );
}

export default Layout;