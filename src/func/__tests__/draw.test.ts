/**
 * @jest-environment jsdom
 */
import type { Shape } from "../../shapes";

import { drawShape, selectShape } from "../draw";

const circle: Shape = {
  id: "V1StGXR8_Z5jdHi6",
  radius: 5,
  point: {
    x: 2,
    y: 3,
  },
  color: "black",
  isSelected: false,
  isHighlighted: false,
};

const rect: Shape = {
  id: "jdHi6B-myTV1StGX",
  point: {
    x: 5,
    y: 10,
  },
  width: 4,
  height: 8,
  color: "black",
  isSelected: false,
  isHighlighted: false,
};

describe("drawShape", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(function () {
    canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    if (!c) throw new Error("context was not mocked");

    ctx = c;
  });

  describe("circle", () => {
    it("calls fillStyle method first", () => {
      expect.assertions(1);

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[0]["type"]).toBe("fillStyle");
    });

    it("calls beginPath method second", () => {
      expect.assertions(1);

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[1]["type"]).toBe("beginPath");
    });

    it("calls arc method third", () => {
      expect.assertions(1);

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[2]["type"]).toBe("arc");
    });

    it("calls arc method with expected props", () => {
      expect.assertions(1);

      const expected = {
        x: circle.point.x,
        y: circle.point.y,
        radius: circle.radius,
        startAngle: 0,
        endAngle: 6.283185307179586,
        anticlockwise: true,
      };

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[2]["props"]).toStrictEqual(expected);
    });

    it("calls fill method last", () => {
      expect.assertions(1);

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[events.length - 1]["type"]).toBe("fill");
    });

    it("calls ctx four times when drawing a circle", () => {
      expect.assertions(1);

      drawShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events).toHaveLength(4);
    });
  });

  describe("rectangle", () => {
    it("calls fillStyle method first when drawing a rectangle", () => {
      expect.assertions(1);

      drawShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[0]["type"]).toBe("fillStyle");
    });

    it("calls fillRect method second when drawing a rect", () => {
      expect.assertions(1);

      drawShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[1]["type"]).toBe("fillRect");
    });

    it("calls fillRect method with expected props when drawing a rect", () => {
      expect.assertions(1);

      const expected = {
        height: rect.height,
        width: rect.width,
        ...rect.point,
      };

      drawShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[1]["props"]).toStrictEqual(expected);
    });

    it("calls ctx twice when drawing a rectangle", () => {
      expect.assertions(1);

      drawShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events).toHaveLength(2);
    });
  });
});

describe("selectShape", () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(function () {
    canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    if (!c) throw new Error("context was not mocked");

    ctx = c;
  });

  describe("circle", () => {
    it("calls strokeStyle method first", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[0]["type"]).toBe("strokeStyle");
    });

    it("calls lineWidth method second", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[1]["type"]).toBe("lineWidth");
    });

    it("calls beginPath method third", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[2]["type"]).toBe("beginPath");
    });

    it("calls arc method fourth", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[3]["type"]).toBe("arc");
    });

    it("calls arc method with expected props", () => {
      expect.assertions(1);

      const expected = {
        radius: circle.radius * 2,
        x: circle.point.x,
        y: circle.point.y,
        startAngle: 0,
        anticlockwise: true,
        endAngle: 6.283185307179586,
      };

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[3]["props"]).toStrictEqual(expected);
    });

    it("calls stroke method last", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[events.length - 1]["type"]).toBe("stroke");
    });

    it("calls context five times", () => {
      expect.assertions(1);

      selectShape(ctx, circle);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events).toHaveLength(5);
    });
  });

  describe("rectangle", () => {
    it("calls strokeStyle method first", () => {
      expect.assertions(1);

      selectShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[0]["type"]).toBe("strokeStyle");
    });

    it("calls lineWidth method second", () => {
      expect.assertions(1);

      selectShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[1]["type"]).toBe("lineWidth");
    });

    it("calls strokeRect method last", () => {
      expect.assertions(1);

      selectShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[events.length - 1]["type"]).toBe("strokeRect");
    });

    it("calls strokeRect method with expected props", () => {
      expect.assertions(1);

      const expected = {
        height: rect.height,
        width: rect.width,
        ...rect.point,
      };

      selectShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events[events.length - 1]["props"]).toStrictEqual(expected);
    });

    it("calls context thrice", () => {
      expect.assertions(1);

      selectShape(ctx, rect);

      // @ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: any[] = ctx.__getEvents();

      expect(events).toHaveLength(3);
    });
  });
});
