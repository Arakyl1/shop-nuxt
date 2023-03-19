export default (props, { slots }) => {
    return h(
      "p",
      null,
      slots.default()
    );
  };