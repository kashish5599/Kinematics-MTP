// eslint-disable-next-line no-extend-native
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

// eslint-disable-next-line no-extend-native
String.prototype.bitAND = function (s) {
  return (parseInt(this, 2) & parseInt(s, 2)).toString(2);
};

// eslint-disable-next-line no-extend-native
String.prototype.bitOR = function (s) {
  return (parseInt(this, 2) | parseInt(s, 2)).toString(2);
};

// eslint-disable-next-line no-extend-native
String.prototype.bitXOR = function (s) {
  return (parseInt(this, 2) ^ parseInt(s, 2)).toString(2);
};
