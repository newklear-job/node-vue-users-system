import { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import UserForm from "@/components/Users/Form.vue";

describe("UserForm.vue", () => {
  it("renders validation message when passed", () => {
    const validationErrors = { email: "test validation message" };
    const wrapper = shallowMount(UserForm, {
      props: { validationErrors }
    });
    expect(wrapper.text()).to.include("test validation message");
  });

  it("controls slot is rendered", () => {
    const validationErrors = {};
    const wrapper = mount(UserForm, {
      props: { validationErrors },
      slots: {
        // todo: bugged in vue 3.0.4
        controls: `
                  <div class="form-group">
                    <button class="btn btn-success">UpdateTestText</button>
                  </div>              
                `
      }
    });

    expect(wrapper.text()).to.include("UpdateTestText");
  });

  it("triggers event message when passed", async () => {
    const validationErrors = {};
    const wrapper = shallowMount(UserForm, {
      props: { validationErrors },
      slots: {
        scoped: `<template #controls>
                  <div class="form-group">
                    <a @click="$router.back()" class="btn btn-warning">Back</a>
                    <button class="btn btn-success">Update</button>
                  </div>
                </template>
                `
      }
    });

    const button = wrapper.find("button");

    await button.trigger("click");

    expect(wrapper.emitted().formSubmit).to.be.ok;
  });
});
