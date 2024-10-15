
export const generateOrderCode = (id: number) : string => {
  const code = `OD${String(id).padStart(8, '0')}`;
  return code;
}