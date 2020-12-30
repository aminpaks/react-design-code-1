import './Placeholder.css';

export const Placeholder = () => {
  return (
    <div className="placeholder">
      <div className="placeholder--title">
        <span className="placeholder--item" />
      </div>
      <hr />
      <div className="placeholder--content">
        <span className="placeholder--item item1" />
        <span className="placeholder--item item2" />
        <span className="placeholder--item item3" />
        <span className="placeholder--item item4" />
      </div>
    </div>
  );
};
