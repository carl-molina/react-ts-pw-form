import React, { useState } from "react";
import "./App.css";
import PasswordForm from "./PasswordForm";


/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */

function App() {
  const [count, setCount] = useState(0);

  function incrCount() {
    setCount(count => count + 1);
  }



  // function handleSave(formData: ITodoFormData) {
  //   update({ ...formData, id: todo.id});
  //   setIsEditing(false);
  // }

  return (
    <div className="App">
      <main>
        <PasswordForm />
      </main>
    </div>
  );
};

export default App;
