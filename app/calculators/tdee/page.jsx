"use client";

import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { frameworks } from "../../../constants";
import { calculateBmr, calculateMaintenanceCalorie } from "../../utils";
const page = () => {
  const [age, setAge] = useState(20);
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState("male"); // Default to male
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("sedentary")
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
  const ComboBox = () => {
    return (
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-start"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Sedentary"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[45vw] p-3">
            <Command>
              <CommandInput
                placeholder="Search activity level..."
                className="h-9 bg-white p-1"
              />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{framework.label}</TooltipTrigger>
                          <TooltipContent className="bg-white p-[3px]">
                            <p>{framework.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="pt-10 w-[100%] flex flex-col items-center justify-center gap-10">
        <section
          className="p-10 w-[90%] md:w-[25%] rounded-xl text-black"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            background: "linear-gradient(to bottom, transparent, skyblue)",
          }}
        >
          <h2 className="text-2xl font-bold mb-5">
            Calculate Your Maintenance Calorie
          </h2>
          <div className="flex flex-col">
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
            <a
              className="flex flex-row justify-center h-fit items-center text-blue-700 text-[15px]"
              href="https://www.google.com/search?q=what+is+maintenance+calories&sca_esv=585419522&rlz=1C1JZAP_enIN870IN870&sxsrf=AM9HkKk_T3MplQdJwjFuAjxPjbRLaSwk7w%3A1701007787177&ei=q1FjZaqnCoWm2roPgJ2HsAU&ved=0ahUKEwjqqKjn6-GCAxUFk1YBHYDOAVYQ4dUDCBA&uact=5&oq=what+is+maintenance+calories&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXQgaXMgbWFpbnRlbmFuY2UgY2Fsb3JpZXMyChAjGIAEGIoFGCcyBhAAGAcYHjILEAAYgAQYigUYkQIyCxAAGIAEGIoFGJECMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeSI0MUIMDWPwJcAB4ApABAJgB8AGgAdUMqgEFMC42LjK4AQPIAQD4AQHCAgQQABhH4gMEGAAgQeIDBRIBMSBAiAYBkAYI&sclient=gws-wiz-serp"
            >
              <strong>
                <br />
                Know more about Maintenance Calorie
              </strong>
              <FaExternalLinkAlt className="mt-8 ms-2" size={15} />
            </a>
          </div>
        </section>
        <section className="w-[80%] text-xl md:text-2xl mt-8 py-4 flex flex-col ">
            <h2 className="text-2xl font-bold mb-5">What is TDEE?</h2>
            <p className="py-2">
              TDEE stands for total daily energy expenditure. It is the total
              energy that a person uses in a day. TDEE is hard to measure
              accurately and varies day by day. More often, it is estimated
              using factors such as a person&ldquo;s basal metabolic rate (BMR),
              activity level, and the thermic effect of food.
            </p>
            <strong className="py-2">Basal metabolic rate:</strong>
            <p className="py-2">
              BMR is a person&ldquo;s energy usage rate while at rest in a
              temperate environment when the digestive system is inactive. In
              other words, it is the minimum energy needed to maintain a
              person&ldquo;s vital organs only.
            </p>
            <strong className="py-2">Activity level:</strong>
            <p className="py-2">
              Activity level is a factor that is based on the amount of activity
              a person undergoes. This includes deliberate exercise as well as
              other activities that a person may undergo as part of their job or
              typical daily activities. These factors are more specifically
              referred to as the thermic effect of activity, and non-exercise
              activity thermogenesis (energy expended for non-sleeping, eating,
              or sports-like exercise).
            </p>
            <strong className="py-2">Thermic effect of food:</strong>
            <p className="py-2">
              The thermic effect of food, also referred to as specific dynamic
              action, is the amount of energy required by the body to process
              and use food. It is sometimes estimated as 10% of food energy
              intake, but this can vary significantly depending on the type of
              food consumed. Protein, for example, has a far larger thermic
              effect than dietary fat, since it is more difficult to process.
            </p>
            <h2 className="text-2xl font-bold mb-5">How is TDEE calculated?</h2>
            <p className="py-2">
              TDEE is calculated based on the factors described above. The
              calculation usually begins with an estimation of basal metabolic
              rate (BMR), which is based on the use of equations that have been
              developed for this specific purpose. This includes physical
              characteristics such as age, gender, height, and weight.
            </p>
            <p className="py-2">
              Some of the more commonly used equations for estimating BMR
              include the Mifflin St-Jeor Equation, Harris-Benedict equation,
              and Katch-McArdle Formula. They are generally pretty similar, but
              the Katch-McArdle Formula, for example, which takes metabolic
              activity (resulting from differences between lean body mass and
              body fat) into account, can be more accurate for lean persons.
            </p>
            <p className="py-2">
              Once BMR is calculated, it is typically multiplied by an activity
              level factor, which is based on factors such as exercise and
              whether a person has a sedentary or very active job.
            </p>
            <p className="py-2">
              Other factors that can be considered in the calculation include
              the thermic effect of food, though this is not always factored
              into the calculation, and has a relatively smaller impact than BMR
              and activity level.
            </p>
          </section>
      </div>
  )
}

export default page