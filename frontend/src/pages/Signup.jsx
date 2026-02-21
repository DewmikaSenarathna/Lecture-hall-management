import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <span className="text-indigo-600 text-3xl">👤</span>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Sign up
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create your account to get started
        </p>

        {/* FORM */}
        <form className="space-y-5">

          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="hod">HOD</option>
              <option value="to">TO</option>
            </select>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Sign up
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        {/* BACK TO HOME */}
        <p className="text-center text-sm text-gray-500 mt-3">
          <Link to="/" className="hover:underline">
            Back to home page
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;