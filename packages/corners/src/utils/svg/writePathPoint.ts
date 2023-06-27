type SvgCommandCode = `C` | `L` | `M` | `Q` | `S`

export function writePathPoint(
  x: number,
  y: number,
  command?: SvgCommandCode
): string {
  return command ? `${command} ${x},${y}` : `  ${x},${y}`
}
