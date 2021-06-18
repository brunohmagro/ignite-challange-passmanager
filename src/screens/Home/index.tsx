import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import { SearchBar } from "../../components/SearchBar";
import { LoginDataItem } from "../../components/LoginDataItem";

import { useStorageData } from "../../hooks/login";

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage,
} from "./styles";

export function Home() {
  const { loadLogins, filterLoginData, searchListData, loginsLoading } =
    useStorageData();

  function handleFilterLoginData(search: string) {
    filterLoginData(search);
  }

  useFocusEffect(
    useCallback(() => {
      loadLogins();
    }, [])
  );

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      {!loginsLoading ? (
        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          ListEmptyComponent={
            <EmptyListContainer>
              <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
            </EmptyListContainer>
          }
          renderItem={({ item: loginData }) => {
            return (
              <LoginDataItem
                title={loginData.title}
                email={loginData.email}
                password={loginData.password}
              />
            );
          }}
        />
      ) : (
        <AppLoading />
      )}
    </Container>
  );
}
