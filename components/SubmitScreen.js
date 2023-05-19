import { format } from "date-fns";

export default function SubmitScreen(props) {
  const day = format(new Date(), "eeee"); // Indstiller day-variablen til dagens navn (f.eks. "mandag")

  let text;
  let headline;
  let figur;

  // Hvis det er mandag
  if (day.toLowerCase() == "monday") {
    headline = "Great jobbin’!"; // Overskriften sættes til "Great jobbin’!"
    text =
      "You just submitted your hours of the day. Enjoy a tremendous tuesday, and see you again tomorrow!"; // Teksten sættes til passende besked for mandag
    figur = "monday.svg"; // figur sættes til billede for mandag
  } else if (day.toLowerCase() == "tuesday") {
    headline = "Super worker!";
    text =
      "You just submitted your hours of the day. Now go enjoy being halfway through the week, and see you again tomorrow!";
    figur = "tuesday.svg";
  } else if (day.toLowerCase() == "wednesday") {
    headline = "Good job!";
    text =
      "You just submitted your hours of the day. Guess what day it is tomorrow… Anyway, have a tremendous thursday, and see you again tomorrow! ";
    figur = "wednesday.svg";
  } else if (day.toLowerCase() == "thursday") {
    headline = "Good job!";
    text =
      "You just submitted your hours of the day. Guess what day it is tomorrow… Anyway, have a tremendous thursday, and see you again tomorrow! ";
    figur = "thursday.svg";
  } else if (day.toLowerCase() == "friday") {
    headline = "You did it!";
    text =
      "You just submitted your hours of the day. And this is the last day of the week. Have a wonderful weekend the way you like it best, and see you again!";
    figur = "friday.svg";
  } else {
    // Hvis det er weekend (lørdag eller søndag)
    headline = "It's weekend...";
    text = "You shouldn't be working";
  }

  return (
    <div className={`submit-screen ${day.toLowerCase()}`}>
      <h1>{headline}</h1>
      <p>{text}</p>

      <button
        onClick={() => props.setClick(false)}
        className="submit rounded-corners"
      >
        Cool
      </button>
      <div className="img_wrapper">
        <img src={figur} alt="figur" />
      </div>
    </div>
  );
}
