define([
	'level/geometry/Line',
	'level/geometry/Point'
], function(
	Line,
	Point
) {
	function Level() {
		this._geometry = [];
	}
	Level.prototype.findAllCollisionsWithEntity = function(entity) {
		var collisions = [];
		for(var i = 0; i < this._geometry.length; i++) {
			if(this._geometry[i].canCollideWithEntity(entity)) {
				var collision = this._geometry[i].checkForCollisionWithEntity(entity);
				if(collision) {
					collisions.push(collision);
				}
			}
		}
		return collisions;
	};
	Level.prototype.addPoint = function(x, y, params) {
		//find the point closest to where we're trying to add one
		var closestPoint = null;
		var distToClosestPoint = null;
		for(var i = 0; i < this._geometry.length; i++) {
			if(this._geometry[i].levelGeomType === 'Point') {
				var dist = this._geometry[i].pos.squareDistance(x, y);
				if(distToClosestPoint === null || dist < distToClosestPoint) {
					closestPoint = this._geometry[i];
					distToClosestPoint = dist;
				}
			}
		}

		//don't create a new point if there's one really close to where we're trying to make one
		if(closestPoint !== null && distToClosestPoint < 0.4 * 0.4) {
			return closestPoint;
		}

		//otherwise create a new point
		else {
			var point = new Point(x, y, params);
			this._geometry.push(point);
			return point;
		}
	};
	Level.prototype.addLine = function(x1, y1, x2, y2, params) {
		var point1 = this.addPoint(x1, y1, params);
		var point2 = this.addPoint(x2, y2, params);
		var line = new Line(point1.pos.x, point1.pos.y, point2.pos.x, point2.pos.y, params);
		this._geometry.push(line);
		return line;
	};
	Level.prototype.addPoly = function(points, params) {
		for(var i = 0; i < points.length - 2; i += 2) {
			this.addLine(points[i+0], points[i+1], points[i+2], points[i+3], params);
		}
		if(!params || params.closed !== false) {
			this.addLine(points[points.length-2], points[points.length-1], points[0], points[1], params);
		}
	};
	Level.prototype.render = function(ctx, camera) {
		for(var i = 0; i < this._geometry.length; i++) {
			this._geometry[i].render(ctx, camera);
		}
	};
	return Level;
});