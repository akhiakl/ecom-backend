export type RedisCheckSettings = {
  /**
   * The amount of time the check should require in `ms`.
   *
   * @defaultValue `1000`
   */
  timeout?: number;

  /**
   * The maximum amount of memory used by redis in `bytes`.
   */
  memoryThreshold?: number;
};
