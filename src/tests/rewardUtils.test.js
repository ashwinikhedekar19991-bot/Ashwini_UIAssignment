import { calculateRewardPoints } from "../utils/rewardUtils";

test("Below 50 = 0", () => {
  expect(calculateRewardPoints(40)).toBe(0);
});

test("70 = 20 points", () => {
  expect(calculateRewardPoints(70)).toBe(20);
});

test("120 = 90 points", () => {
  expect(calculateRewardPoints(120)).toBe(90);
});