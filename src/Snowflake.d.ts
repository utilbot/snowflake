export declare type Snowflake = `${bigint}`;
export declare class SnowflakeUtil {
    private epoch;
    private workerID;
    private processID;
    private increment;
    constructor(config?: SnowflakeConfig);
    generate(): Snowflake;
    getTimestamp(snowflake: Snowflake): number;
    getWorkerID(snowflake: Snowflake): number;
    getProcessID(snowflake: Snowflake): number;
    getIncrement(snowflake: Snowflake): number;
}
declare type SnowflakeConfig = {
    /**
     * The epoch timestamp used to calculate snowflake IDs.
     * Defaults to the timestamp of the first second of 2020.
     * @default 1577833200000
     */
    epoch: number;
    /**
     * The worker ID.
     * Defaults to 1.
     * @default 1
     */
    workerID: number;
    /**
     * The process ID.
     * Defaults to 1.
     * @default 1
     */
    processID: number;
};
export {};
//# sourceMappingURL=Snowflake.d.ts.map