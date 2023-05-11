export default function FieldHours(props) {
  const handleIncrement = () => {
    props.setHours(props.hours + 0.25);
  };

  const handleDecrement = () => {
    if (props.hours > 0) {
      props.setHours(props.hours - 0.25);
    }
  };

  const handleHourChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/[^0-9,]/g, "");
    props.setHours(parseInt(formattedValue, 10));
  };

  return (
    <div className="hours">
      <div className="title">
        {props.hours === 0 ? "3. Add hours" : "Hours"}
      </div>
      <div className="counter">
        <div className="minus" onClick={handleDecrement}>
          -
        </div>
        <input
          required
          name="duration"
          type="number"
          value={props.hours}
          onChange={handleHourChange}
        />
        <div className="plus" onClick={handleIncrement}>
          +
        </div>
      </div>
    </div>
  );
}
