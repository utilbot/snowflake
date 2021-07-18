"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeUtil = void 0;
class SnowflakeUtil {
    constructor(config) {
        this.epoch = config && config.epoch || 1577833200000;
        this.workerID = config && config.workerID || 1;
        this.processID = config && config.processID || 1;
        this.increment = 1;
    }
    generate() {
        const timestamp = (Date.now() - this.epoch).toString(2);
        const workerID = parseInt(`${this.workerID}`, 10).toString(2);
        const processID = parseInt(`${this.processID}`, 10).toString(2);
        const increment = parseInt(`${this.increment}`, 10).toString(2);
        const snowflakeBinary = `${timestamp.padStart(42, '0')}${workerID.padStart(5, '0')}${processID.padStart(5, '0')}${increment.padStart(12, '0')}`;
        const snowflake = BigInt('0b' + snowflakeBinary).toString(10);
        this.increment++;
        return snowflake;
    }
    getTimestamp(snowflake) {
        const timestamp = (BigInt(snowflake) >> 22n);
        return parseInt(timestamp.toString(10), 10);
    }
    getWorkerID(snowflake) {
        const workerID = (BigInt(snowflake) & 0x3e0000n) >> 17n;
        return parseInt(workerID.toString(10), 10);
    }
    getProcessID(snowflake) {
        const processID = (BigInt(snowflake) & 0x1f000n) >> 12n;
        return parseInt(processID.toString(10), 10);
    }
    getIncrement(snowflake) {
        const increment = (BigInt(snowflake) & 0xfffn);
        return parseInt(increment.toString(10), 10);
    }
}
exports.SnowflakeUtil = SnowflakeUtil;
//# sourceMappingURL=Snowflake.js.map