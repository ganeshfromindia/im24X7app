import { createContext } from "react";

interface data {
  data: UserDataType;
}

interface UserDataType {
  id: number;
  name: string;
  location: string;
  tag: string;
  postUserData: (
    id: number | null,
    name: string | null,
    location: string | null,
    tag: string | null,
  ) => void;
  getUserData: (
    id: number | null,
    name: string | null,
    location: string | null,
    tag: string | null,
  ) => void;
}

export const AuthContext = createContext<data | any>(undefined);
// export const AuthContext = createContext<UserDataType>({  id: 0,
//   name: "",
//   location: "",
//   tag: "",
//   postUserData: () => {},
//   getUserData: () => {},
// });
