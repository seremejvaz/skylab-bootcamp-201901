'use strict';
const { ValueError } = require('triviapp-errors');

function validate(params) {
	params.forEach(({ key, value, type, optional }) => {
		switch (type) {
			case String:
				if (optional && (value == null || value === '')) break;

				if (typeof value !== 'string')
					throw TypeError(`${value} is not a string`);

				if (!value.trim().length)
					throw new ValueError(`${key} is empty or blank`);

				break;
			case Boolean:
				if (optional && (value == null || value === '')) break;

				if (typeof value !== 'boolean')
					throw TypeError(`${value} is not a boolean`);

				break;
			case Number:
				if (optional && (value == null || value === '')) break;

				if (typeof value !== 'number')
					throw TypeError(`${value} is not a number`);
				break;
			case Array:
				if (optional && (value == null || value === '')) break;

				if (
					!value instanceof Array ||
					(typeof value === 'undefined' && typeof value !== 'function')
				)
					throw TypeError(`${value} is not an array`);
				break;
			case Object:
				if (optional && (value == null || value === '')) break;

				if (
					!value instanceof Object ||
					(typeof value === 'undefined' && typeof value !== 'function')
				)
					throw TypeError(`${value} is not an object`);
				break;
		}
	});
}

module.exports = validate;
