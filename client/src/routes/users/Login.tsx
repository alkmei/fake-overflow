import { FormEvent, useState } from "react";
import FormError from "@/components/FormError.tsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      valid = false;
    }

    if (valid) {
      const user = {
        email: email,
        password: password,
      };

      // TODO: ask server if correct credentials if so then login if not update errors accordingly
      // The user enters an unregistered email or an
      // incorrect password then the application should
      // report back appropriate feedback to the user on the
      // same page.
      console.log(user);
    }
  };

  return (
    <>
      <div className="shadow-xl rounded-2xl p-14">
        <form
          action=""
          className="flex flex-col gap-8 w-96"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-2">Log In</h1>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormError message={emailError} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormError message={passwordError} />
          </div>
          <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
