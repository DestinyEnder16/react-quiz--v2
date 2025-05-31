function Navigation({ dispatch, text, isAble }) {
  return (
    <aside className="nav">
      <div className="nav">
        <button
          className="btn btn-nav"
          onClick={() => dispatch({ type: 'next' })}
          disabled={isAble}
        >
          {text}
        </button>
      </div>
    </aside>
  );
}

export default Navigation;
