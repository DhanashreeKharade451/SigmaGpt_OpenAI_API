import "./Sidebar.css";
function Sidebar() {
  return (
    <section class="sidebar">
      {/* new caht button */}
      <button>
        <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* History */}
      <ul className="history">
        <li>thread1</li>
        <li>thread2</li>
        <li>thread3</li>
      </ul>

      {/* sign */}
      <div className="sign">
        <p>By ApnaCollege </p>
      </div>
    </section>
  );
}

export default Sidebar;
