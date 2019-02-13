const {
  argv: [, , ...nums]
} = process;

const result = nums.reduce((accum, val) => accum + Number(val), 0);

console.log(result);

/*console.log(
  process.argv
    .slice(2)
    .reduce((acc, curValue) => Number(acc) + Number(curValue))
);*/
