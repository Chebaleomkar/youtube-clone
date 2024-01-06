import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from '../utils/Api';

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectCategorie, setSelectCategorie] = useState('New');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Retrieve premiumUser value from local storage, default to false if not present
  const storedPremiumUser = localStorage.getItem('premium');
  const [premiumUser, setPremiumUser] = useState(storedPremiumUser ? JSON.parse(storedPremiumUser) : false);

  useEffect(() => {
    fetchSelectionCategoryData(selectCategorie);
  }, [selectCategorie]);

  useEffect(() => {
    localStorage.setItem('premium', JSON.stringify(premiumUser));
  }, [premiumUser]);

  console.log(premiumUser);

  const fetchSelectionCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`)
      .then(({ contents }) => {
        console.log(contents);
        setSearchResults(contents);
        setLoading(false);
      });
  };

  const contextValues = {
    loading,
    setLoading,
    searchResults,
    setSearchResults,
    selectCategorie,
    setSelectCategorie,
    mobileMenu,
    setMobileMenu,
    premiumUser,
    setPremiumUser
  };

  return (
    <Context.Provider value={contextValues}>
      {props.children}
    </Context.Provider>
  );
};
