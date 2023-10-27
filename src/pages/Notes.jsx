import React, { useState } from "react";
import backgroundImage from "../assets/background.png";
import { IoMdLock } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import styles from "./notes.module.css";

const Notes = ({ notesData, size, updateNotesData }) => {
  const [displayCreateNote, setDisplayCreateNote] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [noteSelected, setNoteSelected] = useState({});
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
    setNoteSelected(note);
    setSavedEntries(note.content);
  };

  const updateNoteContent = () => {
    const entry = {
      text: text,
      timestamp: new Date().toLocaleString(),
    };

    setSavedEntries([...savedEntries, entry]);
    setText("");

    const updatedNotesData = notesData.map((note) => {
      if (note.key === noteSelected.key) {
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
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && text.trim() !== "") {
      updateNoteContent();
    }
  };

  const handleEnterClicked = () => {
    updateNoteContent();
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.pocketNotesHeader}>Pocket Notes</div>

        <div className={styles.leftInnerContainer}>
          <button onClick={openCreateNote} className={styles.createNotesButton}>
            + Create Notes group
          </button>
        </div>
        {/* note titles */}
        {notesData && notesData?.length > 0 && (
          <div className={styles.notesGroup}>
            {notesData.map((note) => {
              return (
                <div
                  onClick={() => handleNoteClicked(note)}
                  key={note.key}
                  className={styles.noteTitle}
                  style={{
                    backgroundColor: `${
                      note.key === noteSelected.key ? "#F7ECDC" : ""
                    }`,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: `${note.bgColor}`,
                    }}
                    className={styles.noteIcon}
                  >
                    {note.title.slice(0, 2)}
                  </div>
                  <div>{note.title}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.rightContainer}>
        {/* content area */}
        {!shownotesContent && (
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "auto",
              }}
            >
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
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <IoMdLock />
                end-to-end encrypted
              </div>
            </div>
          </div>
        )}

        {/* selected note content */}
        {shownotesContent && (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
            }}
          >
            <div style={{ height: "12%" }}>
              <div
                className={styles.noteTitle}
                style={{
                  backgroundColor: "#E8E8E8",
                  borderRadius: "0",
                }}
              >
                <div
                  style={{
                    backgroundColor: `${noteSelected.bgColor}`,
                  }}
                  className={styles.noteIcon}
                >
                  {noteSelected.title.slice(0, 2)}
                </div>
                <div>{noteSelected.title}</div>
              </div>
            </div>
            <div
              style={{
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
                height: "63%",
                overflowY: "auto",
              }}
            >
              {savedEntries?.length > 0 &&
                savedEntries.map((entry, index) => (
                  <div key={index} className={styles.note}>
                    <div
                      style={{
                        overflowY: "hidden",
                      }}
                    >
                      <div>
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div>
                        {new Date(entry.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        overflowY: "hidden",
                      }}
                    >
                      {entry.text}
                    </div>
                  </div>
                ))}
            </div>
            <div
              style={{
                width: "100%",
                height: "25%",
                backgroundColor: "#E8E8E8",
                padding: "10px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.textArea}
              ></textarea>
              <div
                onClick={handleEnterClicked}
                style={{
                  position: "absolute",
                  right: "2%",
                  bottom: "6%",
                  height: "30px",
                  width: "30px",
                  fontSize: "25px",
                  overflowY: "hidden",
                }}
              >
                <IoSend />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* create notes modal */}
      {displayCreateNote && (
        <div
          className={styles.createNotesBg}
          onClick={() => {
            setDisplayCreateNote(false);
            setGroupName("");
            setBackgroundColor("");
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.createNotesModal}
          >
            <div
              style={{
                marginBottom: "10px",
              }}
            >
              Create New Notes group
            </div>
            {/* note group name */}
            <div className={styles.modalInnerContainer}>
              <label>Group Name</label>
              <input
                type="text"
                placeholder="Enter your group name...."
                name="groupName"
                onChange={handleGroupName}
                className={styles.inputGroupName}
              ></input>
            </div>
            {/* note group color */}
            <div className={styles.modalInnerContainer}>
              <p>Choose colour</p>
              <div className={styles.chooseColor}>
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
                          color === backgroundColor ? "2px solid green" : ""
                        }`,
                      }}
                      key={color}
                    ></div>
                  );
                })}
              </div>
            </div>
            {/* create button */}
            <div className={styles.createButtonContainer}>
              <button
                onClick={handleCreateNote}
                className={styles.createButton}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
