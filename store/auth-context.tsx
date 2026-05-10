import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

export const AuthContext = createContext<data | any>({
  data: {
    id: 0,
    name: "",
    location: "",
    tag: "",
    postUserData: () => {},
    getUserData: () => {},
  },
});
// export const AuthContext = createContext<UserDataType>({  id: 0,
//   name: "",
//   location: "",
//   tag: "",
//   postUserData: () => {},
//   getUserData: () => {},
// });

export const UserProvider = ({ children }: { children: any }) => {
  let dummy: any[] = [];
  dummy.length = 25;
  let dummyObj = { id: 1, name: "Harsh", location: "India", tag: "Developer" };
  dummy.fill(dummyObj, 0, 250);
  dummy = dummy.map((item, index) => ({
    ...item,
    id: index,
    name: item.name + " " + (index + 1),
  }));

  const [id, setId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  const [name, setName] = useState<any | null>();
  const [location, setLocation] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [data, setData] = useState<any[]>(dummy);

  //   useEffect(() => {
  //     setData(dummy);
  //   }, []);
  //
  useEffect(() => {
    getUserData();

    return () => {};
  }, [data]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    console.log("Logging in...", isLoggedIn);
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out...");
    setIsLoggedIn(false);
  }, []);

  const postUserData = useCallback(async (dataPost: any | null) => {
    setData(dataPost);
  }, []);
  const getUserData = useCallback(async () => {
    return data;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data: data,
        getUserData: getUserData,
        postUserData: postUserData,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(AuthContext);
