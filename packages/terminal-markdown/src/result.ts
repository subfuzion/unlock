export class Result extends Object {
  #ok: boolean;
  #reason?: string;
  constructor(ok: boolean = true, reason?: string) {
    super();
    this.#ok = ok;
    this.#reason = reason;
  }

  get ok(): boolean {
    return this.#ok && !this.#reason;
  }

  set ok(ok: boolean) {
    this.#ok = ok;
  }

  get reason(): string {
    return this.#reason || "";
  }

  set reason(reason: string) {
    this.ok = false;
    this.#reason = reason;
  }

  static ok(): Result {
    return new Result(true);
  }

  static error(message: string): Result {
    return new Result(false, message);
  }

  override toString() {
    return `ok: ${this.ok}, reason: ${this.reason}`;
  }
}
