
export default (props, cont) => {
    return h(
      "h3",
      { class: "text-2xl text-black-500 xl:text-xl lg:text-lg sm:text-base" },
      cont.slots.default()
    );
  };