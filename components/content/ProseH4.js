
export default (props, { slots }) => {
    return h(
      "h3",
      { class: "text-black-500" },
      slots.default()
    );
  };
  // text-2xl  xl:text-xl lg:text-lg sm:text-base