var TieredRate = require('../index'),
	vows = require('vows'),
	assert = require('assert');

var suite = vows.describe('General');
suite.addBatch({
	'Test Standard Tier System': {
		topic: new TieredRate([
			{rate: 0.21, to: 150000},
			{rate: 0.17, from: 150000, to: 2000000},
			{rate: 0.11, from: 2000000}
		]),

		'can convert to tiered and back again': function (topic) {
			for (var i = 0; i < 40; i++) {
				assert.equal(topic.getOriginalPrice(topic.getTieredPrice(i * 80000)), i * 80000);
			}
		}
	},

	'Test Single Tier System': {
		topic: new TieredRate([
			{rate: 0.21}
		]),

		'can convert to tiered and back again': function (topic) {
			for (var i = 0; i < 40; i++) {
				assert.equal(topic.getOriginalPrice(topic.getTieredPrice(i * 80000)), i * 80000);
			}
		}
	},
	
	'Test Many Level Tier System': {
		topic: new TieredRate([
			{rate: 0.10, to: 9225},
			{rate: 0.15, from: 9225, to: 37450},
			{rate: 0.25, from: 37450, to: 90750},
			{rate: 0.28, from: 90750, to: 189300},
			{rate: 0.33, from: 189300, to: 411500},
			{rate: 0.35, from: 411500, to: 413200},
			{rate: 0.40, from: 413200}
		]),

		'can convert to tiered and back again': function (topic) {
			for (var i = 0; i < 100; i++) {
				assert.equal(topic.getOriginalPrice(topic.getTieredPrice(i * 5000)), i * 5000);
			}
		}
	}
});
exports.suite = suite;