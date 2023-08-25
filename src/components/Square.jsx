// passing in a value that will be used as a property in the props is done using curry braces and
// the name can be anything for as long as it is the one reffered to in the production
function Square(props) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   setValue("X");
  // }
  // removed the individual state on the buttons and added it to their parent
  // so as to keep track of all the states of the sqaures. this is called lifting state up
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}
export default Square;
