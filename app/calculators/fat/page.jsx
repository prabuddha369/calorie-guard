"use client";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import Image from "next/image";
import { calculateBmi } from "../../utils";
import Link from "next/link";
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

    let BMI = calculateBmi(gender, weight, age, height);
    let BFP = 0.0;
    if (age >= 18) {
      if (gender === "male") BFP = 1.2 * BMI + 0.23 * age - 16.2;
      else BFP = 1.2 * BMI + 0.23 * age - 5.4;
    } else {
      if (gender === "male") BFP = 1.51 * BMI - 0.7 * age - 2.2;
      else BFP = 1.51 * BMI - 0.7 * age + 1.4;
    }
    setCalculatedValue(BFP.toFixed(2));
  };
  return (
    <div className="pt-10 w-[100%] flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-[#17191B] to-[#353A40]">
      <section
        className="p-10 w-[95%] md:w-[50%] rounded-xl text-black flex flex-col items-center justify-center md:flex-row gap-10 bg-gradient-to-bl from-[#2df1fe] to-[#094672]"
      >
        <div className="w-full flex flex-col">
          <h2 className="text-sm font-bold mb-5">
            Calculate Your Body Fat Percentage
          </h2>
          <div className="flex flex-col text-[#333]">
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
            <strong>BFP: {calculatedValue} % </strong>

            <a
              className="flex flex-row justify-center h-fit items-center text-blue-700 text-[15px]"
              href="https://www.google.com/search?q=what+is+body+fat+percentage&sca_esv=eaa2892aadc17430&sxsrf=ACQVn091YUoRdaHcGg5OB5Lm6tKCzjZpdg%3A1712512145343&ei=kdwSZvLIFIKB1e8PhqyimAQ&oq=what+is+body+fat+&gs_lp=Egxnd3Mtd2l6LXNlcnAiEXdoYXQgaXMgYm9keSBmYXQgKgIIADIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIgCFQwAlYxxhwAngBkAEAmAGcAaABpgqqAQMwLjm4AQPIAQD4AQGYAgugAsAKwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAgoQIxiABBiKBRgnwgIIEAAYgAQYsQPCAgoQABiABBiKBRhDmAMAiAYBkAYKkgcDMi45oAfxMg&sclient=gws-wiz-serp"
              target="_blank"
            >
              <strong>
                <br />
                Know more about Body Fat Percentage
              </strong>
              <FaExternalLinkAlt className="mt-8 ms-2" size={15} />
            </a>
          </div>
        </div>
      </section>
      <section className="w-[80%] text-lg md:text-2xl md:pt-32 md:py-4 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold py-3">Reference</h2>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          The American Council on Exercise Body Fat Categorization
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/fat-chart-1.png"
            alt="BMI Table"
            width={300}
            height={500}
          />
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Jackson & Pollock Ideal Body Fat Percentages
        </h2>
        <div className="flex items-center justify-center">
          <Image
            src="/fat-chart-2.png"
            alt="BMI Table"
            width={300}
            height={500}
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold py-3">
          Body Fat, Overweight, and Obesity
        </h2>
        <p>
          The scientific term for body fat is "adipose tissue." Adipose tissue
          serves a number of important functions. Its primary purpose is to
          store lipids from which the body creates energy. In addition, it
          secretes a number of important hormones, and provides the body with
          some cushioning as well as insulation. <br />
          Body fat includes essential body fat and storage body fat. Essential
          body fat is a base level of fat that is found in most parts of the
          body. It is necessary fat that maintains life and reproductive
          functions. The amount of essential fat differs between men and women,
          and is typically around 2-5% in men, and 10-13% in women. The healthy
          range of body fat for men is typically defined as 8-19%, while the
          healthy range for women is 21-33%. While having excess body fat can
          have many detrimental effects on a person's health, insufficient body
          fat can have negative health effects of its own, and maintaining a
          body fat percentage below, or even at the essential body fat
          percentage range is a topic that should be discussed with a medical
          professional.
          <br />
          Storage fat is fat that accumulates in adipose tissue, be it
          subcutaneous fat (deep under the dermis and wrapped around vital
          organs) or visceral fat (fat located inside the abdominal cavity,
          between organs), and references to body fat typically refer to this
          type of fat. While some storage fat is ideal, excess amounts of
          storage fat can have serious negative health implications.
          <br />
          Excess body fat leads to the condition of being overweight and
          eventually to obesity given that insufficient measures are taken to
          curb increasing body fat. Note that being overweight does not
          necessarily indicate an excess of body fat. A person's body weight is
          comprised of multiple factors including (but not limited to) body fat,
          muscle, bone density, and water content. Thus, highly muscular people
          are often classified as overweight.
          <br />
          The rate at which body fat accumulates is different from person to
          person and is dependent on many factors including genetic factors as
          well as behavioral factors such as lack of exercise and excessive food
          intake. Due to varying factors, it can be more difficult for certain
          people to reduce body fat stored in the abdominal region. However,
          managing diet and exercise has been shown to reduce stored fat. Note
          that both women and men store body fat differently and that this can
          change over time. After the age of 40 (or after menopause in some
          cases for women), reduced sexual hormones can lead to excess body fat
          around the stomach in men, or around the buttocks and thighs of women.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold py-3">
          Potential Complications of Excess Body Fat
        </h2>
        <p>
          The World Health Organization (WHO) classifies obesity as one of the
          leading preventable causes of death worldwide that is estimated to
          claim 111,909 to 365,000 deaths per year in the U.S. This has been a
          growing cause for concern because 36.5% of U.S. adults are defined as
          obese according to the Centers for Disease Control and Prevention.{" "}
          <br />
          Obesity is associated with a reduction in quality of life, poorer
          mental health outcomes, obstructive sleep apnea, as well as multiple
          leading causes of death worldwide such as cardiovascular disease,
          stroke, certain cancers and diabetes. All of these potential
          complications have the ability to reduce a person's life expectancy,
          and as such, obesity is a medical condition that is studied by many
          researchers.
          <br />
          As previously mentioned, fat produces a number of essential hormones
          that affect a person's body. An excess or a lack of critical hormones
          can have negative effects that preclude proper body function. On a
          related note, studies have found that excess body fat, particularly
          abdominal fat, disrupts the normal balance and function of some of
          these hormones. Furthermore, body fat, specifically visceral fat, has
          a role in the release of specific cytokines, which are a broad
          category of proteins involved in cell signaling, that can potentially
          increase the risk of cardiovascular disease. Visceral fat is also
          directly associated with higher levels of low-density lipoprotein
          (LDL) cholesterol, lower high-density lipoprotein (HDL) cholesterol,
          and insulin resistance. LDL cholesterol is commonly referred to as
          "bad cholesterol" while HDL is referred to as "good cholesterol." High
          levels of LDL cholesterol can clog arteries and lead to complications
          including heart attacks. Insulin resistance involves cells not
          properly responding to the hormone insulin, which can lead to high
          blood sugar levels, and eventually to type 2 diabetes. As can be seen,
          excess visceral fat can have measurable negative impacts to a person's
          health.
          <br />
        </p>
        <h2 className="text-2xl md:text-3xl font-bold py-3">
          Measuring Body Fat Percentage
        </h2>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          <Link
            href="https://www.calculator.net/pdf/navy-physical-readiness-program.pdf"
            target="_blank"
            className="hover:underline text-sky-500 p-2"
          >
            U.S. Navy Method:
          </Link>
        </h2>
        <p>
          There are many specific techniques used for measuring body fat. The
          calculator above uses a method involving equations developed at the
          Naval Health Research Center by Hodgdon and Beckett in 1984. The
          method for measuring the relevant body parts as well as the specific
          equations used are provided below:
        </p>
        <ul className="list-disc px-12 md:px-16">
          <li>
            Measure the circumference of the subject's waist at a horizontal
            level around the navel for men, and at the level with the smallest
            width for women. Ensure that the subject does not pull their stomach
            inwards to obtain accurate measurements.
          </li>
          <li>
            Measure the circumference of the subject's neck starting below the
            larynx, with the tape sloping downward to the front. The subject
            should avoid flaring their neck outwards.
          </li>
          <li>
            <strong>For women only:</strong> Measure the circumference of the
            subject's hips at the largest horizontal measure.
          </li>
        </ul>
        <p>
          Once these measurements are obtained, use the following formulas to
          calculate an estimate of body fat. Two equations are provided, one
          using the U.S. customary system (USC), which uses inches, and the
          other using the International System of Units, specifically the unit
          of centimeters:
        </p>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for males:
        </h2>
        <div className="text-[9px] md:text-lg">
          <Latex displayMode={true}>
            {`$$BFP =\\frac{495}{1.0324 - 0.19077 \\times \\log_{10}(waist - neck) + 0.15456 \\times \\log_{10}(height)} - 450$$`}
          </Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for females:
        </h2>
        <div className="text-[9px] md:text-lg flex flex-wrap w-[90%]">
          <Latex displayMode={true}>
            {`$$BFP =\\frac{495}{1.29579  - 0.35004 \\times \\log_{10}(waist+hip-neck) +  0.22100 \\times \\log_{10}(height)} - 450$$`}
          </Latex>
        </div>
        <p>
          Note that the results of these calculations are only an estimate since
          they are based on many different assumptions to make them as
          applicable to as many people as possible. For more accurate
          measurements of body fat, the use of instruments such as bioelectric
          impedance analysis or hydrostatic density testing is necessary.
        </p>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Fat mass (FM) formula:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>{`$$FM = BF \\times Weight$$`}</Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Lean mass (LM) formula:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>{`$$LM = Weight-FM$$`}</Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          BMI Method
        </h2>
        <p>
          Another method for calculating an estimate of body fat percentage uses
          BMI. Refer to the{" "}
          <Link href={"/calculators/bmi"} className= 'hover:underline text-sky-500'>BMI Calculator</Link> to obtain an
          estimate of BMI for use with the BMI method, as well as further detail
          on how BMI is calculated, its implications, and its limitations.
          Briefly, the estimation of BMI involves the use of formulas that
          require the measurement of a person's height and weight. Given BMI,
          the following formulas can be used to estimate a person's body fat
          percentage.
        </p>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for adult males:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>
            {`$$BFP = 1.20 \\times BMI + 0.23 \\times Age - 16.2$$`}
          </Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for adult females:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>
            {`$$BFP = 1.20 \\times BMI + 0.23 \\times Age - 5.4$$`}
          </Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for boys:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>
            {`$$BFP = 1.51 \\times BMI - 0.70 \\times Age - 2.2$$`}
          </Latex>
        </div>
        <h2 className="text-[16px] md:text-[22px] font-bold py-3">
          Body fat percentage (BFP) formula for girls:
        </h2>
        <div className="text-sm px-12">
          <Latex displayMode={false}>
            {`$$BFP = 1.51 \\times BMI - 0.70 \\times Age +1.4$$`}
          </Latex>
        </div>
      </section>
    </div>
  );
};

export default page;
