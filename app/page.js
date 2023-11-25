'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";

export default function Home() {
  const [animationClass, setAnimationClass] = useState('');
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male'); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);

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
    setCalculatedValue(calculatedResult);
  }, [age, height, weight, gender]);

  const calculateMaintenanceCalorie = () => {
    const baseFormula = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? baseFormula + 5 : baseFormula - 161;
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
              <Typewriter text="Calorie Guard" delay={300} />
            </div>
          </div>
          <div className='text-black w-[10%] mt-5 ms-[40%] flex flex-col justify-center items-center'>
            <img width="44" height="44" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-early-bird-cyber-monday-flaticons-flat-flat-icons.png" alt="external-early-bird-cyber-monday-flaticons-flat-flat-icons" />
            <p>Donate Now</p>
            <p>Support Us</p>
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
          <section className="calorie-section mt-10 p-10 w-[50%] ms-40 mt-40 mb-20 rounded-xl text-black" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', background: 'linear-gradient(to bottom, transparent, skyblue)' }}>
            <h2 className="text-2xl font-bold mb-5">Calculate Your Maintenance Calorie</h2>
            <div className="flex flex-col">
              <label htmlFor="age" className="mb-2">Age:</label>
              <input type="number" id="age" name="age" className="p-2 mb-4 input-border" onChange={(e) => setAge(e.target.value)} />

              <label htmlFor="height" className="mb-2">Height (in cm):</label>
              <input type="range" id="height" name="height" min="50" max="300" className="mb-2 input-border" onChange={(e) => setHeight(e.target.value)} />
              <span>{`Selected Height: ${height} cm`}</span>

              <label htmlFor="weight" className="mb-2">Weight (in kg):</label>
              <input type="number" id="weight" name="weight" className="p-2 mb-4 input-border" onChange={(e) => setWeight(e.target.value)} />

              <div className="mb-2">Gender:</div>
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

            {/* Display the calculated value */}
            <div className="mt-4">
              <strong>Calculated Value:</strong> {calculatedValue}
            </div>
          </section>
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
`}</style>
      </main>
      :
      <main className="h-full w-screen bg-cover bg-center bg-white overflow-hidden relative">
        <div className='flex flex-row w-screen h-fit justify-start items-center' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div
            className={`logo-container ${animationClass} m-5 w-[50%] flex text-black flex-row items-center`}
            style={{
              overflow: 'hidden',
              animation: 'glide 1s forwards',
            }}
          >
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <div className='text-black ms-5 text-xl font-bold'>
              <Typewriter text="Calorie Guard" delay={200} />
            </div>
          </div>

          <div className='ms-10'>
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
          <div className='text-black w-[80%] ms-10 mt-5 flex flex-row justify-between items-center border rounded-xl'>
            <div className='ms-10 bg-orange-700 text-white p-5'>DONATE NOW</div>
            <div className='felx flex-col me-5 py-5'>
            <img width="44" height="44" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-early-bird-cyber-monday-flaticons-flat-flat-icons.png" alt="external-early-bird-cyber-monday-flaticons-flat-flat-icons" />
            <p>Support Us</p>
            </div>
          </div>
          <div className='relative px-5'>
          <section className="absolute top-0 mt-10 p-10 w-[90%] mt-40 mb-20 rounded-xl text-black" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', background: 'linear-gradient(to bottom, transparent, skyblue)' }}>
              <h2 className="text-2xl font-bold mb-5">Calculate Your Maintenance Calorie</h2>
              <div className="flex flex-col">
                <label htmlFor="age" className="mb-2">Age:</label>
                <input type="number" id="age" name="age" className="p-2 mb-4 input-border" onChange={(e) => setAge(e.target.value)} />

                <label htmlFor="height" className="mb-2">Height (in cm):</label>
                <input type="range" id="height" name="height" min="50" max="300" className="mb-2 input-border" onChange={(e) => setHeight(e.target.value)} />
                <span>{`Selected Height: ${height} cm`}</span>

                <label htmlFor="weight" className="mb-2">Weight (in kg):</label>
                <input type="number" id="weight" name="weight" className="p-2 mb-4 input-border" onChange={(e) => setWeight(e.target.value)} />

                <div className="mb-2">Gender:</div>
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

              {/* Display the calculated value */}
              <div className="mt-4">
                <strong>Calculated Value:</strong> {calculatedValue}
              </div>
            </section>
          </div>
        </div>

        <style jsx>{`
  .scrollable-container {
    height: 90vh; /* Set the maximum height as needed */
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
`}</style>
      </main>
    )
  );
}
