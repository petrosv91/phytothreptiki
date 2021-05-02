const weightsArr = [5, 10, 15, 20, 22.5, 25, 40, 45, 50];
export const weights = weightsArr.map((val, index) => ({ value: index + 1, label: val }));

const baseElementsArr = ['Αμμωνιακό', 'Ουρικό', 'Νιτρικό'];
export const baseElements = baseElementsArr.map((val, index) => ({
  value: index + 1,
  label: val,
}));
