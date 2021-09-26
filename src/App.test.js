import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/* 
factoory function to create a shallow wrapper for the App
@function setup
@returns {ShallowWrapper} 
**/
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCount = findByTestAttr(wrapper, "count");
  expect(initialCount.text()).toBe("0");
});

describe("Increment counter", () => {
  test("renders a increment button", () => {
    const wrapper = setup();
    const incrementButton = findByTestAttr(wrapper, "increment-button");
    expect(incrementButton.length).toBe(1);
  });
  test("on click of increment button counter incremented by 1", () => {
    const wrapper = setup();
    //find the button
    const button = findByTestAttr(wrapper, "increment-button");
    //simulate the count
    button.simulate("click");
    //get the final count
    const finalCount = findByTestAttr(wrapper, "count");
    expect(finalCount.text()).toBe("1");
  });
});

describe("Decrement Counter", () => {
  test("renders a decrement button", () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    expect(decrementButton.length).toBe(1);
  });

  test("on click of decrement button counter decremented by 1 when state is greater than 0", () => {
    const wrapper = setup();
    //find the increment button
    const incrementButton = findByTestAttr(wrapper, "increment-button");
    //increment the counter
    incrementButton.simulate("click");
    //find the button
    const decrementButton = findByTestAttr(wrapper, "decrement-button");
    //simulate the count
    decrementButton.simulate("click");
    //get the final count
    const finalCount = findByTestAttr(wrapper, "count");
    expect(finalCount.text()).toBe("0");
  });
});

describe("Error when counter goes below 0", () => {
  test("donot show error when not needed", () => {
    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, "error-message");
    const errorHasHiddenClass = errorDiv.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
  });

  describe("counter is 0 and decrement is clicked", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
      const decrementButton = findByTestAttr(wrapper, "decrement-button");
      decrementButton.simulate("click");
    });

    test("error shows", () => {
      //check the class of error message
      const errorDiv = findByTestAttr(wrapper, "error-message");
      const errorHasHiddenClass = errorDiv.hasClass("hidden");
      expect(errorHasHiddenClass).toBe(false);
    });
    test("counter still displays 0", () => {
      //get the counter display text
      const count = findByTestAttr(wrapper, "count");
      expect(count.text()).toBe("0");
    });
    test("Clicking increment button hides the error", () => {
      //get increment button
      const incrementButton = findByTestAttr(wrapper, "increment-button");
      incrementButton.simulate("click");

      //check the class of the error Div
      const errorDiv = findByTestAttr(wrapper, "error-message");
      const errorHasHiddenClass = errorDiv.hasClass("hidden");
      expect(errorHasHiddenClass).toBe(true);
    });
  });
});
