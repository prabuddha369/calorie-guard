export const calculateMaintenanceCalorie = (gender, weight, age, height) => {
    return gender === "male"
      ? 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age
      : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  };

export const calculateBmi = (gender, weight, age, height) => {
    return weight / Math.pow(height / 100, 2);
  }
  export const calculateBmr = (gender, weight, age, height) => {
    return gender === "male"
      ? (10 * weight + 6.25 * height - 5 * age) + 5
      : (10 * weight + 6.25 * height - 5 * age) - 161;
  }