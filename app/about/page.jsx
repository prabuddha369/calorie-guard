"use client";
import React, { useState } from "react";

function WeightLossPage() {
  const [showDonatePopup, setShowDonatePopup] = useState(false);

  const toggleDonatePopup = () => {
    setShowDonatePopup(!showDonatePopup);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="py-8">
        {/* Your header content */}
        <h1 className="text-4xl font-bold mb-4">Your Weight Loss Solution</h1>
        <p className="mb-4">
          Unlock your weight loss potential with science-backed strategies.
        </p>
      </header>

      <main className="py-8">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            What Actually Matters in a Weight Loss Program?
          </h2>
          <p className="mb-4">Maintenance Calories</p>
          <img
            src="maintenance-calorie-image.jpg"
            alt="Maintenance Calorie"
            className="w-full rounded-lg"
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            What is Maintenance Calorie?
          </h2>
          <p className="mb-4">
            Maintenance calories are the number of calories your body needs to
            maintain its current weight.
          </p>
          {/* Add more content and images about maintenance calories */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="mb-4">
            We help you achieve your weight loss goals by personalizing your
            maintenance calorie intake and providing innovative tools to track
            and manage your progress.
          </p>
          {/* Add images and content showcasing your approach, including athlete examples */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Do It</h2>
          <ul className="list-disc pl-8">
            <li>
              AI Lens: Effortlessly track your calorie intake with our
              cutting-edge AI lens technology.
            </li>
            <li>
              Manual Tracking: Prefer to log your meals manually? Our app makes
              it easy and intuitive.
            </li>
            <li>
              Restaurant Connect: Stay on track even when dining out with our
              Restaurant Connect feature.
            </li>
            <li>
              Personalized Guidance: Get tailored advice and support from our
              weight loss experts.
            </li>
          </ul>
        </section>

        <section className="text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            onClick={toggleDonatePopup}
          >
            Donate Now
          </button>
        </section>
      </main>

      <footer className="py-4">
        <div className="flex justify-center">
          <a href="your-instagram-link" className="text-blue-500">
            <img src="instagram-logo.svg" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </footer>

      {/* Donate popup */}
    </div>
  );
}

export default WeightLossPage;
