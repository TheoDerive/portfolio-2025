export class Time {
  public start: number
  public current : number
  public delta: number
  public elapsed: number

  constructor(){
    this.start = performance.now()
    this.current = this.start
    this.delta = 16
    this.elapsed = 0
  }

  update(){
    const now = performance.now()
    this.delta = now - this.current
    this.current = now
    this.elapsed = now - this.start 
  }
}
