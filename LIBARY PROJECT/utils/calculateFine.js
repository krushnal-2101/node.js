const calculateFine = (dueDate, returnDate, ratePerDay = 5) => {
  if (!dueDate || !returnDate) return 0;
  const diffMs = returnDate.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays * ratePerDay : 0;
};

export default calculateFine;
