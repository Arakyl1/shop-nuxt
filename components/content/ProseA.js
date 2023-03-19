export default (props, { slots }) => {
    return h(
      "a",
      props,
      slots.default()
    );
  };