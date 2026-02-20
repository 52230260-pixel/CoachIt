export const mockClients = [
  { id: 1, name: "Ahmad Khalil", email: "ahmad@email.com", phone: "+962791234567", status: "active", plan: "Both", startDate: "2025-01-10", endDate: "2025-02-10", level: "Beginner", weight: 85, height: 178, age: 26, gender: "Male" },
  { id: 2, name: "Sarah Hassan", email: "sarah@email.com", phone: "+962799876543", status: "active", plan: "Diet", startDate: "2025-01-15", endDate: "2025-02-15", level: "Intermediate", weight: 62, height: 165, age: 29, gender: "Female" },
  { id: 3, name: "Omar Nasser", email: "omar@email.com", phone: "+962795555555", status: "active", plan: "Workout", startDate: "2025-01-20", endDate: "2025-02-20", level: "Advanced", weight: 78, height: 182, age: 31, gender: "Male" },
  { id: 4, name: "Lara Haddad", email: "lara@email.com", phone: null, status: "active", plan: "Both", startDate: "2025-01-05", endDate: "2025-03-05", level: "Beginner", weight: 70, height: 170, age: 24, gender: "Female" },
  { id: 5, name: "Karim Saleh", email: "karim@email.com", phone: "+962793333333", status: "active", plan: "Workout", startDate: "2025-01-25", endDate: "2025-02-25", level: "Intermediate", weight: 90, height: 185, age: 35, gender: "Male" },
];

export const mockDisabledClients = [
  { id: 6, name: "Rania Qasim", email: "rania@email.com", disabledDate: "2025-01-08", reason: "Subscription expired" },
  { id: 7, name: "Faris Eid", email: "faris@email.com", disabledDate: "2025-01-12", reason: "Client request" },
];

export const mockRequests = [
  { id: 1, name: "Nour Khalid", email: "nour@email.com", phone: null, age: 22, gender: "Female", weight: 58, height: 162, level: "Beginner", planType: ["Diet"], date: "2025-01-28", status: "pending" },
  { id: 2, name: "Bassem Younis", email: "bassem@email.com", phone: "+962797777777", age: 34, gender: "Male", weight: 95, height: 180, level: "Intermediate", planType: ["Workout", "Diet"], date: "2025-01-27", status: "pending" },
  { id: 3, name: "Dina Mansour", email: "dina@email.com", phone: "+962792222222", age: 27, gender: "Female", weight: 67, height: 168, level: "Advanced", planType: ["Workout"], date: "2025-01-26", status: "approved" },
];

export const mockExercises = [
  { id: 1, name: "Barbell Squat", category: "Legs", muscle: "Quadriceps", level: "Intermediate", equipment: "Barbell", videoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8" },
  { id: 2, name: "Bench Press", category: "Chest", muscle: "Pectorals", level: "Intermediate", equipment: "Barbell", videoUrl: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
  { id: 3, name: "Deadlift", category: "Back", muscle: "Erector Spinae", level: "Advanced", equipment: "Barbell", videoUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q" },
  { id: 4, name: "Pull-Up", category: "Back", muscle: "Latissimus Dorsi", level: "Intermediate", equipment: "Bodyweight", videoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
  { id: 5, name: "Overhead Press", category: "Shoulders", muscle: "Deltoids", level: "Intermediate", equipment: "Barbell", videoUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI" },
  { id: 6, name: "Bicep Curl", category: "Arms", muscle: "Biceps", level: "Beginner", equipment: "Dumbbell", videoUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
  { id: 7, name: "Tricep Dip", category: "Arms", muscle: "Triceps", level: "Beginner", equipment: "Bodyweight", videoUrl: "https://www.youtube.com/watch?v=6kALZikXxLc" },
  { id: 8, name: "Lunges", category: "Legs", muscle: "Glutes", level: "Beginner", equipment: "Bodyweight", videoUrl: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
  { id: 9, name: "Plank", category: "Core", muscle: "Abs", level: "Beginner", equipment: "Bodyweight", videoUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c" },
  { id: 10, name: "Romanian Deadlift", category: "Legs", muscle: "Hamstrings", level: "Advanced", equipment: "Barbell", videoUrl: "https://www.youtube.com/watch?v=JCXUYuzwNrM" },
];

export const mockFoods = [
  { id: 1, name: "Chicken Breast", category: "Protein", calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: "100g" },
  { id: 2, name: "Brown Rice", category: "Carbs", calories: 216, protein: 5, carbs: 45, fat: 1.8, unit: "1 cup cooked" },
  { id: 3, name: "Eggs", category: "Protein", calories: 78, protein: 6, carbs: 0.6, fat: 5, unit: "1 large" },
  { id: 4, name: "Avocado", category: "Fats", calories: 240, protein: 3, carbs: 13, fat: 22, unit: "1 medium" },
  { id: 5, name: "Oats", category: "Carbs", calories: 154, protein: 5.3, carbs: 27, fat: 2.6, unit: "1/2 cup dry" },
  { id: 6, name: "Greek Yogurt", category: "Dairy", calories: 100, protein: 17, carbs: 6, fat: 0.7, unit: "170g" },
  { id: 7, name: "Salmon", category: "Protein", calories: 208, protein: 20, carbs: 0, fat: 13, unit: "100g" },
  { id: 8, name: "Sweet Potato", category: "Carbs", calories: 103, protein: 2.3, carbs: 24, fat: 0.1, unit: "1 medium" },
  { id: 9, name: "Almonds", category: "Fats", calories: 164, protein: 6, carbs: 6, fat: 14, unit: "28g (1oz)" },
  { id: 10, name: "Banana", category: "Fruits", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: "1 medium" },
];

export const mockWorkoutPlan = {
  id: 1,
  name: "Hypertrophy Program",
  startDate: "2025-01-10",
  endDate: "2025-02-10",
  days: [
    {
      day: "Monday",
      focus: "Chest & Triceps",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", videoUrl: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s", videoUrl: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
        { name: "Tricep Dip", sets: 3, reps: "12-15", rest: "60s", videoUrl: "https://www.youtube.com/watch?v=6kALZikXxLc" },
      ]
    },
    {
      day: "Wednesday",
      focus: "Back & Biceps",
      exercises: [
        { name: "Pull-Up", sets: 4, reps: "6-8", rest: "90s", videoUrl: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
        { name: "Barbell Row", sets: 4, reps: "8-10", rest: "90s", videoUrl: "https://www.youtube.com/watch?v=kBWAon7ItDw" },
        { name: "Bicep Curl", sets: 3, reps: "12-15", rest: "60s", videoUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
      ]
    },
    {
      day: "Friday",
      focus: "Legs & Shoulders",
      exercises: [
        { name: "Barbell Squat", sets: 4, reps: "8-10", rest: "120s", videoUrl: "https://www.youtube.com/watch?v=ultWZbUMPL8" },
        { name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "90s", videoUrl: "https://www.youtube.com/watch?v=JCXUYuzwNrM" },
        { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90s", videoUrl: "https://www.youtube.com/watch?v=2yjwXTZQDDI" },
      ]
    },
  ]
};

export const mockDietPlan = {
  id: 1,
  name: "Lean Bulk Diet",
  startDate: "2025-01-10",
  endDate: "2025-02-10",
  dailyCalories: 2400,
  macros: { protein: 180, carbs: 250, fat: 75 },
  meals: [
    {
      meal: "Breakfast",
      time: "7:00 AM",
      items: [
        { name: "Oats", amount: "1 cup", calories: 308 },
        { name: "Eggs", amount: "3 whole", calories: 234 },
        { name: "Banana", amount: "1 medium", calories: 89 },
      ]
    },
    {
      meal: "Lunch",
      time: "1:00 PM",
      items: [
        { name: "Chicken Breast", amount: "200g", calories: 330 },
        { name: "Brown Rice", amount: "1.5 cups", calories: 324 },
        { name: "Avocado", amount: "1/2 medium", calories: 120 },
      ]
    },
    {
      meal: "Snack",
      time: "4:00 PM",
      items: [
        { name: "Greek Yogurt", amount: "170g", calories: 100 },
        { name: "Almonds", amount: "28g", calories: 164 },
      ]
    },
    {
      meal: "Dinner",
      time: "8:00 PM",
      items: [
        { name: "Salmon", amount: "200g", calories: 416 },
        { name: "Sweet Potato", amount: "1 large", calories: 162 },
      ]
    },
  ]
};

export const mockMessages = [
  {
    id: 1,
    from: "Coach Walid",
    date: "2025-01-10",
    subject: "Your Workout Plan is Ready!",
    planType: "Workout",
    read: true,
    content: "Hey Ahmad! Your custom 4-week hypertrophy program is now active. I've designed it around your intermediate level and goal of building muscle mass. Make sure to follow the rest periods strictly and watch the video tutorials before each new exercise. Let me know if anything feels too heavy. You've got this! 💪"
  },
  {
    id: 2,
    from: "Coach Walid",
    date: "2025-01-10",
    subject: "Your Diet Plan is Active",
    planType: "Diet",
    read: false,
    content: "Your personalized lean bulk diet plan is now live! At 2400 calories with a 180g protein target, this will support muscle growth while keeping fat gain minimal. Stick to the meal times as much as possible. Hydration is key — aim for 3 liters of water daily. Feel free to reach out if you want to swap any meals."
  },
];