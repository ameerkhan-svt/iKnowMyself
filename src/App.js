import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
        <div className="App">
        <nav>
          <Link to="/">Signin/Login in</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Outlet/>
      </div>
    
  );
}

export default App;
