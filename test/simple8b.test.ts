import Simple8B from "../src/simple8b"
import { faker } from '@faker-js/faker';

const generateValues = (n: number, bits: number): bigint[] => {
  const out: bigint[] = []
  const max = (2n**BigInt(bits))-1n
  for (let i = 0; i < n; i++) {
    out[i] = faker.datatype.bigInt({min: 0, max})
  }
  out[0] = BigInt(max)
  return out;
}


it("Should have the correct selector", () => {
  const t0 = generateValues(240, 0)
  const t1 = generateValues(120, 0)
  const t2 = generateValues(60, 1)
  const t3 = generateValues(30, 2)
  const t4 = generateValues(20, 3)
  const t5 = generateValues(15, 4)
  const t6 = generateValues(12, 5)
  const t7 = generateValues(10, 6)
  const t8 = generateValues(8, 7)
  const t9 = generateValues(7, 8)
  const t10 = generateValues(6, 10)
  const t11 = generateValues(5, 12)
  const t12 = generateValues(4, 15)
  const t13 = generateValues(3, 20)
  const t14 = generateValues(2, 30)
  const t15 = generateValues(1, 60)

  expect(Simple8B.readSelector(Simple8B.compress(t0)[0])).toBe(0)
  expect(Simple8B.readSelector(Simple8B.compress(t1)[0])).toBe(1)
  expect(Simple8B.readSelector(Simple8B.compress(t2)[0])).toBe(2)
  expect(Simple8B.readSelector(Simple8B.compress(t3)[0])).toBe(3)
  expect(Simple8B.readSelector(Simple8B.compress(t4)[0])).toBe(4)
  expect(Simple8B.readSelector(Simple8B.compress(t5)[0])).toBe(5)
  expect(Simple8B.readSelector(Simple8B.compress(t6)[0])).toBe(6)
  expect(Simple8B.readSelector(Simple8B.compress(t7)[0])).toBe(7)
  expect(Simple8B.readSelector(Simple8B.compress(t8)[0])).toBe(8)
  expect(Simple8B.readSelector(Simple8B.compress(t9)[0])).toBe(9)
  expect(Simple8B.readSelector(Simple8B.compress(t10)[0])).toBe(10)
  expect(Simple8B.readSelector(Simple8B.compress(t11)[0])).toBe(11)
  expect(Simple8B.readSelector(Simple8B.compress(t12)[0])).toBe(12)
  expect(Simple8B.readSelector(Simple8B.compress(t13)[0])).toBe(13)
  expect(Simple8B.readSelector(Simple8B.compress(t14)[0])).toBe(14)
  expect(Simple8B.readSelector(Simple8B.compress(t15)[0])).toBe(15)
})

it("Should decompress to the given values", () => {
  const t0 = generateValues(240, 0)
  const t0dc = Simple8B.decompress(Simple8B.compress(t0)) 
  const t1 = generateValues(120, 0)
  const t1dc = Simple8B.decompress(Simple8B.compress(t1)) 
  const t2 = generateValues(60, 1)
  const t2dc = Simple8B.decompress(Simple8B.compress(t2)) 
  const t3 = generateValues(30, 2)
  const t3dc = Simple8B.decompress(Simple8B.compress(t3)) 
  const t4 = generateValues(20, 3)
  const t4dc = Simple8B.decompress(Simple8B.compress(t4)) 
  const t5 = generateValues(15, 4)
  const t5dc = Simple8B.decompress(Simple8B.compress(t5)) 
  const t6 = generateValues(12, 5)
  const t6dc = Simple8B.decompress(Simple8B.compress(t6)) 
  const t7 = generateValues(10, 6)
  const t7dc = Simple8B.decompress(Simple8B.compress(t7)) 
  const t8 = generateValues(8, 7)
  const t8dc = Simple8B.decompress(Simple8B.compress(t8)) 
  const t9 = generateValues(7, 8)
  const t9dc = Simple8B.decompress(Simple8B.compress(t9)) 
  const t10 = generateValues(6, 10)
  const t10dc = Simple8B.decompress(Simple8B.compress(t10)) 
  const t11 = generateValues(5, 12)
  const t11dc = Simple8B.decompress(Simple8B.compress(t11)) 
  const t12 = generateValues(4, 15)
  const t12dc = Simple8B.decompress(Simple8B.compress(t12)) 
  const t13 = generateValues(3, 20)
  const t13dc = Simple8B.decompress(Simple8B.compress(t13)) 
  const t14 = generateValues(2, 30)
  const t14dc = Simple8B.decompress(Simple8B.compress(t14)) 
  const t15 = generateValues(1, 60)
  const t15dc = Simple8B.decompress(Simple8B.compress(t15)) 

  for (let i = 0; i < t0.length; i++) {
    expect(t0dc[i]).toBe(t0[i])
  }
  for (let i = 0; i < t1.length; i++) {
    expect(t1dc[i]).toBe(t1[i])
  }
  for (let i = 0; i < t2.length; i++) {
    expect(t2dc[i]).toBe(t2[i])
  }
  for (let i = 0; i < t3.length; i++) {
    expect(t3dc[i]).toBe(t3[i])
  }
  for (let i = 0; i < t4.length; i++) {
    expect(t4dc[i]).toBe(t4[i])
  }
  for (let i = 0; i < t5.length; i++) {
    expect(t5dc[i]).toBe(t5[i])
  }
  for (let i = 0; i < t6.length; i++) {
    expect(t6dc[i]).toBe(t6[i])
  }
  for (let i = 0; i < t7.length; i++) {
    expect(t7dc[i]).toBe(t7[i])
  }
  for (let i = 0; i < t8.length; i++) {
    expect(t8dc[i]).toBe(t8[i])
  }
  for (let i = 0; i < t9.length; i++) {
    expect(t9dc[i]).toBe(t9[i])
  }
  for (let i = 0; i < t10.length; i++) {
    expect(t10dc[i]).toBe(t10[i])
  }
  for (let i = 0; i < t11.length; i++) {
    expect(t11dc[i]).toBe(t11[i])
  }
  for (let i = 0; i < t12.length; i++) {
    expect(t12dc[i]).toBe(t12[i])
  }
  for (let i = 0; i < t13.length; i++) {
    expect(t13dc[i]).toBe(t13[i])
  }
  for (let i = 0; i < t14.length; i++) {
    expect(t14dc[i]).toBe(t14[i])
  }
  for (let i = 0; i < t15.length; i++) {
    expect(t15dc[i]).toBe(t15[i])
  }
})

it("Should not allow negative values", () => {
  const negative: bigint = 0n - faker.datatype.bigInt()
  expect(() => Simple8B.compress([negative])).toThrowError()
})

it("Should not allow values greater than 2^60-1", () => {
  const big: bigint = 2n**60n
  expect(() => Simple8B.compress([big])).toThrowError()

})