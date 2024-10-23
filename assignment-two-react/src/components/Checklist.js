import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Make sure to import your Firestore instance
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"; // Import Firestore functions
import "../css/Checklist.css"; // Import CSS for styling

const Checklist = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch items from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "checklistItems"),
      (snapshot) => {
        const fetchedItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(fetchedItems);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (inputValue) {
      // Add new item to Firestore
      await addDoc(collection(db, "checklistItems"), {
        text: inputValue,
        completed: false,
      });
      setInputValue(""); // Clear the input
    }
  };

  const handleToggleComplete = async (id, completed) => {
    const itemDoc = doc(db, "checklistItems", id);
    await updateDoc(itemDoc, { completed: !completed });
  };

  const handleRemoveItem = async (id) => {
    const itemDoc = doc(db, "checklistItems", id);
    await deleteDoc(itemDoc);
  };

  return (
    <div className="checklist">
      <h3 className="checklist-title">My Checklist</h3>
      <form onSubmit={handleAddItem} className="checklist-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          className="checklist-input"
        />
        <button type="submit" className="checklist-add-button">
          Add
        </button>
      </form>
      <ul className="checklist-items">
        {items.map((item) => (
          <li
            key={item.id}
            className={`checklist-item ${item.completed ? "completed" : ""}`}
          >
            <span className="checklist-item-text">{item.text}</span>
            <div className="checklist-buttons">
              <button
                onClick={() => handleToggleComplete(item.id, item.completed)}
                className={`checklist-done-button ${
                  item.completed ? "completed" : ""
                }`}
              >
                {item.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="checklist-remove-button"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
