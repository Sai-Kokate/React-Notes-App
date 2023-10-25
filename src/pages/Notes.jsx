import React, { useState } from "react";
import backgroundImage from "../assets/background.png";

const Notes = ({ notesData, size, updateNotesData }) => {
  const [displayCreateNote, setDisplayCreateNote] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [noteSelected, setNoteSelected] = useState("");
  const [shownotesContent, setShownotesContent] = useState(false);
  const [text, setText] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);

  const openCreateNote = () => {
    setDisplayCreateNote(true);
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleSelectColor = (color) => {
    setBackgroundColor(color);
  };

  const handleCreateNote = () => {
    setDisplayCreateNote(false);
    const newNote = {
      title: groupName,
      bgColor: backgroundColor,
      content: [],
      key: size + 1,
    };
    let newNotesData = [];
    if (notesData?.length > 0) {
      newNotesData = [newNote, ...notesData];
    } else {
      newNotesData = [newNote];
    }
    updateNotesData(newNotesData, size + 1);
    setGroupName("");
    setBackgroundColor("");
  };

  const handleNoteClicked = (note) => {
    setShownotesContent(true);
    setNoteSelected(note.key);
    setSavedEntries(note.content);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      const entry = {
        text: text,
        timestamp: new Date().toLocaleString(),
      };

      setSavedEntries([...savedEntries, entry]);
      setText("");

      const updatedNotesData = notesData.map((note) => {
        if (note.key === noteSelected) {
          return {
            title: note.title,
            bgColor: note.bgColor,
            content: [...savedEntries, entry],
            key: note.key,
          };
        } else {
          return note;
        }
      });

      updateNotesData(updatedNotesData, size);
    }
  };

  return (
    <div>
      <button onClick={openCreateNote}>+ Create Notes group</button>
      {displayCreateNote && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#2F2F2FBF",
            display: "flex",
          }}
          onClick={() => setDisplayCreateNote(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <p>Create New Notes group</p>
            {/* note group name */}
            <div>
              <label>Group Name</label>
              <input
                type="text"
                placeholder="Enter your group name...."
                name="groupName"
                onChange={handleGroupName}
              ></input>
            </div>
            {/* note group color */}
            <div>
              <p>Choose colour</p>
              {colors.map((color) => {
                return (
                  <div
                    onClick={() => {
                      handleSelectColor(color);
                    }}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: `${color}`,
                      border: `${
                        color === backgroundColor ? "2px solid white" : ""
                      }`,
                    }}
                  ></div>
                );
              })}
            </div>
            {/* create button */}
            <div>
              <button onClick={handleCreateNote}>Create</button>
            </div>
          </div>
        </div>
      )}
      {/* note titles */}
      {notesData && notesData?.length > 0 && (
        <div>
          <div>
            {notesData.map((note) => {
              return (
                <div onClick={() => handleNoteClicked(note)}>
                  <div
                    style={{
                      width: "69px",
                      height: "69px",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                      lineHeight: "24px",
                      backgroundColor: `${note.bgColor}`,
                    }}
                  >
                    {note.title.slice(0, 2)}
                  </div>
                  <div>{note.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* notes content */}
      {!shownotesContent && (
        <div>
          <div
            style={{
              background: `url(${backgroundImage}) no-repeat center center`,
              backgroundSize: "cover",
              width: "626px",
              height: "313px",
            }}
          ></div>
          <div
            style={{
              color: "#000",
              fontSize: "50px",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "1px",
            }}
          >
            Pocket Notes
          </div>
          <div
            style={{
              color: "#292929",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px" /* 145.455% */,
              letterSpacing: "0.44px",
              width: "646px",
              height: "64px",
            }}
          >
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone
          </div>
          <div
            style={{
              color: "#292929",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px" /* 145.455% */,
              letterSpacing: "0.44px",
            }}
          >
            end-to-end encrypted
          </div>
        </div>
      )}
      {shownotesContent && (
        <div>
          <div>
            <ul>
              {savedEntries?.length > 0 &&
                savedEntries.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.timestamp}:</strong> {entry.text}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your text here..........."
            ></textarea>
            <button>Enter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
