export default (props, cont) => {
    return h(
      "a",
      props,
      cont.slots.default()
    );
  };