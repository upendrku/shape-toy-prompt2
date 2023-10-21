import type { Shape } from "../../shapes";

import { isPointInShape } from "../utils";

describe("isPointInShape", () => {
  describe("circle", () => {
    const circle: Shape = {
      id: "V1StGXR8_Z5jdHi6",
      radius: 2,
      point: {
        x: 8,
        y: 2,
      },
      color: "black",
      isSelected: false,
      isHighlighted: false,
    };

    it("returns false when point is outside", () => {
      expect.assertions(1);

      const result = isPointInShape({ x: 4, y: 2 }, circle);

      expect(result).toBe(false);
    });

    it("returns true when point is inside", () => {
      expect.assertions(1);

      const result = isPointInShape({ x: 9, y: 3.5 }, circle);

      expect(result).toBe(true);
    });
  });

  describe("rectangle", () => {
    const rectangle: Shape = {
      id: "jdHi6B-myTV1StGX",
      height: 2,
      width: 3,
      point: {
        x: 5.5,
        y: 1,
      },
      color: "black",
      isSelected: false,
      isHighlighted: false,
    };

    it("returns false when point is outside", () => {
      expect.assertions(1);

      const result = isPointInShape({ x: 2, y: 2 }, rectangle);

      expect(result).toBe(false);
    });

    it("returns true when point is inside", () => {
      expect.assertions(1);

      const result = isPointInShape({ x: 6, y: 2 }, rectangle);

      expect(result).toBe(true);
    });
  });
});
