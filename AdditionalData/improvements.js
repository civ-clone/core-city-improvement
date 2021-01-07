"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const CityImprovementRegistry_1 = require("../CityImprovementRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const City_1 = require("@civ-clone/core-city/City");
const getAdditionalData = (cityImprovementRegistry = CityImprovementRegistry_1.instance) => [
    new AdditionalData_1.default(City_1.default, 'improvements', (city) => cityImprovementRegistry.getByCity(city)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=improvements.js.map