import React, { useState } from "react";
import { axiosWithAuth } from '../utils';
import { createPortal } from "react-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);

  const editColor = color => {
    setAdding(false); //make sure the adding form isn't showing
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    setEditing(false);
    setAdding(true);
  }

  const save = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if (editing) {
      axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
          updateColors(colors.map(color => {
            if (color.id === colorToEdit.id) {
              return res.data;
            }
            return color;
          }));
      }).catch(err => console.log(err));
    } else {
      axiosWithAuth()
        .post('/api/colors', colorToEdit)
        .then(res => {
          //res.data returns new colors array
          updateColors(res.data);
        }).catch(err => console.log(err));
    }
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        //responds with id of deleted item
        updateColors(colors.filter(col => col.id !== res.data));
      }).catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors <span onClick={addColor}>+</span></p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {(editing || adding) && (
        <form onSubmit={save}>
          {editing && (<legend>edit color</legend>) || adding && (<legend>add color</legend>)}
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => {
                setEditing(false);
                setColorToEdit(initialColor); //set back to blank to avoid inputs being populated upon adding
              }}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
