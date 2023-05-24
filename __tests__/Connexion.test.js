import React from "react";
import { shallow } from "enzyme";
import { TextInput, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Connexion from "../components/Connexion";

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("Connexion component", () => {
  let wrapper;
  let setIsLoggedIn;
  let handleLogin;

  beforeEach(() => {
    setIsLoggedIn = jest.fn();
    handleLogin = jest.fn();
    wrapper = shallow(<Connexion setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin} />);
  });

  it("should update state when email is entered", () => {
    const emailInput = wrapper.find(TextInput).at(0);
    emailInput.simulate("changeText", "test@example.com");
    expect(wrapper.find(TextInput).at(0).props().value).toEqual("test@example.com");
  });

  it("should update state when password is entered", () => {
    const passwordInput = wrapper.find(TextInput).at(1);
    passwordInput.simulate("changeText", "password123");
    expect(wrapper.find(TextInput).at(1).props().value).toEqual("password123");
  });

  it("should call handleLogin when login button is pressed", () => {
    const loginButton = wrapper.find(Button).first();
    loginButton.props().onPress(); // Récupérer la référence à la fonction onPress sans l'appeler
    expect(handleLogin).toHaveBeenCalled();
  });

  it("should set isLoggedIn to true when login is successful", async () => {
    jest.useFakeTimers(); // Utilisation des faux timers de Jest
    jest.spyOn(AsyncStorage, "setItem").mockResolvedValue(null);

    await wrapper.instance().handleLogin();

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "jwt-token");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("isLoggedIn", "true");
    expect(setIsLoggedIn).toHaveBeenCalledWith(true);
  });
});
