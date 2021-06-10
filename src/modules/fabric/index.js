import { fabric } from "fabric";

fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";

fabric.LineArrow = fabric.util.createClass(fabric.Line, {
  type: "lineArrow",
  initialize: function (el, options) {
    options || (options = {});

    this.callSuper("initialize", el, options);
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"));
  },
  _render: function (ctx) {
    this.callSuper("_render", ctx);

    if (this.width === 0 || this.height === 0 || !this.visible) return;

    ctx.save();

    var xDiff = this.x2 - this.x1;
    var yDiff = this.y2 - this.y1;
    var angle = Math.atan2(yDiff, xDiff);
    var d = (Math.sqrt(3) / 2) * this.strokeWidth;
    var arrowx = this.x2 + (this.destCurve.a / 2) * Math.cos(angle);
    var arrowy = this.y2 + (this.destCurve.b / 2) * Math.sin(angle);
    var arrow = Math.sqrt((arrowx - this.x2) ** 2 + (arrowy - this.y2) ** 2);

    ctx.translate(xDiff / 2, yDiff / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(d - arrow, 0);
    ctx.lineTo(-3 * d - arrow, (5 / 2) * d);
    ctx.lineTo(-3 * d - arrow, (-5 / 2) * d);
    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();

    ctx.restore();
  },
});

fabric.LineArrow.fromObject = function (object, callback) {
  callback &&
    callback(
      new fabric.LineArrow([object.x1, object.y1, object.x2, object.y2], object)
    );
};

fabric.LineArrow.async = true;

export default fabric;
