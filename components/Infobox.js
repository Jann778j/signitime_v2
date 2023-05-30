export default function Infobox() {
  return (
    <div className="info-wrapper">
      <div className="info-hover-container">
        <span className="hover-trigger">?</span>
        <div className="hover-info">
          <h2>The procedure goes a lil' like this...</h2>
          <ol>
            <li>You begin with picking the client you've worked for</li>
            <li>Pick the associated project</li>
            <li>Fill in the hours you've spent</li>
            <li>Add a note of the exact work you've done</li>
            <li>
              The button beneath will be active, when you've fulfilled the form
            </li>
            <li>When you have added all your tasks, click "Save for today"</li>
          </ol>
          <p>And that's it! Easy peasy lemon squeezy, your duty is done!</p>
        </div>
      </div>
    </div>
  );
}
