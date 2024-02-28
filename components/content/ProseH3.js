export default (props, { slots }) => {
    return h(
      "h3",
      { class: "text-black-500" },
      slots.default()
    );
  };
  // text-3xl text-black-500 xl:text-2xl lg:text-xl sm:text-lg