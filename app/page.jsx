"use client";
import Image from "next/image";
import { calculateBmr } from "./utils"
import { useEffect, useState } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Rajdhani } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import Link from "next/link";
import { frameworks } from "../constants";
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["500"] });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["500"] });

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState("male"); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);

  const handleDownload = () => {
    const imageUrl = "/scanner.jpg"; // Replace with the actual path or URL of your image
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "payment_scanner.jpg"; // Specify the desired filename
    downloadLink.click();
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
      setAnimationClass("animate-logo");
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const handleCalculate = (activity) => {
    // Calculate maintenance calorie using the provided formula
    let BMR = calculateBmr(gender, weight, age, height);
    let TEF = 0.1 * BMR;
    let TEE;
    switch (activity) {
      case "sedentary":
        TEE = BMR * 0.2;
        break;
      case "lightly-active":
        TEE = BMR * 0.375;
        break;
      case "moderately-active":
        TEE = BMR * 0.55;
        break;
      case "very-active":
        TEE = BMR * 0.725;
        break;
      case "extra-active":
        TEE = BMR * 0.9;
        break;
      default:
        break;
    }
    const calculatedResultRounded = Math.round(BMR + TEF + TEE);
    setCalculatedValue(calculatedResultRounded);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("sedentary");
  const ComboBox = () => {
    return (
      <Popover open={open} onOpenChange={setOpen} className="w-full text-[#333] ">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start text-[#333] "
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select Activity Level..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[45vw] p-3 text-[#333] ">
          <Command>
            <CommandInput
              placeholder="Search activity level..."
              className="h-9 p-1 text-[#333] "
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[#333] "
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{framework.label}</TooltipTrigger>
                      <TooltipContent className='p-[3px] '>
                        <p className="text-[#333] ">{framework.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };
  return windowWidth >= 768 ? (
    <main className="h-screen w-full bg-cover bg-center bg-gradient-to-br from-[#17191B] to-[#353A40] overflow-hidden relative ">
      <div className="scrollable-container w-full">
        <div
          className="absolute right-80 top-10 transform translate-x-full"
          style={{
            width: "800px",
          }}
        >
          <Image
            src="/plate.png"
            alt="Healthy food"
            width={600}
            height={600}
            className="rounded-full spin-image"
            style={{
              boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.75)",
              animation: "spin 10s infinite linear",
            }}
          />
        </div>
        <blockquote className="relative text-[2.2rem] p-8 text-center rounded-xl w-[70%] h-fit ms-[7%] mt-20 bg-gradient-to-bl from-[#2df1fe] to-[#094672]">
          <ImQuotesLeft size={30} className="invert" />
          <p className={`p-5 ps-14 text-black ${garamond.className}`}>
            The dream that everyone seeks - A life without medicine. The world
            will be a better place if that happens!
          </p>
          <ImQuotesRight size={30} className="absolute right-5 bottom-5 invert" />
        </blockquote>
        <div className="w-screen flex justify-center">
          <Image src="/down.gif" height={60} width={60} className="me-40 invert mt-6" />
        </div>

        <section className="w-[70%] flex flex-row justify-center place-items-center mt-40">
          <div className="w-1/2 flex justify-end">
            <Image src="/wwd.jpg" width={400} height={400} className="rounded-2xl" />
          </div>
          <div className="flex flex-col justify-start ms-10">
            <h1 className="text-[80px] text-[#2df1fe]">1</h1>
            <p className="text-[40px]">What we do?</p>
            <p className="w-80 text-sm text-[#d3d3d3]">
            We help everyone to become fit and strong and achieve a healthy lifestyle.
            </p>
          </div>
        </section>

        <section className="w-[70%] flex flex-row justify-center place-items-center">
          <div className="w-1/2 flex flex-col justify-end place-items-end">
            <h1 className="text-[80px] text-[#2df1fe]">2</h1>
            <p className="text-[40px]">How we do?</p>
            <p className="text-end w-80 text-sm text-[#d3d3d3]">
              We provide the most efficient & accurate way to track down
              calories of any food.
            </p>
          </div>
          <div className="flex justify-start ms-10">
            <Image src="/hwd.jpg" width={400} height={400} className="rounded-2xl" />
          </div>
        </section>

        <section className="w-[70%] flex flex-row justify-center place-items-center">
          <div className="w-1/2 flex justify-end">
            <Image src="/hiw.jpg" width={400} height={400} className="rounded-2xl" />
          </div>
          <div className="flex flex-col justify-start ms-10">
            <h1 className="text-[80px] text-[#2df1fe]">3</h1>
            <p className="text-[40px]">How it works?</p>
            <p className="w-80 text-sm text-[#d3d3d3]">
              Know about your maintenance calories via our maintenance
              calorie calculator. Track your daily calories through our advance
              food tracking technology. It's that simple!
            </p>
          </div>
        </section>


        <section
          className="p-10 w-[50%] ms-40 mt-40 mb-20 rounded-xl bg-gradient-to-bl from-[#2df1fe] to-[#094672] text-black"

        >
          <h2 className="text-2xl text-center font-bold mb-5 text-black">
            Calculate Your Maintenance Calorie
          </h2>
          <div className="flex flex-col text-black">
            <label htmlFor="age" className="mb-2">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              className="p-2 mb-4 input-border placeholder:text-red-500"
              onChange={(e) => setAge(e.target.value)}
            />

            <label htmlFor="height" className="mb-2 mt-5">
              Height : <span>{`${height} cm`}</span>
            </label>
            <input
              type="number"
              id="height"
              name="height"
              min="50"
              max="300"
              value={height}
              className="p-2 mb-4 input-border"
              style={{ width: "100%" }}
              onChange={(e) => setHeight(e.target.value)}
            />

            <label htmlFor="weight" className="mb-2 mt-8">
              Weight (in kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              className="p-2 mb-4 input-border"
              onChange={(e) => setWeight(e.target.value)}
            />

            <div className="mb-2 mt-5">Gender:</div>
            <div className="flex mb-4">
              <div
                className="gender-option"
                style={{ background: gender === "male" ? "orange" : "white" }}
                onClick={() => setGender("male")}
              >
                Male
              </div>
              <div
                className="gender-option"
                style={{ background: gender === "female" ? "orange" : "white" }}
                onClick={() => setGender("female")}
              >
                Female
              </div>
            </div>

            <div className="w-full py-2 mb-3">
              <ComboBox />
            </div>
            <button
              className="bg-orange-700 text-white py-2 px-4 rounded"
              onClick={() => handleCalculate(value)}
            >
              Calculate
            </button>
          </div>

          <div className="mt-4 text-3xl text-center">
            <strong>Maintenance Calories: </strong> {calculatedValue}
            <strong> cals</strong>
            <Link
              className="flex flex-row justify-center items-center text-[10px] mt-2"
              href="https://www.google.com/search?q=what+is+maintenance+calories&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=AM9HkKk_T3MplQdJwjFuAjxPjbRLaSwk7w%3A1701007787177&ei=q1FjZaqnCoWm2roPgJ2HsAU&ved=0ahUKEwjqqKjn6-GCAxUFk1YBHYDOAVYQ4dUDCBA&uact=5&oq=what+is+maintenance+calories&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXQgaXMgbWFpbnRlbmFuY2UgY2Fsb3JpZXMyChAjGIAEGIoFGCcyBhAAGAcYHjILEAAYgAQYigUYkQIyCxAAGIAEGIoFGJECMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSI0MUIMDWPwJcAB4ApABAJgB8AGgAdUMqgEFMC42LjK4AQPIAQD4AQHCAgQQABhH4gMEGAAgQeIDBRIBMSBAiAYBkAYI&sclient=gws-wiz-serp"
            >
              <p className="text-center">Know more about Maintenance Calorie</p>
              <FaExternalLinkAlt className="ms-2" size={10} />
            </Link>
          </div>
        </section>
        <h1 className="text-5xl font-bold ms-32 mb-10">
          What we Promise?
        </h1>
        <div className=" flex flex-row items-center">
          <Image
            src="/resturant.png"
            height={300}
            width={260}
            alt="App View"
            className="ms-32"
          />
          <h2 className="text-3xl ms-10 font-bold">
            All your Local Resturant's
            <br />
            <br />
            Food Calorie Data
            <br />
            <br />
            at Your Finger Tips
            <br />
            <br />
          </h2>
        </div>
        <div className="text-black flex flex-row items-center mt-10">
          <h2 className="ms-32 text-3xl font-bold me-5">
            Scan your Foods
            <br />
            <br />
            and get Caloriefic Data
            <br />
            <br />
            at Your Finger Tips
            <br />
            <br />

          </h2>
          <Image src="/lens.png" height={300} width={260} alt="App View" />
        </div>
        <div className="flex flex-row justify-between mt-20 mb-5 px-10 items-center w-[80%] text-[#424242]">
          <p>Copyright © 2023 CalorieGuard Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="https://instagram.com/calorieguard.in?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==">
              Contact Us
            </a>
            <a href="https://sites.google.com/view/calorie-guard/home">
              Privacy
            </a>
            <a href="https://sites.google.com/view/calorieguard1/home">
              Terms of use
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollable-container {
          max-height: 100vh; /* Set the maximum height as needed */
          overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          overflow-x: hidden;
        }
        .scrollable-container::-webkit-scrollbar {
          display: none;
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

        .numbertext {
          color: #f2f2f2;
          font-size: 12px;
          padding: 8px 12px;
          position: absolute;
          top: 0;
        }

      `}</style>
    </main>
  ) : (
    <main className="h-full w-screen bg-cover bg-center bg-gradient-to-br from-[#17191B] to-[#353A40] overflow-hidden relative">
      <div
        className="absolute right-60 top-10 transform translate-x-full"
        style={{
          width: "400px",
        }}
      >
        <Image
          src="/plate.png"
          alt="Healthy food"
          width={600}
          height={600}
          className="rounded-full spin-image overflow-hidden"
          style={{
            boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.75)",
            animation: "spin 10s infinite linear",
          }}
        />
      </div>
      <div className="scrollable-container p-5">
        <blockquote
          className="relative quote w-[70%] h-fit ms-[7%] mt-20 bg-gradient-to-bl from-[#2df1fe]/80 to-[#094672]/80 rounded-xl shadow-md"
        >
          <ImQuotesLeft size={30} className="invert" />
          <p className={`p-5 ps-14 text-black text-xl ${garamond.className}`}>
            The dream that everyone seeks - A life without medicine. The world
            will be a better place if that happens!
          </p>
          <ImQuotesRight size={30} className="absolute right-5 bottom-5 invert" />
        </blockquote>
        <div className="w-screen flex justify-center py-2">
          <Image src="/down.gif" height={60} width={60} className="me-20 invert" />
        </div>

        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
            zIndex: isDivOpen ? "999" : "-1", // show overlay only when isDivOpen is true
            display: isDivOpen ? "block" : "none", // hide overlay when isDivOpen is false
          }}
        ></div>

        <div className="relative">
          <div className="absolute top-0 text-black w-[80%] bg-gradient-to-bl from-[#2df1fe]/70 to-[#094672]/70 ms-10 mt-5 flex flex-row justify-between items-center  rounded-xl">
            <Link href="upi://pay?pa=arghyadipbiswas9259@sbi&pn=Arghyadip%20Biswas&cu=INR"
              className="ms-10 text-center">
              <div
                className="bg-orange-700 text-white p-5 rounded-md"
              // onClick={handleDivClick}
              >
                DONATE NOW
              </div>
            </Link>
            <div className="felx flex-col me-5 py-5">
              <img
                width="44"
                height="44"
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-early-bird-cyber-monday-flaticons-flat-flat-icons.png"
                alt="external-early-bird-cyber-monday-flaticons-flat-flat-icons"
              />
              <p>Support Us</p>
            </div>
            {isDivOpen && (
              <div
                style={{
                  position: "fixed",
                  top: "20%",
                  left: "20%",
                  transform: "translate(-10%, -10%)",
                  background: "white",
                  padding: "20px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  zIndex: 999,
                }}
              >
                <span
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={handleCloseClick}
                >
                  &#10006;
                </span>
                <Image src="/UPI.png" width={60} height={20} alt="UPI" />
                <div>
                  <Image
                    src="/scanner.jpg"
                    alt="Calorie Guard Payment Scanner"
                    height={400}
                    width={400}
                  />
                </div>
                <div className="text-center">
                  UPI ID: <a href="upi://pay?pa=arghyadipbiswas9259@sbi&pn=Arghyadip%20Biswas&cu=INR" className="text-blue-500 text-center">arghyadipbiswas9259@sbi</a>
                </div>
                <div className="text-center">
                  <strong>
                    SCAN & PAY
                    <br />
                    or
                  </strong>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleDownload}
                    className="bg-orange-700 text-white rounded-xl p-3 mt-3 mb-5"
                  >
                    Download QR
                  </button>
                </div>
                <div className="text-center">
                  Time remaining:{" "}
                  <strong>
                    {formatTime(minutes)}:{formatTime(seconds)}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative flex flex-col w-full justify-center items-center mt-80 bg-gradient-to-br from-[#17191B]/70 to-[#353A40]/70 mb-10 rounded-xl p-5 gap-10">

        <section className=" flex flex-col w-full justify-center items-center ">
          <h1 className="text-[60px] text-[#2df1fe]">1</h1>
          <p className="text-[40px]">What we do?</p>
          <p className="w-80 text-[15px] text-center text-[#d3d3d3] mt-5">
            We help everyone to become fit and strong and achieve a healthy lifestyle.
          </p>
          <Image src="/wwd.jpg" width={300} height={300} className="rounded-3xl mt-5" />
        </section>

        <section className=" flex flex-col w-full justify-center items-center ">
          <h1 className="text-[60px] text-[#2df1fe]">2</h1>
          <p className="text-[40px]">How we do?</p>
          <p className="w-80 text-[15px] text-center text-[#d3d3d3] mt-5">
            We provide the most efficient & accurate way to track down
            calories of any food.
          </p>
          <Image src="/hwd.jpg" width={300} height={300} className="rounded-3xl mt-5" />
        </section>

        <section className=" flex flex-col w-full justify-center items-center ">
          <h1 className="text-[60px] text-[#2df1fe]">3</h1>
          <p className="text-[40px]">How it works?</p>
          <p className="w-80 text-[15px] text-center text-[#d3d3d3] mt-5">
            Know about your maintenance calories via our maintenance
            calorie calculator. Track your daily calorie and macros through our advance
            food tracking technology. It's that simple!
          </p>
          <Image src="/hiw.jpg" width={300} height={300} className="rounded-3xl mt-5" />
        </section>
        </div>

        <div className="relative flex items-center justify-center">
          <section
            className="absolute top-[55vh] p-10 w-[90%] mb-20 rounded-xl text-black bg-gradient-to-bl from-[#2df1fe]/70 to-[#094672]/70"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
          >
            <h2 className="text-2xl font-bold mb-5 text-center text-black">
              Calculate Your Maintenance Calorie
            </h2>
            <div className="flex flex-col text-black">
              <label htmlFor="age" className="mb-2">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                className="p-2 mb-4 input-border"
                onChange={(e) => setAge(e.target.value)}
              />

              <label htmlFor="height" className="mb-2 mt-5">
                Height : <span>{`${height} cm`}</span>
              </label>
              <input
                type="number"
                id="height"
                name="height"
                min="50"
                max="300"
                className="p-2 mb-4 input-border"
                value={height}
                style={{ width: "100%" }}
                onChange={(e) => setHeight(e.target.value)}
              />

              <label htmlFor="weight" className="mb-2 mt-8">
                Weight (in kg):
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={weight}
                className="p-2 mb-4 input-border"
                onChange={(e) => setWeight(e.target.value)}
              />

              <div className="mb-2 mt-5">Gender:</div>
              <div className="flex mb-4">
                <div
                  className="gender-option"
                  style={{ background: gender === "male" ? "orange" : "white" }}
                  onClick={() => setGender("male")}
                >
                  Male
                </div>
                <div
                  className="gender-option"
                  style={{
                    background: gender === "female" ? "orange" : "white",
                  }}
                  onClick={() => setGender("female")}
                >
                  Female
                </div>
              </div>

              <div className="w-full py-2 mb-3">
                <ComboBox />
              </div>
              <button
                className="bg-orange-700 text-white py-2 px-4 rounded"
                onClick={() => handleCalculate(value)}
              >
                Calculate
              </button>
            </div>

            <div className="text-xl text-center mt-10">
              <strong>
                Maintenance Calories
                <br />
              </strong>{" "}
              {calculatedValue}
              <strong> cals</strong>
              <a
                className="flex flex-row justify-center h-fit items-center text-blue-700 text-[10px]"
                href="https://www.google.com/search?q=what+is+maintenance+calories&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=AM9HkKk_T3MplQdJwjFuAjxPjbRLaSwk7w%3A1701007787177&ei=q1FjZaqnCoWm2roPgJ2HsAU&ved=0ahUKEwjqqKjn6-GCAxUFk1YBHYDOAVYQ4dUDCBA&uact=5&oq=what+is+maintenance+calories&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXQgaXMgbWFpbnRlbmFuY2UgY2Fsb3JpZXMyChAjGIAEGIoFGCcyBhAAGAcYHjILEAAYgAQYigUYkQIyCxAAGIAEGIoFGJECMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSI0MUIMDWPwJcAB4ApABAJgB8AGgAdUMqgEFMC42LjK4AQPIAQD4AQHCAgQQABhH4gMEGAAgQeIDBRIBMSBAiAYBkAYI&sclient=gws-wiz-serp"
              >
                <strong>
                  <br />
                  Know more about Maintenance Calorie
                </strong>
                <FaExternalLinkAlt className="mt-8 ms-2" size={10} />
              </a>
            </div>
          </section>
          <div className="absolute top-[220vh] bg-gradient-to-br from-[#17191B]/70 to-[#353A40]/70 p-4 rounded-3xl">
            <h1 className="  text-5xl font-bold pb-10 ">
              What we Promise?
            </h1>
            <div className="text-black flex flex-row items-center  rounded-t-3xl">
              <Image
                src="/resturant.png"
                height={300}
                width={260}
                alt="App View"
              />
              <h2 className="text-2xl font-bold ms-5">
                All your Local Resturant's
                <br />
                Food Calorie <br />
                Data at Your Finger Tips
                <br />
                <br />

              </h2>
            </div>
            <div className="text-black flex flex-row items-center pt-10 ">
              <h2 className="text-2xl ms-2 font-bold me-5">
                Scan your Foods
                <br />
                and get Caloriefic Data
                <br />
                at Your Finger Tips
                <br />
                <br />

              </h2>
              <Image
                src="/lens.png"
                height={300}
                width={260}
                alt="App View"
                className="me-6"
              />
            </div>
            <div className="flex flex-row text-[10px] justify-between mt-20 mb-5 items-top w-full text-[#424242]">
              <p>
                Copyright © 2023 CalorieGuard Inc.
                <br /> All rights reserved.
              </p>
              <div className="flex gap-5 pe-5">
                <a href="https://instagram.com/calorieguard.in?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==">
                  Contact Us
                </a>
                <a href="https://sites.google.com/view/calorie-guard/home">
                  Privacy
                </a>
                <a href="https://sites.google.com/view/calorieguard1/home">
                  Terms of use
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollable-container {
          height: 100vh; /* Set the maximum height as needed */
          overflow-y: auto; /* Enable vertical scrolling if content exceeds the height */
          overflow-x: hidden;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollable-container::-webkit-scrollbar {
          display: none;
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
          padding: 20px;
          font-size: 1.2rem; /* Adjust the font size as needed */
          font-family: "Arial", sans-serif; /* Use a suitable font-family */
          color: #333; /* Dark grey text color */
          animation: fadeInDown 1s ease-out;
        }
      `}</style>
    </main>
  );
}
