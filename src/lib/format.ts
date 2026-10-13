const formatter = new Intl.NumberFormat("en-GH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Formats a cedi amount as "GH₵180". Uses Intl so grouping follows the locale. */
export function formatGHS(amount: number) {
  return `GH₵${formatter.format(amount)}`;
}

export function pluralise(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}
