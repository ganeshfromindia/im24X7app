import { useCallback, useEffect, useState } from "react";

interface data {
  data: UserDataType;
}

interface UserDataType {
  id: number;
  name: string;
  location: string;
  tag: string;
}

const useAuth = () => {
  let dummy: any[] = [];
  dummy.length = 250;
  let dummyObj = { id: 1, name: "Harsh", location: "India", tag: "Developer" };
  dummy.fill(dummyObj, 0, 250);
  dummy = dummy.map((item, index) => ({
    ...item,
    id: index,
    name: item.name + " " + (index + 1),
  }));

  let dataPost: any[] = [];
  const [id, setId] = useState<number | null>(null);
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

  const postUserData = useCallback(
    async (
      id: number | null,
      name: string | null,
      location: string | null,
      tag: string | null,
    ) => {
      dataPost.push({ id: id, name: name, location: location, tag: tag });

      setData((prevData) => [...prevData, dataPost]);
    },
    [],
  );
  const getUserData = useCallback(async () => {
    return data;
  }, []);

  return {
    id,
    name,
    location,
    tag,
    data,
    postUserData,
    getUserData,
  };
};

export default useAuth;
