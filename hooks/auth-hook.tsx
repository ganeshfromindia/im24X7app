import { useState, useCallback, useEffect } from "react";

interface data {
  data: UserDataType;
}

interface UserDataType {
  id: number,
  name: string,
  location: string,
  tag: string
}

const useAuth = () => {
  let data: data[] = [{
    id: null,
      name: null,
      location: null,
      tag: null
  }];
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<any | null>();
  const [location, setLocation] = useState<number | null>(null);
  const [tag, setTag] = useState<string | null>(null);



  const userData = useCallback(
    async (
      id: number | null,
      name: string | null,
      location: string | null,
      tag: string | null,
    ) => {

      data.push({id: id, name: name, location: location, tag: tag})
    },
    []
  );






  return {
    id,
    name,
    location,
    tag,
    data,
userData
  };
};

export default useAuth;
