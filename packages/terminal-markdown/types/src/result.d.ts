export declare class Result extends Object {
    #private;
    constructor(ok?: boolean, reason?: string);
    get ok(): boolean;
    set ok(ok: boolean);
    get reason(): string;
    set reason(reason: string);
    static ok(): Result;
    static error(message: string): Result;
    toString(): string;
}
//# sourceMappingURL=result.d.ts.map