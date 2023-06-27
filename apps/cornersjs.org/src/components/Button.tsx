export default function Button(props: ButtonProps) {
  const { children, ...rest } = props
  return <button {...rest}>{children}</button>
}
