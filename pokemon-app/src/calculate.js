const calculate = (types) => {
  const type = [];
  for (let i in types) {
    type.push(types[i]["type"].name);
  }
  return type;
};
export default calculate;
