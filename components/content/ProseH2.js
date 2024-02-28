
export default (props, { slots }) => {
  return h(
    "h2",
    { class: "text-black-500" },
    slots.default()
  );
};
// "text-4xl text-black-500 xl:text-3xl lg:text-2xl sm:text-xl"