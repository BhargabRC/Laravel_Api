import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import AboutUs from './pages/aboutus';
import Team from './pages/team';
import FaQ from './pages/faq';
import Blog from './pages/blog';
import Edit from './pages/edit'
import Edit_Team from './pages/edit_team'
import Edit_FaQ from './pages/edit_faq'
import Edit_Blog from './pages/edit_blog'


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/"} className="nav-link active" aria-current="page">AboutUs</Link>
              <Link to={"/team"} className="nav-link active" aria-current="page">Team</Link>
              <Link to={"/faq"} className="nav-link active" aria-current="page">FaQ</Link>
              <Link to={"/blog"} className="nav-link active" aria-current="page">Blog</Link>

            </div>
          </div>
        </div>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<AboutUs />}></Route>
          <Route path='/team' element={<Team />}></Route>
          <Route path='/faq' element={<FaQ />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/edit_team/:id' element={<Edit_Team />} />
          <Route path='/edit_faq/:id' element={<Edit_FaQ />} />
          <Route path='/edit_blog/:id' element={<Edit_Blog />} />
          


        </Routes>
      </div>
    </div>
  );
}

export default App;
