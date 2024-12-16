import React, { useState } from "react";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    e.preventDefault();
  };

  return;
  <form onSubmit={handleSignup}></form>;
}

export default SignUpForm;
