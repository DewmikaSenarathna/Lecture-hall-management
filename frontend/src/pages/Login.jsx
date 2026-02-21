import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <span className="text-indigo-600 text-3xl">➔</span>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Welcome back! Please login to your account.
        </p>

        {/* FORM */}
        <form className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User name
            </label>
            <input
              type="text"
              placeholder="Enter your user name"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Login
          </button>

        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <span className="text-lg font-semibold text-gray-700">G</span>
          <span className="text-sm font-medium text-gray-700">
            Continue with google
          </span>
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* DEMO CREDENTIALS */}
        <div className="mt-8 border border-blue-300 bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">
            Demo Credentials:
          </h4>
          <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>Username: lecturer / student / hod</li>
            <li>Password: any password</li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default Login;