import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../app/user/userSlice";
import { RootState } from "../types/types";
import OAuth from "../components/OAuth";
import Description from "../components/Description";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const { loading } = useSelector((state: RootState) => state.user); // Removed unused error and success
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null);
  const [localSuccessMessage, setLocalSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLocalErrorMessage("Fill in all the fields.");
      dispatch(signInFailure("Fill in all the fields."));
      return;
    }
    try {
      dispatch(signInStart());
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setLocalErrorMessage(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      if (response.ok) {
        setLocalSuccessMessage("Sign in successful!");
        dispatch(signInSuccess(data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLocalErrorMessage(data.message || "An error occurred during sign up.");
        dispatch(signInFailure(data.message || "An error occurred during sign up."));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLocalErrorMessage(error.message);
        dispatch(signInFailure(error.message));
      } else {
        setLocalErrorMessage("An unknown error occurred.");
        dispatch(signInFailure("An unknown error occurred."));
      }
    }
  };

  useEffect(() => {
    if (localErrorMessage || localSuccessMessage) {
      const timer = setTimeout(() => {
        setLocalErrorMessage(null);
        setLocalSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [localErrorMessage, localSuccessMessage]);

  return (
    <div className="mt-20 mb-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10">
        {/* left */}
        <Description />
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="username@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Enter your Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : "Sign In"}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5">
            <span>Don't Have an account? </span>
            <Link to='/signup' className="text-blue-500">Sign Up</Link>
          </div>
          {localErrorMessage && (
            <Alert className="mt-5" color="failure">
              {localErrorMessage}
            </Alert>
          )}
          {localSuccessMessage && (
            <Alert className="mt-5" color="success">
              {localSuccessMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
