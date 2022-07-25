export default class Simple8B {
  private static readonly maxInts: number[] = [240,120,60,30,20,15,12,10,8,7,6,5,4,3,2,1]
  private static readonly SELECTOR: number[] = [
    0,2,3,4,5,6,7,8,9,10,
    10,11,11,12,12,12,13,13,13,13,
    13,14,14,14,14,14,14,14,14,14,
    14,15,15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,15,15,
    15,15,15,15,15,15,15,15,15,15,15,
    -1,-1,-1,-1]

  public static compress(input: bigint[]): bigint[] {
    let i: number = 0
    const output: bigint[] = [];
    let outI: number = 0
    while (i < input.length) {
      let j = i
      let integers: number = 0;
      let bitMax: number = 0
      while (
        j < input.length &&
        integers < this.maxInts[this.SELECTOR[(bitMax = Math.max(bitMax, this.bits(input[j])))]]
        ) {
        integers++
        j++
      }

      let selector: number = this.SELECTOR[bitMax];
      while (integers < this.maxInts[selector] && selector < 15) {
        selector++;
      }

      switch (selector) {
        case 0:
          this.encode0(outI, output);
          i += 240
          break;
        case 1:
          this.encode1(outI, output);
          i += 120
          break;
        case 2:
          this.encode2(i, input, outI, output);
          i += 60
          break;
        case 3:
          this.encode3(i, input, outI, output);
          i += 30
          break;
        case 4:
          this.encode4(i, input, outI, output);
          i += 20
          break;
        case 5:
          this.encode5(i, input, outI, output);
          i += 15
          break;
        case 6:
          this.encode6(i, input, outI, output);
          i += 12
          break;
        case 7:
          this.encode7(i, input, outI, output);
          i += 10
          break;
        case 8:
          this.encode8(i, input, outI, output);
          i += 8
          break;
        case 9:
          this.encode9(i, input, outI, output);
          i += 7
          break;
        case 10:
          this.encode10(i, input, outI, output);
          i += 6
          break;
        case 11:
          this.encode11(i, input, outI, output);
          i += 5
          break;
        case 12:
          this.encode12(i, input, outI, output);
          i += 4
          break;
        case 13:
          this.encode13(i, input, outI, output);
          i += 3
          break;
        case 14:
          this.encode14(i, input, outI, output);
          i += 2
          break;
        case 15:
          this.encode15(i, input, outI, output);
          i++
          break;
        default:
          throw new Error("Cannot encode numbers that are greater than 2^60 or negative")
      }
      outI++
    }
    return output;
  }

  public static decompress(input: bigint[]): bigint[] {
    const out: bigint[] = [];
    let outI = 0
    for (let i = 0; i < input.length; i++) {
      const selector = this.readSelector(input[i])
      switch (selector) {
        case 0:
          this.decode0(outI, out)
          outI += 240
          break;
        case 1:
          this.decode1(outI, out)
          outI += 120
          break;
        case 2:
          this.decode2(input[i], outI, out)
          outI += 60
          break;
        case 3:
          this.decode3(input[i], outI, out)
          outI += 30;
          break;
        case 4:
          this.decode4(input[i], outI, out)
          outI += 20
          break;
        case 5:
          this.decode5(input[i], outI, out)
          outI += 15
          break;
        case 6:
          this.decode6(input[i], outI, out)
          outI += 12
          break;
        case 7:
          this.decode7(input[i], outI, out)
          outI += 10
          break;
        case 8:
          this.decode8(input[i], outI, out)
          outI += 8
          break;
        case 9:
          this.decode9(input[i], outI, out)
          outI += 7
          break;
        case 10:
          this.decode10(input[i], outI, out)
          outI += 6
          break;
        case 11:
          this.decode11(input[i], outI, out)
          outI += 5
          break;
        case 12:
          this.decode12(input[i], outI, out)
          outI += 4
          break;
        case 13:
          this.decode13(input[i], outI, out)
          outI += 3
          break;
        case 14: 
          this.decode14(input[i], outI, out)
          outI += 2
          break;
        case 15:
          this.decode15(input[i], outI, out)
          outI++
          break;
        default:
          throw new Error("An invalid selector was given: " + selector)
      }
    }
    return out
  }

  private static bits(input: bigint): number {
    const asString = input.toString(2)
    if (asString == '0') return 0;
    if (asString.charAt(0) === '-') return 64
    return asString.length;
  }

  public static readSelector(long: bigint): number {
    const selector: bigint = long >> 60n;
    return Number(selector)
  }

  private static encode0(outIndex: number, output: bigint[]): void {
    const encoded: bigint = 0n
    output[outIndex] = encoded
  }

  private static encode1(outIndex: number, output: bigint[]): void {
    const encoded: bigint = 1n << 60n
    output[outIndex] = encoded;
  }

  private static encode2(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 2n << 60n
    encoded |= input[inputIndex] << 59n
    encoded |= input[inputIndex + 1] << 58n
    encoded |= input[inputIndex + 2] << 57n
    encoded |= input[inputIndex + 3] << 56n
    encoded |= input[inputIndex + 4] << 55n
    encoded |= input[inputIndex + 5] << 54n
    encoded |= input[inputIndex + 6] << 53n
    encoded |= input[inputIndex + 7] << 52n
    encoded |= input[inputIndex + 8] << 51n
    encoded |= input[inputIndex + 9] << 50n
    encoded |= input[inputIndex + 10] << 49n
    encoded |= input[inputIndex + 11] << 48n
    encoded |= input[inputIndex + 12] << 47n
    encoded |= input[inputIndex + 13] << 46n
    encoded |= input[inputIndex + 14] << 45n
    encoded |= input[inputIndex + 15] << 44n
    encoded |= input[inputIndex + 16] << 43n
    encoded |= input[inputIndex + 17] << 42n
    encoded |= input[inputIndex + 18] << 41n
    encoded |= input[inputIndex + 19] << 40n
    encoded |= input[inputIndex + 20] << 39n
    encoded |= input[inputIndex + 21] << 38n
    encoded |= input[inputIndex + 22] << 37n
    encoded |= input[inputIndex + 23] << 36n
    encoded |= input[inputIndex + 24] << 35n
    encoded |= input[inputIndex + 25] << 34n
    encoded |= input[inputIndex + 26] << 33n
    encoded |= input[inputIndex + 27] << 32n
    encoded |= input[inputIndex + 28] << 31n
    encoded |= input[inputIndex + 29] << 30n
    encoded |= input[inputIndex + 30] << 29n
    encoded |= input[inputIndex + 31] << 28n
    encoded |= input[inputIndex + 32] << 27n
    encoded |= input[inputIndex + 33] << 26n
    encoded |= input[inputIndex + 34] << 25n
    encoded |= input[inputIndex + 35] << 24n
    encoded |= input[inputIndex + 36] << 23n
    encoded |= input[inputIndex + 37] << 22n
    encoded |= input[inputIndex + 38] << 21n
    encoded |= input[inputIndex + 39] << 20n
    encoded |= input[inputIndex + 40] << 19n
    encoded |= input[inputIndex + 41] << 18n
    encoded |= input[inputIndex + 42] << 17n
    encoded |= input[inputIndex + 43] << 16n
    encoded |= input[inputIndex + 44] << 15n
    encoded |= input[inputIndex + 45] << 14n
    encoded |= input[inputIndex + 46] << 13n
    encoded |= input[inputIndex + 47] << 12n
    encoded |= input[inputIndex + 48] << 11n
    encoded |= input[inputIndex + 49] << 10n
    encoded |= input[inputIndex + 50] << 9n
    encoded |= input[inputIndex + 51] << 8n
    encoded |= input[inputIndex + 52] << 7n
    encoded |= input[inputIndex + 53] << 6n
    encoded |= input[inputIndex + 54] << 5n
    encoded |= input[inputIndex + 55] << 4n
    encoded |= input[inputIndex + 56] << 3n
    encoded |= input[inputIndex + 57] << 2n
    encoded |= input[inputIndex + 58] << 1n
    encoded |= input[inputIndex + 59]
    output[outIndex] = encoded;
}

private static encode3(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 3n << 60n
    encoded |= input[inputIndex] << 58n
    encoded |= input[inputIndex + 1] << 56n
    encoded |= input[inputIndex + 2] << 54n
    encoded |= input[inputIndex + 3] << 52n
    encoded |= input[inputIndex + 4] << 50n
    encoded |= input[inputIndex + 5] << 48n
    encoded |= input[inputIndex + 6] << 46n
    encoded |= input[inputIndex + 7] << 44n
    encoded |= input[inputIndex + 8] << 42n
    encoded |= input[inputIndex + 9] << 40n
    encoded |= input[inputIndex + 10] << 38n
    encoded |= input[inputIndex + 11] << 36n
    encoded |= input[inputIndex + 12] << 34n
    encoded |= input[inputIndex + 13] << 32n
    encoded |= input[inputIndex + 14] << 30n
    encoded |= input[inputIndex + 15] << 28n
    encoded |= input[inputIndex + 16] << 26n
    encoded |= input[inputIndex + 17] << 24n
    encoded |= input[inputIndex + 18] << 22n
    encoded |= input[inputIndex + 19] << 20n
    encoded |= input[inputIndex + 20] << 18n
    encoded |= input[inputIndex + 21] << 16n
    encoded |= input[inputIndex + 22] << 14n
    encoded |= input[inputIndex + 23] << 12n
    encoded |= input[inputIndex + 24] << 10n
    encoded |= input[inputIndex + 25] << 8n
    encoded |= input[inputIndex + 26] << 6n
    encoded |= input[inputIndex + 27] << 4n
    encoded |= input[inputIndex + 28] << 2n
    encoded |= input[inputIndex + 29]
    output[outIndex] = encoded
  }

  private static encode4(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 4n << 60n
    encoded |= input[inputIndex] << 57n;
    encoded |= input[inputIndex + 1] << 54n;
    encoded |= input[inputIndex + 2] << 51n;
    encoded |= input[inputIndex + 3] << 48n;
    encoded |= input[inputIndex + 4] << 45n;
    encoded |= input[inputIndex + 5] << 42n;
    encoded |= input[inputIndex + 6] << 39n;
    encoded |= input[inputIndex + 7] << 36n;
    encoded |= input[inputIndex + 8] << 33n;
    encoded |= input[inputIndex + 9] << 30n;
    encoded |= input[inputIndex + 10] << 27n;
    encoded |= input[inputIndex + 11] << 24n;
    encoded |= input[inputIndex + 12] << 21n;
    encoded |= input[inputIndex + 13] << 18n;
    encoded |= input[inputIndex + 14] << 15n;
    encoded |= input[inputIndex + 15] << 12n;
    encoded |= input[inputIndex + 16] << 9n;
    encoded |= input[inputIndex + 17] << 6n;
    encoded |= input[inputIndex + 18] << 3n;
    encoded |= input[inputIndex + 19];
    output[outIndex] = encoded;
  }

  private static encode5(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 5n << 60n
    encoded |= input[inputIndex] << 56n;
    encoded |= input[inputIndex + 1] << 52n;
    encoded |= input[inputIndex + 2] << 48n;
    encoded |= input[inputIndex + 3] << 44n;
    encoded |= input[inputIndex + 4] << 40n;
    encoded |= input[inputIndex + 5] << 36n;
    encoded |= input[inputIndex + 6] << 32n;
    encoded |= input[inputIndex + 7] << 28n;
    encoded |= input[inputIndex + 8] << 24n;
    encoded |= input[inputIndex + 9] << 20n;
    encoded |= input[inputIndex + 10] << 16n;
    encoded |= input[inputIndex + 11] << 12n;
    encoded |= input[inputIndex + 12] << 8n;
    encoded |= input[inputIndex + 13] << 4n;
    encoded |= input[inputIndex + 14];
    output[outIndex] = encoded;
  }

  private static encode6(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 6n << 60n
    encoded |= input[inputIndex] << 55n;
    encoded |= input[inputIndex + 1] << 50n;
    encoded |= input[inputIndex + 2] << 45n;
    encoded |= input[inputIndex + 3] << 40n;
    encoded |= input[inputIndex + 4] << 35n;
    encoded |= input[inputIndex + 5] << 30n;
    encoded |= input[inputIndex + 6] << 25n;
    encoded |= input[inputIndex + 7] << 20n;
    encoded |= input[inputIndex + 8] << 15n;
    encoded |= input[inputIndex + 9] << 10n;
    encoded |= input[inputIndex + 10] << 5n;
    encoded |= input[inputIndex + 11];
    output[outIndex] = encoded;
  }

  private static encode7(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 7n << 60n
    encoded |= input[inputIndex] << 54n;
    encoded |= input[inputIndex + 1] << 48n;
    encoded |= input[inputIndex + 2] << 42n;
    encoded |= input[inputIndex + 3] << 36n;
    encoded |= input[inputIndex + 4] << 30n;
    encoded |= input[inputIndex + 5] << 24n;
    encoded |= input[inputIndex + 6] << 18n;
    encoded |= input[inputIndex + 7] << 12n;
    encoded |= input[inputIndex + 8] << 6n;
    encoded |= input[inputIndex + 9];
    output[outIndex] = encoded;
  }

  private static encode8(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 8n << 60n
    encoded |= input[inputIndex] << 49n;
    encoded |= input[inputIndex + 1] << 42n;
    encoded |= input[inputIndex + 2] << 35n;
    encoded |= input[inputIndex + 3] << 28n;
    encoded |= input[inputIndex + 4] << 21n;
    encoded |= input[inputIndex + 5] << 14n;
    encoded |= input[inputIndex + 6] << 7n;
    encoded |= input[inputIndex + 7];
    output[outIndex] = encoded;
  }

  private static encode9(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 9n << 60n
    encoded |= input[inputIndex] << 48n;
    encoded |= input[inputIndex + 1] << 40n;
    encoded |= input[inputIndex + 2] << 32n;
    encoded |= input[inputIndex + 3] << 24n;
    encoded |= input[inputIndex + 4] << 16n;
    encoded |= input[inputIndex + 5] << 8n;
    encoded |= input[inputIndex + 6];
    output[outIndex] = encoded;
  }

  private static encode10(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 10n << 60n
    encoded |= input[inputIndex] << 50n;
    encoded |= input[inputIndex + 1] << 40n;
    encoded |= input[inputIndex + 2] << 30n;
    encoded |= input[inputIndex + 3] << 20n;
    encoded |= input[inputIndex + 4] << 10n;
    encoded |= input[inputIndex + 5];
    output[outIndex] = encoded;
  }

  private static encode11(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 11n << 60n
    encoded |= input[inputIndex] << 48n;
    encoded |= input[inputIndex + 1] << 36n;
    encoded |= input[inputIndex + 2] << 24n;
    encoded |= input[inputIndex + 3] << 12n;
    encoded |= input[inputIndex + 4];
    output[outIndex] = encoded;
  }

  private static encode12(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 12n << 60n;
    encoded |= input[inputIndex] << 45n;
    encoded |= input[inputIndex + 1] << 30n;
    encoded |= input[inputIndex + 2] << 15n;
    encoded |= input[inputIndex + 3];
    output[outIndex] = encoded;
  }

  private static encode13(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 13n << 60n
    encoded |= input[inputIndex] << 40n;
    encoded |= input[inputIndex + 1] << 20n;
    encoded |= input[inputIndex + 2];
    output[outIndex] = encoded;
  }

  private static encode14(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 14n << 60n
    encoded |= input[inputIndex] << 30n;
    encoded |= input[inputIndex + 1];
    output[outIndex] = encoded;
  }

  private static encode15(inputIndex: number, input: bigint[], outIndex: number, output: bigint[]): void {
    let encoded: bigint = 15n << 60n
    encoded |= input[inputIndex];
    output[outIndex] = encoded;
  }

  private static decode0(outIndex: number, output: bigint[]) {
    for (let i = outIndex; i < outIndex + 240; i++) {
      output[i] = 0n;
    }
  }

  private static decode1(outIndex: number, output: bigint[]) {
    for (let i = outIndex; i < outIndex + 120; i++) {
      output[i] = 0n;
    }
  }

  private static decode2(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 59n) & 1n;
    output[outIndex + 1] = (val >> 58n) & 1n;
    output[outIndex + 2] = (val >> 57n) & 1n;
    output[outIndex + 3] = (val >> 56n) & 1n;
    output[outIndex + 4] = (val >> 55n) & 1n;
    output[outIndex + 5] = (val >> 54n) & 1n;
    output[outIndex + 6] = (val >> 53n) & 1n;
    output[outIndex + 7] = (val >> 52n) & 1n;
    output[outIndex + 8] = (val >> 51n) & 1n;
    output[outIndex + 9] = (val >> 50n) & 1n;
    output[outIndex + 10] = (val >> 49n) & 1n;
    output[outIndex + 11] = (val >> 48n) & 1n;
    output[outIndex + 12] = (val >> 47n) & 1n;
    output[outIndex + 13] = (val >> 46n) & 1n;
    output[outIndex + 14] = (val >> 45n) & 1n;
    output[outIndex + 15] = (val >> 44n) & 1n;
    output[outIndex + 16] = (val >> 43n) & 1n;
    output[outIndex + 17] = (val >> 42n) & 1n;
    output[outIndex + 18] = (val >> 41n) & 1n;
    output[outIndex + 19] = (val >> 40n) & 1n;
    output[outIndex + 20] = (val >> 39n) & 1n;
    output[outIndex + 21] = (val >> 38n) & 1n;
    output[outIndex + 22] = (val >> 37n) & 1n;
    output[outIndex + 23] = (val >> 36n) & 1n;
    output[outIndex + 24] = (val >> 35n) & 1n;
    output[outIndex + 25] = (val >> 34n) & 1n;
    output[outIndex + 26] = (val >> 33n) & 1n;
    output[outIndex + 27] = (val >> 32n) & 1n;
    output[outIndex + 28] = (val >> 31n) & 1n;
    output[outIndex + 29] = (val >> 30n) & 1n;
    output[outIndex + 30] = (val >> 29n) & 1n;
    output[outIndex + 31] = (val >> 28n) & 1n;
    output[outIndex + 32] = (val >> 27n) & 1n;
    output[outIndex + 33] = (val >> 26n) & 1n;
    output[outIndex + 34] = (val >> 25n) & 1n;
    output[outIndex + 35] = (val >> 24n) & 1n;
    output[outIndex + 36] = (val >> 23n) & 1n;
    output[outIndex + 37] = (val >> 22n) & 1n;
    output[outIndex + 38] = (val >> 21n) & 1n;
    output[outIndex + 39] = (val >> 20n) & 1n;
    output[outIndex + 40] = (val >> 19n) & 1n;
    output[outIndex + 41] = (val >> 18n) & 1n;
    output[outIndex + 42] = (val >> 17n) & 1n;
    output[outIndex + 43] = (val >> 16n) & 1n;
    output[outIndex + 44] = (val >> 15n) & 1n;
    output[outIndex + 45] = (val >> 14n) & 1n;
    output[outIndex + 46] = (val >> 13n) & 1n;
    output[outIndex + 47] = (val >> 12n) & 1n;
    output[outIndex + 48] = (val >> 11n) & 1n;
    output[outIndex + 49] = (val >> 10n) & 1n;
    output[outIndex + 50] = (val >> 9n) & 1n;
    output[outIndex + 51] = (val >> 8n) & 1n;
    output[outIndex + 52] = (val >> 7n) & 1n;
    output[outIndex + 53] = (val >> 6n) & 1n;
    output[outIndex + 54] = (val >> 5n) & 1n;
    output[outIndex + 55] = (val >> 4n) & 1n;
    output[outIndex + 56] = (val >> 3n) & 1n;
    output[outIndex + 57] = (val >> 2n) & 1n;
    output[outIndex + 58] = (val >> 1n) & 1n;
    output[outIndex + 59] = (val) & 1n;
  }

  private static decode3(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 58n) & 3n;
    output[outIndex + 1] = (val >> 56n) & 3n;
    output[outIndex + 2] = (val >> 54n) & 3n;
    output[outIndex + 3] = (val >> 52n) & 3n;
    output[outIndex + 4] = (val >> 50n) & 3n;
    output[outIndex + 5] = (val >> 48n) & 3n;
    output[outIndex + 6] = (val >> 46n) & 3n;
    output[outIndex + 7] = (val >> 44n) & 3n;
    output[outIndex + 8] = (val >> 42n) & 3n;
    output[outIndex + 9] = (val >> 40n) & 3n;
    output[outIndex + 10] = (val >> 38n) & 3n;
    output[outIndex + 11] = (val >> 36n) & 3n;
    output[outIndex + 12] = (val >> 34n) & 3n;
    output[outIndex + 13] = (val >> 32n) & 3n;
    output[outIndex + 14] = (val >> 30n) & 3n;
    output[outIndex + 15] = (val >> 28n) & 3n;
    output[outIndex + 16] = (val >> 26n) & 3n;
    output[outIndex + 17] = (val >> 24n) & 3n;
    output[outIndex + 18] = (val >> 22n) & 3n;
    output[outIndex + 19] = (val >> 20n) & 3n;
    output[outIndex + 20] = (val >> 18n) & 3n;
    output[outIndex + 21] = (val >> 16n) & 3n;
    output[outIndex + 22] = (val >> 14n) & 3n;
    output[outIndex + 23] = (val >> 12n) & 3n;
    output[outIndex + 24] = (val >> 10n) & 3n;
    output[outIndex + 25] = (val >> 8n) & 3n;
    output[outIndex + 26] = (val >> 6n) & 3n;
    output[outIndex + 27] = (val >> 4n) & 3n;
    output[outIndex + 28] = (val >> 2n) & 3n;
    output[outIndex + 29] = (val) & 3n;
  }

  private static decode4(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 57n) & 7n;
    output[outIndex + 1] = (val >> 54n) & 7n;
    output[outIndex + 2] = (val >> 51n) & 7n;
    output[outIndex + 3] = (val >> 48n) & 7n;
    output[outIndex + 4] = (val >> 45n) & 7n;
    output[outIndex + 5] = (val >> 42n) & 7n;
    output[outIndex + 6] = (val >> 39n) & 7n;
    output[outIndex + 7] = (val >> 36n) & 7n;
    output[outIndex + 8] = (val >> 33n) & 7n;
    output[outIndex + 9] = (val >> 30n) & 7n;
    output[outIndex + 10] = (val >> 27n) & 7n;
    output[outIndex + 11] = (val >> 24n) & 7n;
    output[outIndex + 12] = (val >> 21n) & 7n;
    output[outIndex + 13] = (val >> 18n) & 7n;
    output[outIndex + 14] = (val >> 15n) & 7n;
    output[outIndex + 15] = (val >> 12n) & 7n;
    output[outIndex + 16] = (val >> 9n) & 7n;
    output[outIndex + 17] = (val >> 6n) & 7n;
    output[outIndex + 18] = (val >> 3n) & 7n;
    output[outIndex + 19] = (val) & 7n;
  }

  private static decode5(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 56n) & 15n;
    output[outIndex + 1] = (val >> 52n) & 15n;
    output[outIndex + 2] = (val >> 48n) & 15n;
    output[outIndex + 3] = (val >> 44n) & 15n;
    output[outIndex + 4] = (val >> 40n) & 15n;
    output[outIndex + 5] = (val >> 36n) & 15n;
    output[outIndex + 6] = (val >> 32n) & 15n;
    output[outIndex + 7] = (val >> 28n) & 15n;
    output[outIndex + 8] = (val >> 24n) & 15n;
    output[outIndex + 9] = (val >> 20n) & 15n;
    output[outIndex + 10] = (val >> 16n) & 15n;
    output[outIndex + 11] = (val >> 12n) & 15n;
    output[outIndex + 12] = (val >> 8n) & 15n;
    output[outIndex + 13] = (val >> 4n) & 15n;
    output[outIndex + 14] = (val) & 15n;
  }

  private static decode6(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 55n) & 31n;
    output[outIndex + 1] = (val >> 50n) & 31n;
    output[outIndex + 2] = (val >> 45n) & 31n;
    output[outIndex + 3] = (val >> 40n) & 31n;
    output[outIndex + 4] = (val >> 35n) & 31n;
    output[outIndex + 5] = (val >> 30n) & 31n;
    output[outIndex + 6] = (val >> 25n) & 31n;
    output[outIndex + 7] = (val >> 20n) & 31n;
    output[outIndex + 8] = (val >> 15n) & 31n;
    output[outIndex + 9] = (val >> 10n) & 31n;
    output[outIndex + 10] = (val >> 5n) & 31n;
    output[outIndex + 11] = (val) & 31n;
  }

  private static decode7(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 54n) & 63n;
    output[outIndex + 1] = (val >> 48n) & 63n;
    output[outIndex + 2] = (val >> 42n) & 63n;
    output[outIndex + 3] = (val >> 36n) & 63n;
    output[outIndex + 4] = (val >> 30n) & 63n;
    output[outIndex + 5] = (val >> 24n) & 63n;
    output[outIndex + 6] = (val >> 18n) & 63n;
    output[outIndex + 7] = (val >> 12n) & 63n;
    output[outIndex + 8] = (val >> 6n) & 63n;
    output[outIndex + 9] = (val) & 63n;
  }

  private static decode8(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 49n) & 127n;
    output[outIndex + 1] = (val >> 42n) & 127n;
    output[outIndex + 2] = (val >> 35n) & 127n;
    output[outIndex + 3] = (val >> 28n) & 127n;
    output[outIndex + 4] = (val >> 21n) & 127n;
    output[outIndex + 5] = (val >> 14n) & 127n;
    output[outIndex + 6] = (val >> 7n) & 127n;
    output[outIndex + 7] = (val) & 127n;
  }

  private static decode9(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 48n) & 255n;
    output[outIndex + 1] = (val >> 40n) & 255n;
    output[outIndex + 2] = (val >> 32n) & 255n;
    output[outIndex + 3] = (val >> 24n) & 255n;
    output[outIndex + 4] = (val >> 16n) & 255n;
    output[outIndex + 5] = (val >> 8n) & 255n;
    output[outIndex + 6] = (val) & 255n;
  }

  private static decode10(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 50n) & 1023n;
    output[outIndex + 1] = (val >> 40n) & 1023n;
    output[outIndex + 2] = (val >> 30n) & 1023n;
    output[outIndex + 3] = (val >> 20n) & 1023n;
    output[outIndex + 4] = (val >> 10n) & 1023n;
    output[outIndex + 5] = (val) & 1023n;
  }

  
  private static decode11(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 48n) & 4095n;
    output[outIndex + 1] = (val >> 36n) & 4095n;
    output[outIndex + 2] = (val >> 24n) & 4095n;
    output[outIndex + 3] = (val >> 12n) & 4095n;
    output[outIndex + 4] = (val) & 4095n;
  }

  private static decode12(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 45n) & 32767n;
    output[outIndex + 1] = (val >> 30n) & 32767n;
    output[outIndex + 2] = (val >> 15n) & 32767n;
    output[outIndex + 3] = (val) & 32767n;
  }

  private static decode13(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 40n) & 1048575n;
    output[outIndex + 1] = (val >> 20n) & 1048575n;
    output[outIndex + 2] = (val) & 1048575n;
  }

  private static decode14(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = (val >> 30n) & 1073741823n;
    output[outIndex + 1] = (val) & 1073741823n;
  }

  private static decode15(val: bigint, outIndex: number, output: bigint[]) {
    output[outIndex] = val & 1152921504606846975n;
  }
}
