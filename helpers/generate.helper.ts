
export const generateOrderCode = (id: number) : string => {
  const code = `OD${String(id).padStart(8, '0')}`;
  return code;
}

export const generateTourCode = (number: number): string => {
  const code = `TOUR${String(number).padStart(6, '0')}`;
  return code;
};