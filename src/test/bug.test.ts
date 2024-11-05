import { Schema, SchemaContext } from "@itwin/ecschema-metadata";
import { describe, it, expect } from "vitest";

export function createSchemaJsonWithItems(itemsJson: any, referenceJson?: any): any {
	return {
		$schema: "https://dev.bentley.com/json_schemas/ec/32/ecschema",
		name: "TestSchema",
		version: "1.2.3",
		items: {
			...itemsJson,
		},
		...referenceJson,
	};
}

describe("OIJTOIJ", () => {
	function createSchemaJson(unitJson: any): any {
		return createSchemaJsonWithItems({
			TestUnit: {
				schemaItemType: "Unit",
				...unitJson,
			},
			TestPhenomenon: {
				schemaItemType: "Phenomenon",
				definition: "LENGTH(1)",
			},
			TestUnitSystem: {
				schemaItemType: "UnitSystem",
			},
		});
	}

	it("async - should throw for invalid unit system", async () => {
		const invalidUnitSystemJson = {
			unitSystem: 5,
			phenomenon: "TestSchema.TestPhenomenon",
			definition: "[MILLI]*Units.M",
		};
		await expect(Schema.fromJson(createSchemaJson(invalidUnitSystemJson), new SchemaContext())).rejects.toThrowError();
		await Promise.resolve();
	});
});
