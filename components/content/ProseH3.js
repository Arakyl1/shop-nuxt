export default (props, cont) => {
    return h(
      "h3",
      { class: "text-3xl text-black-500 xl:text-2xl lg:text-xl sm:text-lg" },
      cont.slots.default()
    );
  };