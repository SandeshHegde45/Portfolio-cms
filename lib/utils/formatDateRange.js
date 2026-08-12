const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric"
});

export function formatYearMonth(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  const date = new Date(Number(year), Number(month) - 1);
  return monthFormatter.format(date);
}

export function formatDateRange(startDate, endDate, isCurrent) {
  const start = formatYearMonth(startDate);
  const end = isCurrent ? "Present" : formatYearMonth(endDate) || "Present";
  if (!start) return end;
  return `${start} — ${end}`;
}
