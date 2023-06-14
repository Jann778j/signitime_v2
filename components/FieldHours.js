export default function FieldHours(props) {
  const handleIncrement = () => {
    props.setHours(props.hours + 0.25); // Øger antallet af timer med 0,25 ved klik på plus-knappen
  };

  const handleDecrement = () => {
    if (props.hours > 0) {
      props.setHours(props.hours - 0.25); // Formindsker antallet af timer med 0,25 ved klik på minus-knappen, hvis antallet af timer er større end 0
    }
  };

  const handleHourChange = (event) => {
    const { value } = event.target;

    if (value === "") {
      event.target.value = 0; // Sætter inputfeltets værdi til 0, hvis der ikke er indtastet nogen værdi
      props.setHours(0); // Opdaterer antallet af timer til 0
    } else {
      const formattedValue = parseFloat(value.replace(",", ".")).toLocaleString(
        "da-DK"
      ); // Formaterer værdien til decimalformat med komma som decimalseparator
      event.target.value = formattedValue; // Opdaterer inputfeltets værdi med den formaterede værdi
      props.setHours(parseFloat(value.replace(",", "."))); // Opdaterer antallet af timer med den indtastede værdi
    }
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
          name="duration"
          type="number"
          value={props.hours}
          onChange={handleHourChange} // Kalder handleHourChange-funktionen ved ændring af inputfeltet
        />
        <div className="plus" onClick={handleIncrement}>
          +
        </div>
      </div>
    </div>
  );
}
