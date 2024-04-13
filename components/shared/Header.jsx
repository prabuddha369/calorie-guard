"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Typewriter from "./Typewriter";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  const [animationClass, setAnimationClass] = useState("");
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
  const [isOpenS, setOpenS] = useState(false);
  return (
    <div
      className="flex flex-row w-full h-fit justify-start items-center text-[#F4F7FD] bg-gradient-to-br from-[#17191B] to-[#353A40]"
      
    >
      <div
        className={`logo-container ${animationClass} m-5 w-[70%] md:w-[30%] flex gap-4 text-black flex-row items-center`}
        style={{
          overflow: "hidden",
          animation: "glide 1s forwards",
        }}
      >
        <Sheet open={isOpenS} onOpenChange={setOpenS}>
          <SheetTrigger className="align-middle">
            <Image src="/logo.png" alt="logo" width={50} height={50} className="md:w-[80px] md:h-[80px]" />
          </SheetTrigger>
          <SheetContent
            className="flex flex-col bg-gradient-to-br from-[#17191B] to-[#353A40] w-[1/3] "
            side={"left"}
          >
            <div className="flex gap-5 place-items-center">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <span className="text-2xl font-semibold">
                Calorie Guard Calculators
              </span>
            </div>
            <Separator className="border border-gray-50/80" />
            <NavItems setOpen={setOpenS} />
          </SheetContent>
        </Sheet>
        <div className="text-black text-xl md:text-3xl font-bold">
          <h1>
            <Typewriter text="Calorie Guard" delay={300} />
          </h1>
        </div>
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

      <div
        className="text-black w-[10%] mt-5 ms-[40%]  flex-col justify-center items-center hidden md:flex"
        onClick={handleDivClick}
        style={{ cursor: "pointer" }}
      >
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
            <div className="text-center">
              <strong>SCAN to PAY</strong>
              <Image src="/UPI.png" width={100} height={20} />
            </div>

            <div>
              <Image
                src="/scanner.jpg"
                alt="Payment Scanner"
                height={300}
                width={300}
              />
            </div>
            <div className="text-center">
              UPI ID:{" "}
              <a
                href="upi://pay?pa=arghyadipbiswas9259@sbi&pn=Arghyadip%20Biswas&cu=INR"
                className="text-blue-500 text-center"
              >
                arghyadipbiswas9259@sbi
              </a>
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
      <div className="me-2 ms-5">
        <Link href="https://play.google.com/store/apps/details?id=com.calorieguard.calorieguard" target="_blank">
          <Image src="/playstore.png" height={5} width={150} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
