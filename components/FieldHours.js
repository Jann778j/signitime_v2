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

    if (value === "") {
      event.target.value = 0; // Set the input field value to 0
      props.setHours(0);
    } else {
      const formattedValue = parseFloat(value.replace(",", ".")).toLocaleString(
        "da-DK"
      );
      event.target.value = formattedValue;
      props.setHours(parseFloat(value.replace(",", ".")));
    }
  };

  console.log(props.hours);

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
