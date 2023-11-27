'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  const [animationClass, setAnimationClass] = useState('');
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState('male'); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);


  const handleDownload = () => {
    const imageUrl = '/scanner.jpg'; // Replace with the actual path or URL of your image
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'payment_scanner.jpg'; // Specify the desired filename
    downloadLink.click();
  };




  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex, animationClass]);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;

      // Loop to the first slide if reached the end
      if (newIndex > 3) {
        newIndex = 1;
      }

      // Loop to the last slide if reached the beginning
      if (newIndex < 1) {
        newIndex = 3;
      }

      return newIndex;
    });
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };







  const [isDivOpen, setIsDivOpen] = useState(false);
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    let countdownInterval;

    if (isDivOpen) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Update countdown every second
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isDivOpen]);

  useEffect(() => {
    if (countdown <= 0) {
      setIsDivOpen(false);
    }
  }, [countdown]);

  const handleDivClick = () => {
    setIsDivOpen(!isDivOpen);
    setCountdown(300);
  };

  const handleCloseClick = () => {
    setIsDivOpen(false);
    setCountdown(300);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;



  useEffect(() => {
    // Add a delay to start the animation after the component is mounted
    const timeout = setTimeout(() => {
      setAnimationClass('animate-logo');
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Calculate maintenance calorie using the provided formula
    const calculatedResult = calculateMaintenanceCalorie();
    const calculatedResultRounded = Math.round(calculatedResult);
    setCalculatedValue(calculatedResultRounded);
  }, [age, height, weight, gender]);

  const calculateMaintenanceCalorie = () => {
    return gender === 'male' ? 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age) : 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
  };

  const Typewriter = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      let timeout;

      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);
      }

      return () => clearTimeout(timeout);
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    (windowWidth >= 768 ?
      <main className="h-screen w-screen bg-cover bg-center bg-white overflow-hidden relative">
        <div className='flex flex-row w-screen h-fit justify-start items-center' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div
            className={`logo-container ${animationClass} m-5 w-[30%] flex gap-4 text-black flex-row items-center`}
            style={{
              overflow: 'hidden',
              animation: 'glide 1s forwards',
            }}
          >
            <Image src="/logo.png" alt="logo" width={80} height={80} />
            <div className='text-black text-3xl font-bold'>
              <h1><Typewriter text="Calorie Guard" delay={300} /></h1>
            </div>
          </div>

          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
              zIndex: isDivOpen ? '999' : '-1', // show overlay only when isDivOpen is true
              display: isDivOpen ? 'block' : 'none', // hide overlay when isDivOpen is false
            }}
          ></div>

          <div className='text-black w-[10%] mt-5 ms-[40%] flex flex-col justify-center items-center' onClick={handleDivClick} style={{ cursor: 'pointer' }}>
            <img
              width="44"
              height="44"
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-early-bird-cyber-monday-flaticons-flat-flat-icons.png"
              alt="external-early-bird-cyber-monday-flaticons-flat-flat-icons"
            />
            <p>Donate Now</p>
            <p>Support Us</p>

            {isDivOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'white',
                  padding: '20px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                  zIndex: 999,
                }}
              >
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={handleCloseClick}>
                  &#10006;
                </span>
                <div className='text-center'>
                  <strong>SCAN to PAY</strong>
                  <Image src="/UPI.png" width={100} height={20} />
                </div>
                <div>
                  <Image src="/scanner.jpg" alt='Payment Scanner' height={300} width={300} />
                </div>
                <div className='text-center'>
                  Time remaining: <strong>{formatTime(minutes)}:{formatTime(seconds)}</strong>
                </div>
              </div>
            )}
          </div>
          <div className='me-20 ms-5'>
            <Image src="/playstore.png" height={5} width={150} />
          </div>
        </div>
        <div className="scrollable-container">
          <div
            className="absolute right-64 transform translate-x-full"
            style={{
              width: '400px',
            }}
          >
            <Image
              src="/image1.png"
              alt="Healthy food"
              width={600}
              height={600}
              className='rounded-full spin-image'
              style={{
                boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.75)',
                animation: 'spin 10s infinite linear',
              }}
            />
          </div>
          <blockquote className="relative quote w-[70%] h-fit ms-[7%] mt-20 bg-[#bfebf5]">
            <ImQuotesLeft size={30} />
            <p className='p-5 ps-14'>The dream that everyone seeks –
              A life without medicine.
              The world will be a better place if that happens!</p>
            <ImQuotesRight size={30} className='absolute right-5 bottom-5' />
          </blockquote>
          <div className='w-screen flex justify-center'>
            <Image src="/down.gif" height={60} width={60} className='me-40' />
          </div>
          <div className='relative ms-20 mt-20 h-[60vh] w-[70%] bg-white text-white rounded-3xl p-10' style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
            <div className="slideshow-container text-black">

              <div className="mySlides fade">
                <div className="text">What we do?</div>
                <div className='w-full flex justify-center'>
                  <div className='w-80 text-xl text-center'>We help everyone to become fit and healthy and build their dream body type. 💪🌿✨</div>
                </div>
              </div>

              <div className="mySlides fade">
                <div className="text">How we do it?</div>
                <div className='w-full flex justify-center'>
                  <div className='w-80 text-xl text-center'>We provide the most efficient & accurate way to track down calories of any food. 📊🍽️💡</div>
                </div>
              </div>

              <div className="mySlides fade">
                <div className="text">How it works?</div>
                <div className='w-full flex justify-center'>
                  <div className='w-80 text-xl text-center'>Know about your maintenance calories via our maintenance calorie calculator. 🧮✨ Track your daily calories through our food tracker. It's that simple! 📊🍽️ </div>
                </div>
              </div>

              <a className="prev" onClick={() => plusSlides(-1)}>
                ❮
              </a>
              <a className="next" onClick={() => plusSlides(1)}>
                ❯
              </a>

              <div style={{ textAlign: 'center' }} className='pt-10'>
                <span className="dot" onClick={() => currentSlide(1)}></span>
                <span className="dot" onClick={() => currentSlide(2)}></span>
                <span className="dot" onClick={() => currentSlide(3)}></span>
              </div>
            </div>
            <a href='#' className='absolute bottom-5 text-black text-blue-700 text-[10px] flex flex-row gap-2'><p>Know More </p><FaExternalLinkAlt size={10} /></a>
          </div>
          <section className="calorie-section mt-10 p-10 w-[50%] ms-40 mt-40 mb-20 rounded-xl text-black" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', background: 'linear-gradient(to bottom, transparent, skyblue)' }}>
            <h2 className="text-2xl font-bold mb-5">Calculate Your Maintenance Calorie</h2>
            <div className="flex flex-col">
              <label htmlFor="age" className="mb-2">Age:</label>
              <input type="number" id="age" name="age" value={age} className="p-2 mb-4 input-border" onChange={(e) => setAge(e.target.value)} />

              <label htmlFor="height" className="mb-2 mt-5">Height : <span>{`${height} cm`}</span></label>
              <input
                type="range"
                id="height"
                name="height"
                min="50"
                max="300"
                className=''
                style={{ width: '100%' }}
                onChange={(e) => setHeight(e.target.value)}
              />

              <label htmlFor="weight" className="mb-2 mt-8">Weight (in kg):</label>
              <input type="number" id="weight" name="weight" value={weight} className="p-2 mb-4 input-border" onChange={(e) => setWeight(e.target.value)} />

              <div className="mb-2 mt-5">Gender:</div>
              <div className="flex mb-4">
                <div
                  className="gender-option"
                  style={{ background: gender === 'male' ? 'orange' : 'white' }}
                  onClick={() => setGender('male')}
                >
                  Male
                </div>
                <div
                  className="gender-option"
                  style={{ background: gender === 'female' ? 'orange' : 'white' }}
                  onClick={() => setGender('female')}
                >
                  Female
                </div>
              </div>

              <button className="bg-orange-700 text-white py-2 px-4 rounded">Calculate</button>
            </div>

            <div className="mt-4 text-3xl text-center">
              <strong>Maintenance Calories: </strong> {calculatedValue}<strong> cals</strong>
              <a className='flex flex-row justify-center h-fit items-center text-blue-700 text-[15px]' href='https://www.google.com/search?q=what+is+maintenance+calories&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=AM9HkKk_T3MplQdJwjFuAjxPjbRLaSwk7w%3A1701007787177&ei=q1FjZaqnCoWm2roPgJ2HsAU&ved=0ahUKEwjqqKjn6-GCAxUFk1YBHYDOAVYQ4dUDCBA&uact=5&oq=what+is+maintenance+calories&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXQgaXMgbWFpbnRlbmFuY2UgY2Fsb3JpZXMyChAjGIAEGIoFGCcyBhAAGAcYHjILEAAYgAQYigUYkQIyCxAAGIAEGIoFGJECMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSI0MUIMDWPwJcAB4ApABAJgB8AGgAdUMqgEFMC42LjK4AQPIAQD4AQHCAgQQABhH4gMEGAAgQeIDBRIBMSBAiAYBkAYI&sclient=gws-wiz-serp'><strong><br />Know more about Maintenance Calorie</strong><FaExternalLinkAlt className='mt-8 ms-2' size={15} /></a>
            </div>
          </section>
          <h1 className='text-black text-5xl font-bold ms-32 mb-10'>What we Promise?</h1>
          <div className='text-black flex flex-row items-center'>
            <Image src="/resturant.png" height={300} width={260} alt='App View' className='ms-32' />
            <h2 className='text-3xl ms-10 font-bold'>All your Local Resturant's<br /><br />Food Calorie Data<br /><br />at Your Finger Tips<br /><br /><strong className='text-xl'>Comming soon....</strong></h2>
          </div>
          <div className='text-black flex flex-row items-center mt-10'>
            <h2 className='ms-32 text-3xl ms-10 font-bold me-5'>Scan your Foods<br /><br />and get Caloriefic Data<br /><br />at Your Finger Tips<br /><br /><strong className='text-xl'>Comming soon....</strong></h2>
            <Image src="/lens.png" height={300} width={260} alt='App View' />
          </div>
          <div className='flex flex-row justify-between mt-20 mb-5 px-10 items-center w-[80%] text-[#424242]'>
            <p>Copyright © 2023 CalorieGuard Inc. All rights reserved.</p>
            <div className='flex gap-5'>
              <a href='https://instagram.com/calorieguard.in?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=='>Contact Us</a>
              <a href='https://sites.google.com/view/calorie-guard/home'>Privacy</a>
              <a href='https://sites.google.com/view/calorieguard1/home'>Terms of use</a>
            </div>
          </div>
        </div>

        <style jsx>{`
  .scrollable-container {
    max-height: 80vh; /* Set the maximum height as needed */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
  }

  @keyframes glide {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .input-border {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
  }

  .gender-option {
    cursor: pointer;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .quote {
    border: 2px solid #333; /* Dark grey border */
    border-radius: 10px; /* Rounded corners */
    padding: 20px;
    font-size: 2.2rem; /* Adjust the font size as needed */
    font-family: 'Arial', sans-serif; /* Use a suitable font-family */
    color: #333; /* Dark grey text color */
    animation: fadeInDown 1s ease-out;
  }


  
  .slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
  }


  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: black;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }


  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
  }

  .text {
    color: black;
    font-size: 40px;
    padding: 8px 12px;
    width: 100%;
    text-align: center;
  }

  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }


  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active, .dot:hover {
    background-color: #717171;
  }

  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
  }

`}</style>
      </main>
      :
      <main className="h-full w-screen bg-cover bg-center bg-white overflow-hidden relative">
        <div className='flex flex-row w-screen h-fit justify-start items-center' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div
            className={`logo-container ${animationClass} m-5 w-[70%] flex text-black flex-row items-center`}
            style={{
              overflow: 'hidden',
              animation: 'glide 1s forwards',
            }}
          >
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <div className='text-black ms-5 w-full text-xl font-bold'>
              <Typewriter text="Calorie Guard" delay={200} />
            </div>
          </div>

          <div className='me-5'>
            <Image src="/playstore.png" height={5} width={100} />
          </div>
        </div>
        <div className="scrollable-container">
          <div
            className="absolute right-64 transform translate-x-full"
            style={{
              width: '400px',
            }}
          >
            <Image
              src="/image1.png"
              alt="Healthy food"
              width={600}
              height={600}
              className='rounded-full spin-image'
              style={{
                boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.75)',
                animation: 'spin 10s infinite linear',
              }}
            />
          </div>
          <div className='w-full'>
            <blockquote className="relative quote w-[70%] h-fit ms-[7%] mt-20 bg-[#bfebf5]">
              <ImQuotesLeft size={30} />
              <p className='p-5 ps-14'>The dream that everyone seeks –
                A life without medicine.
                The world will be a better place if that happens!</p>
              <ImQuotesRight size={30} className='absolute right-5 bottom-5' />
            </blockquote>
          </div>
          <div className='w-screen flex justify-center'>
            <Image src="/down.gif" height={60} width={60} className='me-40' />
          </div>

          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
              zIndex: isDivOpen ? '999' : '-1', // show overlay only when isDivOpen is true
              display: isDivOpen ? 'block' : 'none', // hide overlay when isDivOpen is false
            }}
          ></div>

          <div className='relative'>
            <div className='absolute top-0 text-black w-[80%] bg-white ms-10 mt-5 flex flex-row justify-between items-center border rounded-xl'>
              <div className='ms-10 bg-orange-700 text-white p-5' onClick={handleDivClick}>DONATE NOW</div>
              <div className='felx flex-col me-5 py-5'>
                <img width="44" height="44" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-early-bird-cyber-monday-flaticons-flat-flat-icons.png" alt="external-early-bird-cyber-monday-flaticons-flat-flat-icons" />
                <p>Support Us</p>
              </div>
              {isDivOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: '20%',
                    left: '20%',
                    transform: 'translate(-10%, -10%)',
                    background: 'white',
                    padding: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    zIndex: 999,
                  }}
                >
                  <span style={{ float: 'right', cursor: 'pointer' }} onClick={handleCloseClick}>
                    &#10006;
                  </span>
                  <Image src="/UPI.png" width={60} height={20} alt='UPI' />
                  <div>
                    <Image src="/scanner.jpg" alt='Calorie Guard Payment Scanner' height={400} width={400} />
                  </div>
                  <div className='text-center'><strong>SCAN & PAY<br />or</strong></div>
                  <div className='text-center'>
                    <button onClick={handleDownload} className='bg-orange-700 text-white rounded-xl p-3 mt-3 mb-5'>Download QR</button>
                  </div>
                  <div className='text-center'>
                    Time remaining: <strong>{formatTime(minutes)}:{formatTime(seconds)}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='relative mx-5'>
            <div className='h-[45vh] w-full bg-white text-white absolute top-[30vh] rounded-3xl p-10' style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
              <div className="slideshow-container text-black pt-5">

                <div className="mySlides fade">
                  <div className="text">What we do?</div>
                  <div className='w-full flex justify-center'>
                    <div className='w-40 text-[15px] text-center'>We help everyone to become fit and healthy and build their dream body type. 💪🌿✨</div>
                  </div>
                </div>

                <div className="mySlides fade">
                  <div className="text">How we do it?</div>
                  <div className='w-full flex justify-center'>
                    <div className='w-40 text-[15px] text-center'>We provide the most efficient & accurate way to track down calories of any food. 📊🍽️💡</div>
                  </div>
                </div>

                <div className="mySlides fade">
                  <div className="text">How it works?</div>
                  <div className='w-full flex justify-center'>
                    <div className='w-40 text-[10px] text-center'>Know about your maintenance calories via our maintenance calorie calculator. Track your daily calories through our food tracker. It's that simple! 📊🍽️ </div>
                  </div>
                </div>

                <a className="prev" onClick={() => plusSlides(-1)}>
                  ❮
                </a>
                <a className="next" onClick={() => plusSlides(1)}>
                  ❯
                </a>

                <div style={{ textAlign: 'center' }} className='pt-5'>
                  <span className="dot" onClick={() => currentSlide(1)}></span>
                  <span className="dot" onClick={() => currentSlide(2)}></span>
                  <span className="dot" onClick={() => currentSlide(3)}></span>
                </div>
              </div>
              <a href='#' className='absolute bottom-5 text-black text-blue-700 text-[10px] flex flex-row gap-2'><p>Know More </p><FaExternalLinkAlt size={10} /></a>
            </div>
          </div>

          <div className='relative px-5'>
            <section className="absolute top-[65vh] mt-10 p-10 w-[90%] mt-40 mb-20 rounded-xl text-black bg-[#03dffc80]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
              <h2 className="text-2xl font-bold mb-5">Calculate Your Maintenance Calorie</h2>
              <div className="flex flex-col">
                <label htmlFor="age" className="mb-2">Age:</label>
                <input type="number" id="age" name="age" value={age} className="p-2 mb-4 input-border" onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="height" className="mb-2 mt-5">Height : <span>{`${height} cm`}</span></label>
                <input
                  type="range"
                  id="height"
                  name="height"
                  min="50"
                  max="300"
                  className=''
                  style={{ width: '100%' }}
                  onChange={(e) => setHeight(e.target.value)}
                />

                <label htmlFor="weight" className="mb-2 mt-8">Weight (in kg):</label>
                <input type="number" id="weight" name="weight" value={weight} className="p-2 mb-4 input-border" onChange={(e) => setWeight(e.target.value)} />

                <div className="mb-2 mt-5">Gender:</div>
                <div className="flex mb-4">
                  <div
                    className="gender-option"
                    style={{ background: gender === 'male' ? 'orange' : 'white' }}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </div>
                  <div
                    className="gender-option"
                    style={{ background: gender === 'female' ? 'orange' : 'white' }}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </div>
                </div>

                <button className="bg-orange-700 text-white py-2 px-4 rounded">Calculate</button>
              </div>

              <div className="mt-4 text-xl text-center mt-10">
                <strong>Maintenance Calories<br /></strong> {calculatedValue}<strong> cals</strong>
                <a className='flex flex-row justify-center h-fit items-center text-blue-700 text-[10px]' href='https://www.google.com/search?q=what+is+maintenance+calories&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=AM9HkKk_T3MplQdJwjFuAjxPjbRLaSwk7w%3A1701007787177&ei=q1FjZaqnCoWm2roPgJ2HsAU&ved=0ahUKEwjqqKjn6-GCAxUFk1YBHYDOAVYQ4dUDCBA&uact=5&oq=what+is+maintenance+calories&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXQgaXMgbWFpbnRlbmFuY2UgY2Fsb3JpZXMyChAjGIAEGIoFGCcyBhAAGAcYHjILEAAYgAQYigUYkQIyCxAAGIAEGIoFGJECMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSI0MUIMDWPwJcAB4ApABAJgB8AGgAdUMqgEFMC42LjK4AQPIAQD4AQHCAgQQABhH4gMEGAAgQeIDBRIBMSBAiAYBkAYI&sclient=gws-wiz-serp'><strong><br />Know more about Maintenance Calorie</strong><FaExternalLinkAlt className='mt-8 ms-2' size={10} /></a>
              </div>
            </section>
            <div className='absolute top-[210vh]'>
              <h1 className='text-black text-5xl font-bold pb-10'>What we Promise?</h1>
              <div className='text-black flex flex-row items-center bg-[#FFFFFF90] rounded-t-3xl'>
                <Image src="/resturant.png" height={300} width={260} alt='App View' />
                <h2 className='text-2xl font-bold ms-5'>All your Local Resturant's<br />Food Calorie <br />Data at Your Finger Tips<br /><br /><strong className='text-xl'>Comming soon....</strong></h2>
              </div>
              <div className='text-black flex flex-row items-center pt-10 bg-[#FFFFFF90]'>
                <h2 className='text-2xl ms-10 font-bold me-5'>Scan your Foods<br />and get Caloriefic Data<br />at Your Finger Tips<br /><strong className='text-xl'>Comming soon....</strong></h2>
                <Image src="/lens.png" height={300} width={260} alt='App View' />
              </div>
              <div className='flex flex-row text-[10px] justify-between mt-20 mb-5 items-top w-full text-[#424242]'>
                <p>Copyright © 2023 CalorieGuard Inc.<br /> All rights reserved.</p>
                <div className='flex gap-5 pe-5'>
                  <a href='https://instagram.com/calorieguard.in?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=='>Contact Us</a>
                  <a href='https://sites.google.com/view/calorie-guard/home'>Privacy</a>
                  <a href='https://sites.google.com/view/calorieguard1/home'>Terms of use</a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <style jsx>{`
  .scrollable-container {
    height: 100vh; /* Set the maximum height as needed */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
  }

  @keyframes glide {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .input-border {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
  }

  .gender-option {
    cursor: pointer;
    padding: 8px;
    margin-right: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .quote {
    border: 2px solid #333; /* Dark grey border */
    border-radius: 10px; /* Rounded corners */
    padding: 20px;
    font-size: 1.2rem; /* Adjust the font size as needed */
    font-family: 'Arial', sans-serif; /* Use a suitable font-family */
    color: #333; /* Dark grey text color */
    animation: fadeInDown 1s ease-out;
  }


  .slideshow-container {
    max-width: 1000px;
    position: relative;
    margin: auto;
  }


  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: black;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }


  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  .text {
    color: black;
    font-size: 35px;
    padding: 8px 12px;
    width: 100%;
    text-align: center;
  }

  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }


  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
  }

  .active, .dot:hover {
    background-color: #717171;
  }

  .fade {
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
  }

`}</style>
      </main>
    )
  );
}
