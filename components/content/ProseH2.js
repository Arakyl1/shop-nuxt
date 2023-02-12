
export default (props, cont) => {
  return h(
    "h2",
    { class: "text-4xl text-black-500 xl:text-3xl lg:text-2xl sm:text-xl" },
    cont.slots.default()
  );
};