import { IoPlaySharp } from "react-icons/io5";
import { SiGooglelens } from "react-icons/si";
import Link from "next/link";

export const SignInCard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 p-4 md:p-8">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-12 m-4 md:m-8 flex items-center justify-center shadow-lg max-w-xl">
        <div className="text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <IoPlaySharp size={28} className="animate-spin" />
            <h1 className="text-5xl font-bold tracking-wide">Converge AI</h1>
          </div>
          <h2 className="text-4xl font-semibold mb-4">The Future of Collaboration</h2>
          <p className="mt-2 text-lg leading-relaxed">
            🚀 Experience seamless, real-time collaboration
            with cutting-edge AI technology. <br />
            Connect, Create, Conquer! 🌟
          </p>
          <div className="mt-6">
            <img src="futuristic-image.jpg" alt="Futuristic Design" className="w-52 mx-auto rounded-lg" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 max-w-md w-full p-8 bg-white rounded-lg shadow-md m-4 md:m-8">
        <div className="flex items-center justify-center mb-6">
          <SiGooglelens size={40} />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back to Converge AI
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-500">Don't have an account?</span>
          <Link href="/sign-up" className="ml-2 text-indigo-600 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;