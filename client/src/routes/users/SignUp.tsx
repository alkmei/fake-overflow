export default function SignUp() {
  return (
    <>
      <div className="shadow-xl rounded-2xl p-14">
        <form action="" className="flex flex-col gap-8 w-96">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="vpassword">Verify Password</label>
            <input
              type="password"
              id="vpassword"
              name="vpassword"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
