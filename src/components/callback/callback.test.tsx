import * as React from "react";
import * as renderer from "react-test-renderer";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CallbackComponent } from "./callback.component";


configure({ adapter: new Adapter() });

describe("CallbackComponent", () => {
  afterAll(() => setTimeout(() => process.exit(), 1000))

  it("CallbackComponent renders correctly", () => {
    const tree = renderer.create(<CallbackComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("If token exists, calls the login function", () => {
    Object.assign(window.location, 'hash', {
      writable: true,
      value: 'access_token=aefaefaefgsrgsrgdfg23234234'
    });
            const wrapper = shallow(<CallbackComponent />, {
              context: {
                router: {
                  location: {
                    hash: window.location.hash,
                  },
                },
              },
            });
    expect(wrapper.find("div").text()).toBe("Authenticated!!");
  });
});
