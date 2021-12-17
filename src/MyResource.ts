export class MyResource {
  private readonly a: number
  private readonly b: number

  public constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }

  public execute(): number {
    return this.a + this.b
  }
}
