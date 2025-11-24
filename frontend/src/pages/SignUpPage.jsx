import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Eye, Loader, Mail, MessageSquare , Lock ,EyeOff ,User, Loader2} from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import  {toast , Toaster}  from 'react-hot-toast';
const SignUpPage = () => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {signup , isSigningUp } = useAuthStore();
  const [showPassword , setShowPassword] = React.useState(false);
  
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email Address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const success = validateForm();
    if(success) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image or Illustration */}
      <div className='flex flex-col items-center justify-center gap-2 p-6 sm:p-12'>
        
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
        <div className='text-center mb-8'> 
            <div className='flex flex-col items-center gap-2 group'>
              <div
                className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 trasition-colors'>
                  <MessageSquare className='size-6 text-primary '/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get Started with your free Account</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 text-base-content/40' />
              </div>
              <input
                type='text'
                className='input input-bordered w-full pl-10'
                placeholder='Jhon Doe'
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                />
            </div>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Email</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 text-base-content/40' />
              </div>
              <input
                type='email'
                className={'input input-bordered w-full pl-10'}
                placeholder='you@example.com'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                />
            </div>
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-5 text-base-content/40' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className={'input input-bordered w-full pl-10'}
                placeholder='********'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                />
                <button 
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    (<EyeOff className='size-5 text-base-content/40' />) : ( <Eye className='size-5 text-base-content/40' /> ) }
                </button>
            </div>
          </div>


          <button
            type='submit'
            className='btn btn-primary w-full'
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className='size-5 animate-spin' />
                Loading...
              </>
            ): (
              "Create Account"
            )}
          </button>

        </form>

        <div className='text-center'>
          <p className='text-base-content/60'>
            Already have an account? {" "}
            <Link to="/login" className='link link-primary'>
               Sign In
            </Link>
          </p>

        </div>
        </div>
      </div> 

      {/* Right Side - Image or Illustration */}
      <AuthImagePattern
        title = "Join Our Community"
        subtitle ="Connect with friends , share moments , and explore the world together."
      />
    </div>

  )
}

export default SignUpPage