export const checkGraphInput = (type = "ADJMAT", input = "") => {
  let output = { message: "all good", status: "true" };
  if (type === "ADJMAT") {
    const mat = input
      .replace(/\n+/g, "\n")
      .trim()
      .split("\n")
      .map((arr) => arr.replace(/\s+/g, " ").trim().split(" "));

    mat.every((row, i) => {
      if (row.length !== mat.length) {
        output = {
          message: `Please input a square matrix. Row ${i + 1} of invalid size`,
          status: false,
        };
        return false;
      }
      return true;
    });
    if (!output.status) return output;
    else
      output = {
        status: true,
        message: mat,
      };
  }
  return output;
};
