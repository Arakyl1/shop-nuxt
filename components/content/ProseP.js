export default (props, cont) => {
    return h(
      "p",
      {},
      cont.slots.default()
    );
  };