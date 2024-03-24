// App.js
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from 'react-router-dom'
import './App.css'

// Components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// Pages
import Discover from './pages/Discover'
import EditProfile from './pages/EditProfile'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Signup from './pages/Signup'
import Suggestions from './pages/Suggestions'
import Company from './pages/Company'
import Admin from './pages/(admin)/Admin'

// Context
import { useAuthContext } from './hooks/useAuthContext'
import { error404 } from './components/Error404'

// Navbar Component
function AppNavbar() {
    return <Navbar />
}

// Footer Component
function AppFooter() {
    return <Footer />
}

// Routes Component
function AppRoutes({ user }) {
    const routes = [
        { path: '/', element: <Home /> },
        { path: '/search', element: <Search /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/discover', element: <Discover /> },
        {
            path: '/edit',
            element: user && user.profileCreated && <EditProfile />,
        },
        { path: '/user/:id', element: <Profile /> },
        { path: '/company/:id', element: <Company /> },
        { path: '/Suggestions', element: <Suggestions /> },
        { path: '/admin/*', element: <Admin /> },
        {
            path: '/*',
            element: error404("We couldn't find the page you are looking for."),
        },
    ]

    return (
        <Routes>
            {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
            ))}
        </Routes>
    )
}

// Wrapper for Navbar and Footer
const NavigationWrapper = ({ children }) => {
    const location = useLocation()
    const isAdminRoute = location.pathname.startsWith('/admin/')

    return (
        <div className="flex min-h-screen w-full flex-col">
            {!isAdminRoute && <AppNavbar />}
            {children}
            {!isAdminRoute && <AppFooter />}
        </div>
    )
}

// Main App Component
function App() {
    const { user } = useAuthContext()

    return (
        <Router>
            <div className="flex min-h-screen w-full flex-col">
                <NavigationWrapper>
                    <AppRoutes user={user} />
                </NavigationWrapper>
            </div>
        </Router>
    )
}

export default App
