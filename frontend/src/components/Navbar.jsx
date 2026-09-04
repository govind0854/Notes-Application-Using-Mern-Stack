import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="navbar">

      <h2 className="logo">Notes Manager</h2>

      <div className="nav-buttons">

        <button onClick={()=>navigate("/dashboard")}>
          Notes
        </button>

        <button onClick={()=>navigate("/recycle")}>
          Recycle Bin
        </button>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;