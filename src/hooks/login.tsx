import React, { createContext, useState, ReactNode, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

export interface Login {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface LoginDataContext {
  logins: Login[];
  registerLogin: (login: Login) => Promise<void>;
  filterLoginData: (search: string) => void;
  searchListData: Login[];
  loadLogins: () => Promise<void>;
  loginsLoading: boolean;
}

const LoginContext = createContext({} as LoginDataContext);

const LoginProvider = ({ children }: AuthProviderProps) => {
  const keyLogins = "@passmanager:logins";

  const [searchListData, setSearchListData] = useState<Login[]>([]);
  const [logins, setLogins] = useState<Login[]>([]);
  const [loginsLoading, setLoginsLoading] = useState(true);

  const registerLogin = async (login: Login): Promise<void> => {
    try {
      const oldLogins = await AsyncStorage.getItem(keyLogins);

      const currentLogins = oldLogins ? JSON.parse(oldLogins) : [];

      const newListItems = [...currentLogins, login];

      await AsyncStorage.setItem(keyLogins, JSON.stringify(newListItems));
    } catch (error) {
      console.log(error);
      Alert.alert("Ops, falhei na hora de salvar");
    }
  };

  const loadLogins = async (): Promise<void> => {
    try {
      const data = await AsyncStorage.getItem(keyLogins);
      const dataParse = data ? JSON.parse(data) : [];

      setSearchListData(dataParse);
      setLogins(dataParse);
      setLoginsLoading(false);
    } catch (error) {
      console.log("Erro ao recuperar os dados");
      Alert.alert("Ops, falhei ao carregar as informações");
    }
  };

  const filterLoginData = (search: string): void => {
    const result = search
      ? logins.filter((login) => login.title.includes(search))
      : logins;

    setSearchListData(result);
  };

  return (
    <LoginContext.Provider
      value={{
        logins,
        registerLogin,
        filterLoginData,
        searchListData,
        loadLogins,
        loginsLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useStorageData = () => {
  const context = useContext(LoginContext);
  return context;
};

export { LoginProvider, useStorageData };
