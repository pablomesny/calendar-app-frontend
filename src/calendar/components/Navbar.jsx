import { useAuthStore } from "../../hooks"

export const Navbar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button 
          className="btn btn-outline-danger" 
          onClick={ startLogout }
        >
            <i className="fas fa-right-from-bracket"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
