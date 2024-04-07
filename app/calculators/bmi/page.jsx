"use client";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import dynamic from "next/dynamic";
import BMISpeedometer from "../../../components/shared/BMISpeedometer";
import Image from "next/image";
import { calculateBmi } from "../../utils";
const page = () => {
  var Latex = dynamic(() => import("react-latex"), {
    ssr: false,
  });
  const BMI_FORMULA = `$$BMI = \\frac{weight(kg)}{height(m)^2} = \\frac{72.57}{1.78^2} = 22.96 kg/m^2$$`;
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState("male"); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);
  const handleCalculate = () => {
    // Calculate maintenance calorie using the provided formula

    let BMI = calculateBmi(gender, weight, age, height);
    BMI = Number.parseFloat(BMI.toFixed(1));
    setCalculatedValue(BMI);
  };
  return (
      <div className="pt-10 w-[100%] flex flex-col items-center justify-center gap-10">
        <section
          className="p-10 w-[95%] md:w-[50%] rounded-xl text-black flex flex-col items-center justify-center md:flex-row gap-10"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            background: "linear-gradient(to bottom, transparent, skyblue)",
          }}
        >
          <div className="w-full flex flex-col">
            <h2 className="text-sm font-bold mb-5">
              Calculate Your Basal Metabolic Index
            </h2>
            <div className="flex flex-col">
              <label htmlFor="age" className="mb-1">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                className="p-2 mb-1 input-border"
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

            <div className="mt-4 text-3xl text-center flex items-center justify-center flex-col gap-5 w-full">
              <strong>
                BMI: {calculatedValue} kg/m<sup>2</sup>{" "}
              </strong>

              <a
                className="flex flex-row justify-center h-fit items-center text-blue-700 text-[15px]"
                href="https://www.google.com/search?q=what+is+bmi&sca_esv=fdae4f9b2d9875c9&sxsrf=ACQVn0_bsiL7a4p7YqfmSwRtYbgNHCoT2A%3A1711521639259&source=hp&ei=Z78DZquuDdK4vr0PyaSrqAo&iflsig=ANes7DEAAAAAZgPNd3yjihuYSxRlhAt2hhAUNf0sL4Kg&ved=0ahUKEwjr_dL66pOFAxVSnK8BHUnSCqUQ4dUDCBU&uact=5&oq=what+is+bmi&gs_lp=Egdnd3Mtd2l6Igt3aGF0IGlzIGJtaTIIEAAYgAQYsQMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI6BdQwQRYgBVwAXgAkAEAmAGuAaAB9wyqAQQwLjExuAEDyAEA-AEBmAIMoAKUDagCCsICBxAjGOoCGCfCAgoQIxiABBiKBRgnwgIXEC4YgAQYigUYkQIYsQMYgwEYxwEY0QPCAhEQABiABBiKBRiRAhixAxiDAcICERAuGIAEGLEDGIMBGMcBGNEDwgIOEAAYgAQYigUYsQMYgwHCAgQQIxgnwgILEAAYgAQYigUYkQLCAgsQABiABBixAxiDAZgDBZIHBDEuMTGgB-ti&sclient=gws-wiz"
                target="_blank"
              >
                <strong>
                  <br />
                  Know more about Basal Metabolic Index
                </strong>
                <FaExternalLinkAlt className="mt-8 ms-2" size={15} />
              </a>
            </div>
          </div>
          <BMISpeedometer value={calculatedValue} />
        </section>
        <section className="w-[80%] text-lg md:text-2xl md:pt-32 md:py-4 flex flex-col">
          <p>
            The Body Mass Index (BMI) Calculator can be used to calculate BMI
            value and corresponding weight status while taking age into
            consideration. Use the &quot;Metric Units&quot; tab for the
            International System of Units or the &quot;Other Units&quot; tab to
            convert units into either US or metric units. Note that the
            calculator also computes the Ponderal Index in addition to BMI, both
            of which are discussed below in detail.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold py-3">
            BMI introduction
          </h2>
          <p>
            BMI is a measurement of a person&ldquo;s leanness or corpulence
            based on their height and weight, and is intended to quantify tissue
            mass. It is widely used as a general indicator of whether a person
            has a healthy body weight for their height. Specifically, the value
            obtained from the calculation of BMI is used to categorize whether a
            person is underweight, normal weight, overweight, or obese depending
            on what range the value falls between. These ranges of BMI vary
            based on factors such as region and age, and are sometimes further
            divided into subcategories such as severely underweight or very
            severely obese. Being overweight or underweight can have significant
            health effects, so while BMI is an imperfect measure of healthy body
            weight, it is a useful indicator of whether any additional testing
            or action is required. Refer to the table below to see the different
            categories based on BMI that are used by the calculator.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold py-3">
            BMI table for adults
          </h2>
          <p>
            This is the World Health Organization&ldquo;s (WHO) recommended body
            weight based on BMI values for adults. It is used for both men and
            women, age 20 or older.
          </p>
          <div className="flex items-center justify-center">
            <Image
              src="/BMI_Table.png"
              alt="BMI Table"
              width={300}
              height={500}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold py-3">
            BMI chart for adults
          </h2>
          <p>
            This is a graph of BMI categories based on the World Health
            Organization data. The dashed lines represent subdivisions within a
            major categorization.
          </p>
          <div className="flex items-center justify-center py-3">
            <Image
              src="/bmi-chart.gif"
              alt="BMI Table"
              width={500}
              height={500}
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold py-3">
            BMI table for children and teens, age 2-20
          </h2>
          <p>
            The Centers for Disease Control and Prevention (CDC) recommends BMI
            categorization for children and teens between age 2 and 20.
          </p>
          <div className="flex items-center justify-center py-3">
            <Image
              src="/BMI_Table_teen.png"
              alt="BMI Table"
              width={300}
              height={500}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold py-3">
            Risks associated with being overweight
          </h1>
          <p>
            Being overweight increases the risk of a number of serious diseases
            and health conditions. Below is a list of said risks, according to
            the Centers for Disease Control and Prevention (CDC):
          </p>
          <ul className="list-disc ml-20">
            <li>
              Malnutrition, vitamin deficiencies, anemia (lowered ability to
              carry blood vessels)
            </li>
            <li>
              Osteoporosis, a disease that causes bone weakness, increasing the
              risk of breaking a bone
            </li>
            <li>A decrease in immune function</li>
            <li>
              Growth and development issues, particularly in children and
              teenagers
            </li>
            <li>
              Possible reproductive issues for women due to hormonal imbalances
              that can disrupt the menstrual cycle. Underweight women also have
              a higher chance of miscarriage in the first trimester
            </li>
            <li>Potential complications as a result of surgery</li>
            <li>
              Generally, an increased risk of mortality compared to those with a
              healthy BMI
            </li>
          </ul>
          <p>
            In some cases, being underweight can be a sign of some underlying
            condition or disease such as anorexia nervosa, which has its own
            risks. Consult your doctor if you think you or someone you know is
            underweight, particularly if the reason for being underweight does
            not seem obvious.
          </p>
          <h1 className="text-2xl md:text-3xl font-bold py-3">
            Limitations of BMI
          </h1>
          <p>
            Although BMI is a widely used and useful indicator of healthy body
            weight, it does have its limitations. BMI is only an estimate that
            cannot take body composition into account. Due to a wide variety of
            body types as well as distribution of muscle, bone mass, and fat,
            BMI should be considered along with other measurements rather than
            being used as the sole method for determining a person&ldquo;s
            healthy body weight.
          </p>
          <strong>In adults:</strong>
          <p>
            BMI cannot be fully accurate because it is a measure of excess body
            weight, rather than excess body fat. BMI is further influenced by
            factors such as age, sex, ethnicity, muscle mass, body fat, and
            activity level, among others. For example, an older person who is
            considered a healthy weight, but is completely inactive in their
            daily life may have significant amounts of excess body fat even
            though they are not heavy. This would be considered unhealthy, while
            a younger person with higher muscle composition of the same BMI
            would be considered healthy. In athletes, particularly bodybuilders
            who would be considered overweight due to muscle being heavier than
            fat, it is entirely possible that they are actually at a healthy
            weight for their body composition. Generally, according to the CDC:
          </p>
          <ul className="list-disc ml-20">
            <li>
              Older adults tend to have more body fat than younger adults with
              the same BMI.
            </li>
            <li>
              Women tend to have more body fat than men for an equivalent BMI.
            </li>
            <li>
              Muscular individuals and highly trained athletes may have higher
              BMIs due to large muscle mass.
            </li>
          </ul>
          <strong>In children and adolescents:</strong>
          <p>
            The same factors that limit the efficacy of BMI for adults can also
            apply to children and adolescents. Additionally, height and level of
            sexual maturation can influence BMI and body fat among children. BMI
            is a better indicator of excess body fat for obese children than it
            is for overweight children, whose BMI could be a result of increased
            levels of either fat or fat-free mass (all body components except
            for fat, which includes water, organs, muscle, etc.). In thin
            children, the difference in BMI can also be due to fat-free mass.{" "}
            <br />
            That being said, BMI is fairly indicative of body fat for 90-95% of
            the population, and can effectively be used along with other
            measures to help determine an individual&ldquo;s healthy body
            weight.
          </p>
          <h1 className="text-2xl md:text-3xl font-bold py-3">BMI formula</h1>
          <p>
            Below are the equations used for calculating BMI in the
            International System of Units (SI) using a 178, 72.57kg individual
            as an example:
          </p>
          <div className="text-sm md:text-xl">
            <Latex displayMode={true}>{BMI_FORMULA}</Latex>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold py-3">BMI Prime</h1>
          <p>
            BMI prime is the ratio of a person&ldquo;s measured BMI to the upper
            limit of BMI that is considered &quot;normal,&quot; by institutions
            such as the WHO and the CDC. Though it may differ in some countries,
            such as those in Asia, this upper limit, which will be referred to
            as{" "}
            <span className="text-[16px]">
              <Latex>{`$$BMI_{upper}$$`}</Latex>
            </span>{" "}
            is{" "}
            <span className="text-[16px]">
              <Latex>{`$$25 kg/m^2$$`}</Latex>
            </span>
          </p>
          <p>The BMI Prime formula is:</p>
          <div className="text-lg">
            <Latex
              displayMode={true}
            >{`$$BMI_{prime} = \\frac{BMI}{25}$$`}</Latex>
          </div>
          <p>
            Since BMI prime is a ratio of two BMI values, BMI prime is a
            dimensionless value. A person who has a BMI prime less than 0.74 is
            classified as underweight; from 0.74 to 1 is classified as normal;
            greater than 1 is classified as overweight; and greater than 1.2 is
            classified as obese. The table below shows a person&ldquo;s weight
            classification based on their BMI prime:
          </p>
          <div className="flex items-center justify-center">
            <Image
              src="/BMI_Prime_Table.png"
              alt="BMI Table"
              width={300}
              height={500}
            />
          </div>
          <p>
            BMI prime allows us to make a quick assessment of how much a
            person&ldquo;s BMI differs from the upper limit of BMI that is
            considered normal. It also allows for comparisons between groups of
            people who have different upper BMI limits.
          </p>
          <h1 className="text-2xl md:text-3xl font-bold py-3">
            Ponderal Index
          </h1>
          <p>
            The Ponderal Index (PI) is similar to BMI in that it measures the
            leanness or corpulence of a person based on their height and weight.
            The main difference between the PI and BMI is the cubing rather than
            squaring of the height in the formula (provided below). While BMI
            can be a useful tool when considering large populations, it is not
            reliable for determining leanness or corpulence in individuals.
            Although the PI suffers from similar considerations, the PI is more
            reliable for use with very tall or short individuals, while BMI
            tends to record uncharacteristically high or low body fat levels for
            those on the extreme ends of the height and weight spectrum. Below
            is the equation for computing the PI of an individual using SI,
            again using a 178cm, 72.57kg individual as an example:
          </p>
          <div className="text-sm">
            <Latex
              displayMode={true}
            >{`$$PI = \\frac{weight(kg)}{height(m)^3} = \\frac{72.57}{1.78^3} = 12.87 kg/m^3$$`}</Latex>
          </div>
        </section>
      </div>
  );
};

export default page;
