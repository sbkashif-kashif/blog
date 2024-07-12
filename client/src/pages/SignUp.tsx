import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState, ChangeEvent, FormEvent } from "react"

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill out all fields.")
    }
    try{
      setLoading(true);
      setErrorMessage(null)
      const response = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      if (response.ok) {
        setSuccessMessage(data.message)
        setLoading(false)
        setTimeout(() => {
          navigate("/signin")
        },2000)
      } else {
        setErrorMessage(data.message || "An error occurred during sign up.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Shaik's</span>
            Blog
        </Link>
        <p className="text-sm mt-5">
          This is Shaik's Blog website. you can signup with your email & password or with Google to read Shaik's project blogs.
        </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Enter your username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="username@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Enter your Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (<>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>) : "Sign Up"
              }
            </Button>
          </form>
          <div>
            <span>Hav an account?</span>
            <Link to='signin' className="text-blue-500">Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )
          }
          {
            successMessage && (
              <Alert className="mt-5" color="success">
                {successMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp