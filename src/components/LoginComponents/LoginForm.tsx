'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'



type LoginForm = {
  email_or_username: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>(
    { email_or_username: '', password: '' },
  )
  const formRef = useRef<HTMLFormElement>(null);
  const [activeBullet, setActiveBullet] = useState(1);
  const [strength, setStrength] = useState('');
  const [password, setPassword] = useState<string>('');
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [requirements, setRequirements] = useState<string[]>([
    
  ]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  /*   const handleOnSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      login(form).then(res => {
        fetcher.setToken(res.access_token)
        router.replace('/')
      }).catch(error => {
        if (error instanceof FetchingError) {
          if (error.statusCode === 401) {
            toast.error('Wrong email/username or password')
          }
          return
        }
        toast.error('Something went wrong!')
      })
    } */

  const [isFocused, setIsFocused] = useState(false);


  const checkPasswordStrength = (value: string): void => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const isLengthValid = value.length >= 8;

    let newSliderPosition = 0;
    let newRequirements: string[] = [];

    if (!hasUppercase) {
      newRequirements.push('😖 Weak. Must contain 8 characters');
    } else {
      if (!hasLowercase) {
        newRequirements.push('😐 So-so. Must contain at least 1 letter');
      } else {
        newSliderPosition = 40;
        if (!hasDigit) {
          newRequirements.push('😋 Almost. Must contain at least 1 digit');
        } else {
          newSliderPosition = 60;
          if (!hasSpecialChar) {
            newRequirements.push('😎 Awesome. Must contain special symbol');
          } else {
            newSliderPosition = 80;
            if (!isLengthValid) {
              newRequirements.push('🚀 Great! Perfect password');
            } else {
              newRequirements.push('🚀 Great! Perfect password');
              newSliderPosition = 100;
            }
          }
        }
      }
    }

    setSliderPosition(newSliderPosition);
    setRequirements(newRequirements);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPassword: string = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const showIndicator = form.password !== '';
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleSignUpMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };
  const moveSlider = (index: number) => {
    setActiveBullet(index);
    switch (index) {
      case 1:
        setText("Create your own courses");
        break;
      case 2:
        setText("Customize as you like");
        break;
      case 3:
        setText("Invite students to your class");
        break;
      default:
        setText("");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextBullet = activeBullet % 3 + 1; // Loop through 1, 2, 3
      moveSlider(nextBullet);
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [activeBullet]);

  const bulletArray = [1, 2, 3];
  const [text, setText] = useState("Create your own courses");

  return (
    <main className={isSignUpMode ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form action="index.html" autoComplete="off" className="sign-in-form">
              <div className="logo">
                <img src="./assets/logo.png" alt="easyclassName" className="w-100 h-100" />
              </div>


              <div className="heading">
                <h2>Log in to your account</h2>
                <h6>Not registred yet?</h6>
                <a href="#" className="toggle" onClick={toggleSignUpMode}>Sign up</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength={4}
                    className={`input-field ${isFocused ? 'active' : ''}`}
                    autoComplete="off"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minLength={4}
                    className={`input-field ${isFocused ? 'active' : ''}`}
                    autoComplete="off"
                    onChange={handlePasswordChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                  />

                  <label>Password</label>
                </div>


                <input type="submit" value="Sign In" className="sign-btn" />

                <div className='different-login'>
                  <p>
                    or
                  </p>
                </div>

                <div className="input-wrap">
                  <button type="button" className="login-with-google-btn">
                    Sign in with Google
                  </button>
                </div>


                <p className="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>


              </div>
            </form>

            <form action="index.html" autoComplete="off" className="sign-up-form">
              <div className="logo">
                <img src="./assets/logo.png" alt="easyclassName" className="w-100 h-100" />
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={toggleSignUpMode}>Sign in</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength={4}
                    className={`input-field ${isFocused ? 'active' : ''}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="off"
                    required
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    className={`input-field ${isFocused ? 'active' : ''}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="off"
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minLength={4}
                    autoComplete="off"
                    className={`input-field ${isFocused ? 'active' : ''}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handlePasswordChange}
                    required
                  />

                  <label>Password</label>
                </div>
                <div className='input-wrap'>
                  {requirements.map((requirement, index) => (
                    <div key={index} style={{ color: 'green', paddingTop: 2 }}>
                      {requirement}
                    </div>
                  ))}
                  <div
                    style={{
                      width: `${sliderPosition}%`,
                      height: '6px',
                      backgroundColor: sliderPosition >= 66.7 ? 'green' : sliderPosition >= 33.3 ? 'yellow' : 'red',
                      transition: 'width 0.3s',
                    }}
                  />
                </div>


                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>


            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper">
            <img src={`./assets/image${activeBullet}.png`} className={`image img-${activeBullet} show`} alt="" />
            </div>

            <div className="text-slider">
              <div className="text-wrap">
                <div className="text-group">
                  <h2>{text}</h2>

                </div>
              </div>

              <div className="bullets">
                {bulletArray.map((bullet, index) => (
                  <span
                    key={index}
                    className={`bullets ${bullet === activeBullet ? 'active' : ''}`}
                    onClick={() => moveSlider(bullet)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
