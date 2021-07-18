export type Snowflake = `${bigint}`;

export class SnowflakeUtil {
    private epoch: number;
    private workerID: number;
    private processID: number;
    private increment: number;

    constructor(config?: SnowflakeConfig) {
        this.epoch = config && config.epoch || 1577833200000;
        this.workerID = config && config.workerID || 1;
        this.processID = config && config.processID || 1;
        this.increment = 1;

        if(config)
            this.validateConfig(config);
    }

    private validateConfig(config: SnowflakeConfig): void {
        if (config.epoch && (typeof config.epoch !== 'number' || config.epoch < 0 || config.epoch > 4398046511103)) {
            throw new Error(`Epoch must be a number between 0 and 4398046511103, got ${config.epoch}`);
        }
        if (config.workerID && (typeof config.workerID !== 'number' || config.workerID < 0 || config.workerID > 31)) {
            throw new Error(`Worker ID must be a number between 0 and 31, got ${config.workerID}`);
        }
        if (config.processID && (typeof config.processID !== 'number' || config.processID < 0 || config.processID > 31)) {
            throw new Error(`Process ID must be a number between 0 and 31, got ${config.processID}`);
        }
    }

    public generate(): Snowflake {
        const timestamp = (Date.now() - this.epoch).toString(2);
        const workerID = parseInt(`${this.workerID}`, 10).toString(2);
        const processID = parseInt(`${this.processID}`, 10).toString(2);
        const increment = parseInt(`${this.increment}`, 10).toString(2);

        const snowflakeBinary = `${timestamp.padStart(42, '0')}${workerID.padStart(5, '0')}${processID.padStart(5, '0')}${increment.padStart(12, '0')}`;
        const snowflake = BigInt('0b' + snowflakeBinary).toString(10);
        this.increment++;
        return snowflake as Snowflake;
    }

    public getTimestamp(snowflake: Snowflake): number {
        const timestamp = (BigInt(snowflake) >> 22n);
        return parseInt(timestamp.toString(10), 10);
    }

    public getWorkerID(snowflake: Snowflake): number {
        const workerID = (BigInt(snowflake) & 0x3E0000n) >> 17n;
        return parseInt(workerID.toString(10), 10);
    }

    public getProcessID(snowflake: Snowflake): number {
        const processID = (BigInt(snowflake) & 0x1F000n) >> 12n;
        return parseInt(processID.toString(10), 10);
    }

    public getIncrement(snowflake: Snowflake): number {
        const increment = (BigInt(snowflake) & 0xFFFn);
        return parseInt(increment.toString(10), 10);
    }
}

type SnowflakeConfig = {
    /**
     * The epoch timestamp used to calculate snowflake IDs.
     * Defaults to the timestamp of the first second of 2020.
     * @default 1577833200000
     */
    epoch?: number;
    /**
     * The worker ID.
     * Defaults to 1.
     * @default 1
     */
    workerID?: number;
    /**
     * The process ID.
     * Defaults to 1.
     * @default 1
     */
    processID?: number;
}