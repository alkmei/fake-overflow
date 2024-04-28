export default function Login() {
  return (
    <>
      <div className="shadow-xl rounded-2xl p-14">
        <form action="" className="flex flex-col gap-8 w-96">
          <h1 className="text-2xl font-bold mb-2">Log In</h1>
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
          <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
