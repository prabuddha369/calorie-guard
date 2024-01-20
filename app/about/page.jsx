"use client";
import React, { useState } from "react";
function WeightLossPage() {
  const [showDonatePopup, setShowDonatePopup] = useState(false);

  const toggleDonatePopup = () => {
    setShowDonatePopup(!showDonatePopup);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="py-8 border border-b-2">
        {/* Your header content */}
        <h1 className="text-4xl font-bold mb-4">Your Weight Loss Solution</h1>
        <p className="mb-4">
          Unlock your weight loss potential with science-backed strategies.
        </p>
      </header>

      <main className="py-8">
        <section className=" mb-8">
          <h2 className="text-2xl font-bold mb-4">
            What Actually Matters in a Weight Loss Program?
          </h2>
          <div>

          <p className="mb-4 text-2xl">When your client is eating at “maintenance”, this is the caloric intake that is required for them to MAINTAIN their body weight. You might also know this as a client's TDEE or 'Total Daily Energy Expenditure'</p>
          <p>
            This total amount is made up of your client’s:
          </p>
          <ul >
            <li>•	Basal Metabolic rate (BMR)</li>
            <li>•	Non-Exercise Activity Thermogenesis (NEAT)</li>
            <li>•	The Thermic Effect of Feeding (TEF)</li>
            <li>•	And their Exercise Activity (EA), or Physical Activity Level (PAL)</li>
          </ul>
          </div>
          <img
            src="/maintenance-calorie-image.jpg"
            alt="Maintenance Calorie"
            className=" rounded-lg"
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            What is Maintenance Calorie?
          </h2>
          <p className="mb-4">
            After spending time in a caloric deficit, negative metabolic adaptations can occur.<br/>
These adaptations can include, among others:
          </p>
          <ul className="mb-8">
            <li>•	Slowing of your client’s metabolic rate</li>
<li>•	Reduced ability to lose body fat</li>
<li>•	Reduced leptin levels (the satiety hormone)</li>
<li>•	Increased ghrelin levels (the hunger hormone)</li>
<li>•	Down-regulation of thyroid function and sex hormones</li>
<li>•	Reduced NEAT and overall energy</li>

          </ul>
          <p className="mb-8">
            By spending time at maintenance following a dieting period, it gives your client’s body a chance to recover. This time will allow your client to maximise their metabolic capacity, and in turn, maximise their capacity to lose fat, if they were to go into another cutting phase. Starting another cutting phase from their maintenance level of calories will give you more room to move with your client, especially when it comes to hitting any plateaus, as opposed to starting a fat loss phase when your client has been maintaining on 1400 – 1500 calories per day.
          </p>
          {/* Add more content and images about maintenance calories */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="mb-4">
            We help you achieve your weight loss goals by personalizing your maintenance calorie intake and providing innovative tools to track and manage your progress.
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
        <section>
          <p>
            Our Sources of Information:
          </p>
          <ul className="list-disc">
            <li>
              Our Advisor is Arghyadip Biswas (Contact : <a href="www.arghyadipbiswas.com" target='_blank' className="text-blue-500 underline">www.arghyadipbiswas.com</a>)
            </li>
            <li>
              NCBI 
       (<a href="https://www.ncbi.nlm.nih.gov/books/NBK499909/#:~:text=On%20average%2C%20a%20woman%20should,lose%20one%20pound%20per%20week" target="_blank"  className="text-blue-500 underline">https://www.ncbi.nlm.nih.gov/books/NBK499909/#:~:text=On%20average%2C%20a%20woman%20should,lose%20one%20pound%20per%20week</a> )

            </li>
            <li>
              NIN (<a href="https://www.nlm.nih.gov/" target="_blank" className="text-blue-500 underline"> https://www.nlm.nih.gov/</a>)
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

      <footer className="py-4"><a href="https://www.instagram.com/calorieguard.in?igsh=MThzdTNwaWFjbmk3bQ=="  target= '_blank' className="text-blue-500">
        <div className="flex justify-center w-full items-center">
          
            <img src="/instagram.svg" alt="Instagram" className="w-20 h-20" />
            <p className="text-2xl">Calorie Guard</p>
          
        </div>
        </a>
      </footer>

      {/* Donate popup */}
    </div>
  );
}

export default WeightLossPage;
