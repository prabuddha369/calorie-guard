export const calculateMaintenanceCalorie = (gender:string, weight:number, age:number, height:number):number => {
    return gender === "male"
      ? 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age
      : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  };

export const calculateBmi = (gender:string, weight:number, age:number, height:number):number => {
    return weight / Math.pow(height / 100, 2);
  }
  export const calculateBmr = (gender:string, weight:number, age:number, height:number):number => {
    return gender === "male"
    ? 13.397 * weight + 4.799 * height - 5.677 * age + 88.362
    : 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;
  }