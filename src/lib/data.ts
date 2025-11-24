export interface UserProfile {
  id: string;
  name: string;
  age: number;
  job: string;
  image: string;
  ratingFromThem?: number;
  myRating?: number;
  status: "new" | "rated_me" | "matched" | "rejected";
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: "1",
    name: "Nara",
    age: 24,
    job: "Model & Chef",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
    status: "new",
  },
  {
    id: "2",
    name: "Sofia",
    age: 26,
    job: "Interior Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    ratingFromThem: 87,
    status: "rated_me",
  },
  {
    id: "3",
    name: "Emma",
    age: 23,
    job: "Photographer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    ratingFromThem: 92,
    status: "rated_me",
  },
  {
    id: "4",
    name: "Isabella",
    age: 27,
    job: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    ratingFromThem: 78,
    myRating: 82,
    status: "matched",
  },
  {
    id: "5",
    name: "Maya",
    age: 25,
    job: "Dance Instructor",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?q=80&w=1000&auto=format&fit=crop",
    ratingFromThem: 65,
    myRating: 45,
    status: "rejected",
  },
  {
    id: "6",
    name: "Aria",
    age: 28,
    job: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop",
    ratingFromThem: 88,
    myRating: 91,
    status: "matched",
  },
];
