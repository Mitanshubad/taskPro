import Note from "./Note";

export const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <div className="container " style={{ marginTop: "30px" }}>
        <Note showAlert={showAlert} path={props.path} />
      </div>
    </>
  );
};
