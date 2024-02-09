import React, { useState } from "react";
import "./App.css";
import PasswordForm from "./PasswordForm";
import { IPasswordFormData, IUserData } from "./interfaces";


const DEFAULT_USER_DATA: IUserData = {
  password: ""
}

/** Component for entire page.
 *
 *  Props: none
 *  State: userData
 *
 *  App -> PasswordForm
 */

function App() {
  const [userData, setUserData] = useState<IUserData>(DEFAULT_USER_DATA);

  console.log('This is App w/ userData: ', userData);

  function handleSave(formData: IPasswordFormData): void {
    const { newPw } = formData;
    setUserData({
      password: newPw
    })
  }

  return (
    <div className="App">
      <main>
        <PasswordForm handleSave={handleSave}/>
      </main>
    </div>
  );
};

export default App;
