"use client";

import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import { calculateBmr } from "../../utils";
const page = () => {
  var Latex = dynamic(() => import("react-latex"), {
    ssr: false,
  });
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState("male"); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);
  const handleCalculate = () => {
    // Calculate maintenance calorie using the provided formula

    let BMR = calculateBmr(gender, weight, age, height);
    BMR = Math.round(BMR);
    setCalculatedValue(BMR);
  };
  return (
    <div className="pt-10 w-[100%] flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-[#17191B] to-[#353A40]">
        <section
          className="p-10 w-[90%] md:w-[25%] rounded-xl text-black bg-gradient-to-bl from-[#2df1fe] to-[#094672]"
          
        >
          <h2 className="text-2xl font-bold mb-5">
            Calculate Your Basal Metabolic Rate
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
              className="p-2 mb-2 input-border"
              onChange={(e) => setAge(Number(e.target.value))}
            />

            <label htmlFor="height" className="mb-2 mt-5">
              Height (in cm):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={height}
              className="p-2 mb-2 input-border"
              style={{ width: "100%" }}
              onChange={(e) => setHeight(Number(e.target.value))}
            />

            <label htmlFor="weight" className="mb-2 mt-8">
              Weight (in kg):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={weight}
              className="p-2 mb-2 input-border"
              onChange={(e) => setWeight(Number(e.target.value))}
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
            <button
              className="bg-orange-700 text-white py-2 px-4 rounded"
              onClick={() => handleCalculate()}
            >
              Calculate
            </button>
          </div>

          <div className="mt-4 text-3xl text-center">
            <strong>BMR: </strong> {calculatedValue}
            <strong> cal/day</strong>
            <a
              className="flex flex-row justify-center h-fit items-center text-blue-700 text-[15px]"
              href="https://www.google.com/search?q=what+is+bmr&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=ACQVn0-1RJJxC0kdZGYIG0DS1Q5DEx-GwA%3A1711464624496&ei=sOACZqS1HdvP2roPpJuHuAQ&ved=0ahUKEwikzfPHlpKFAxXbp1YBHaTNAUcQ4dUDCBA&uact=5&oq=what+is+bmr&gs_lp=Egxnd3Mtd2l6LXNlcnAiC3doYXQgaXMgYm1yMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjXGlDxFFjnGXADeAGQAQCYAYgCoAH8A6oBAzItMrgBA8gBAPgBAZgCBaACjATCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICBBAjGCfCAg0QABiABBiKBRhDGLEDwgIOEAAYgAQYigUYsQMYgwHCAgoQABiABBiKBRhDmAMAiAYBkAYKkgcFMy4wLjKgB-wL&sclient=gws-wiz-serp"
              target="_blank"
            >
              <strong>
                <br />
                Know more about Basal Metabolic rate
              </strong>
              <FaExternalLinkAlt className="mt-8 ms-2" size={15} />
            </a>
          </div>
        </section>
        <section className="w-[80%] text-xl md:text-2xl py-4 flex flex-col mt-12">
            <p className="py-3">
              The basal metabolic rate (BMR) is the amount of energy needed
              while resting in a temperate environment when the digestive system
              is inactive. It is the equivalent of figuring out how much gas an
              idle car consumes while parked. In such a state, energy will be
              used only to maintain vital organs, which include the heart,
              brain, kidneys, nervous system, intestines, liver, lungs, sex
              organs, muscles, and skin. For most people, upwards of ~70% of
              total energy (calories) burned each day is due to upkeep. Physical
              activity makes up ~20% of expenditure and ~10% is used for the
              digestion of food, also known as thermogenesis.
            </p>
            <p className="py-3">
              The BMR is measured under very restrictive circumstances while
              awake. An accurate BMR measurement requires that a person&ldquo;s
              sympathetic nervous system is inactive, which means the person
              must be completely rested. Basal metabolism is usually the largest
              component of a person&ldquo;s total caloric needs. The daily
              caloric need is the BMR value multiplied by a factor with a value
              between 1.2 and 1.9, depending on activity level.
            </p>
            <p className="py-3">
              In most situations, the BMR is estimated with equations summarized
              from statistical data. The Harris-Benedict Equation was one of the
              earliest equations introduced. It was revised in 1984 to be more
              accurate and was used up until 1990, when the Mifflin-St Jeor
              Equation was introduced. The Mifflin-St Jeor Equation has been
              shown to be more accurate than the revised Harris-Benedict
              Equation. The Katch-McArdle Formula is slightly different in that
              it calculates resting daily energy expenditure (RDEE), which takes
              lean body mass into account, something that neither the Mifflin-St
              Jeor nor the Harris-Benedict Equation does. Of these equations,
              the Mifflin-St Jeor Equation is considered the most accurate
              equation for calculating BMR with the exception that the
              Katch-McArdle Formula can be more accurate for people who are
              leaner and know their body fat percentage. You can pick the
              equation to be used in the calculation by expanding the settings.
            </p>
            <p className="py-3">
              The three equations used by the calculator are listed below:
            </p>
            <strong>Mifflin-St Jeor Equation:</strong>
            <span className="ms-8">For Men:</span>
            <span className="text-sm ms-10">
              <Latex
                displayMode={true}
              >{`$$BMR = 10W + 6.25H - 5A + 5$$`}</Latex>
            </span>
            <span className="ms-8">For Women:</span>
            <span className="text-sm ms-10">
              <Latex
                displayMode={true}
              >{`$$BMR = 10W + 6.25H - 5A - 161$$`}</Latex>
            </span>
            <strong>Revised Harris-Benedict Equation:</strong>
            <span className="ms-8">For Men:</span>
            <span className="text-sm ms-10">
              <Latex
                displayMode={true}
              >{`$$BMR = 13.397W + 4.799H - 5.677A + 88.362$$`}</Latex>
            </span>
            <span className="ms-8">For Women:</span>
            <span className="text-sm ms-10">
              <Latex
                displayMode={true}
              >{`$$BMR = 9.247W + 3.098H - 4.330A - 447.593$$`}</Latex>
            </span>
            <strong>Katch-McArdle Formula:</strong>
            <span className="text-sm ms-10">
              <Latex displayMode={true}>{`$$BMR = 370 + 21.6(1 - F)W$$`}</Latex>
            </span>
            <div className="py-3">
              where:
              <ul className="ms-10 list-inside">
                <li>W is weight in kg</li>
                <li>H is height in cm</li>
                <li>A is age in years</li>
                <li>F is body fat percentage</li>
              </ul>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold py-3">
              BMR Variables
            </h2>
            <p className="py-3">
              <strong>Muscle Mass</strong> - Aerobic exercises, such as running
              or cycling, have no effect on BMR. However, anaerobic exercises,
              such as weight-lifting, indirectly lead to a higher BMR because
              they build muscle mass, increasing resting energy consumption. The
              more muscle mass in the physical composition of an individual, the
              higher the BMR required to sustain their body at a certain level.
            </p>
            <p className="py-3">
              <strong>Age</strong> - The more elderly and limber an individual,
              the lower their BMR, or the lower the minimum caloric intake
              required to sustain the functioning of their organs at a certain
              level.
            </p>
            <p className="py-3">
              <strong>Genetics</strong> - Hereditary traits passed down from
              ancestors influence BMR.
            </p>
            <p className="py-3">
              <strong>Weather</strong> - Cold environments raise BMR because of
              the energy required to create a homeostatic body temperature.
              Likewise, too much external heat can raise BMR as the body expends
              energy to cool off internal organs. BMR increases approximately 7%
              for every increase of 1.36 degrees Fahrenheit in the body&ldquo;s
              internal temperature.
            </p>
            <p className="py-3">
              <strong>Diet</strong> - Small, routinely dispersed meals increase
              BMR. On the other hand, starvation can reduce BMR by as much as
              30%. Similar to a phone that goes into power-saving mode during
              the last 5% of its battery, a human body will make sacrifices such
              as energy levels, moods, upkeep of bodily physique, and brain
              functions in order to more efficiently utilize what little caloric
              energy is being used to sustain it.
            </p>
            <p className="py-3">
              <strong>Pregnancy</strong> - Ensuring the livelihood of a separate
              fetus internally increases BMR. This is why pregnant women tend to
              eat more than usual. Also, menopause can increase or decrease BMR
              depending on hormonal changes.
            </p>
            <p className="py-3">
              <strong>Supplements</strong> - Certain supplements or drugs raise
              BMR, mostly to fuel weight loss. Caffeine is a common one.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold py-3">BMR Tests</h2>
            <p className="py-3">
              Online BMR tests with rigid formulas are not the most accurate
              method of determining an individual&ldquo;s BMR. It is better to
              consult a certified specialist or measure BMR through a
              calorimetry device. These handheld devices are available in many
              health and fitness clubs, doctor offices, and weight-loss clinics.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold py-3">
              Resting Metabolic Rate
            </h2>
            <p className="py-3">
              While the two are used interchangeably, there is a key difference
              in their definitions. Resting metabolic rate, or RMR for short, is
              the rate at which the body burns energy in a relaxed, but not
              fully inactive state. It is also sometimes defined as resting
              energy expenditure, or REE. BMR measurements must meet total
              physiological equilibrium while RMR conditions of measurement can
              be altered and defined by contextual limitations.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold py-3">
              Modern Wisdom
            </h2>
            <p className="py-3">
              A 2005 meta-analysis study on BMR* showed that when controlling
              all factors of metabolic rate, there is still a 26% unknown
              variance between people. Essentially, an average person eating an
              average diet will likely have expected BMR values, but there are
              factors that are still not understood that determines BMR
              precisely.
            </p>
            <p>
              Therefore, all BMR calculations, even using the most precise
              methods through specialists, will not be perfectly accurate in
              their measurements. Not all human bodily functions are well
              understood just yet, so calculating total daily energy expenditure
              (TDEE) derived from BMR estimates are just that, estimates. When
              working towards any sort of health or fitness goal, BMR can aid in
              laying down the foundations, but from there on, it has little else
              to offer. A calculated BMR and thus TDEE may result in
              unsatisfactory results because of their rough estimates, but
              maintaining a daily journal of exercise, food consumption, etc.,
              can help track the factors that lead to any given results and help
              determine what works, as well as what needs to be improved upon.
              Tracking progress in said journal and making adjustments over time
              as needed is generally the best indication of progress towards
              reaching personal goals.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold py-3">Reference</h2>
            <p className="py-3 text-sm ">
              * Johnstone AM, Murison SD, Duncan JS, Rance KA, Speakman JR,
              Factors influencing variation in basal metabolic rate include
              fat-free mass, fat mass, age, and circulating thyroxine but not
              sex, circulating leptin, or triiodothyronine1. Am J Clin Nutr
              2005; 82: 941-948.
            </p>
          </section>
      </div>
  )
}

export default page