import { useEffect, useState } from "react";
import Notes from "./pages/Notes";

function App() {
  const [notesData, setNotesData] = useState(
    JSON.parse(localStorage.getItem("notes"))
  );

  const [notesLength, setNotesLength] = useState(
    JSON.parse(localStorage.getItem("length"))
      ? JSON.parse(localStorage.getItem("length"))
      : 0
  );
  // const fetchLocalStorage = () => {
  //   data = JSON.parse(localStorage.getItem("notes"));
  //   setNotesData(data);
  // };

  const setLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notesData));
    localStorage.setItem("length", JSON.stringify(notesLength));
  };

  // useEffect(() => {
  //   fetchLocalStorage();
  // }, []);

  useEffect(() => {
    setLocalStorage();
  }, [notesData]);

  const updateNotesData = (data, len) => {
    setNotesData(data);
    setNotesLength(len);
  };

  return (
    <Notes
      notesData={notesData}
      size={notesLength}
      updateNotesData={updateNotesData}
    />
  );
}

export default App;
