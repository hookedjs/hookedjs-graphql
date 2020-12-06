export default function choose<T>(...options: T[]): T | undefined {
  for (const option of options) {
    if (option) return option
  }
}
