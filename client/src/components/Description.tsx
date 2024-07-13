import { Link } from "react-router-dom"

const Description = () => {
  return (
    <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Shaik's</span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is Shaik's Blog website. you can signup with your email & password or with Google to read Shaik's project blogs.
          </p>
    </div>
  )
}

export default Description