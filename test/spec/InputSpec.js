describe("Input Fields", function() {

	var form,
	data;

	beforeEach(function() {
		form = $("#form");
		data = $("#form").formalizeData();
	});

	it("Should grab the form the user wants and return a data item", function() {
		expect(typeof(form.formalizeData())).toEqual("object");
	});

	it("Should grab the value of a text field", function() {
		expect(data.textfield).toEqual("asdf");
	});

	it("Should turn multiple inputs with the same name into an array", function() {
		expect($.isArray(data.arraytext)).toBeTruthy();
		expect(data.arraytext.length).toEqual(3);
	});

	it("should let you nest data", function() {
		expect($.isPlainObject(data.nested)).toBeTruthy();
		expect(data.nested.text).toEqual("asdf");
	});

	it("Should handle arrays within nested data", function() {
		expect($.isArray(data.nested.array)).toBeTruthy();
		expect(data.nested.array.length).toEqual(2);
	});

	it("Should let me nest data very deeply", function() {
		expect(data.nested.deep.deep.level).toEqual("asdf");
	});

	it("Should let me specify if my input should be an integer", function() {
		expect(typeof(data.number)).toEqual("number");
	});

	it("Should throw an exception if you tell it to do a number but don't give it one", function() {
		var errors = 0,
			error;
		try {
			$("#evil-form-number").formalizeData();
		} catch (err) {
			errors = 1;
			error = err;
		}
		expect(errors).toEqual(1);
		expect(error).toEqual("Expected a number!");
	});

	it("Should skip inputs without the name field", function() {
		var data = $("#evil-form-name").formalizeData();
		expect(data).toEqual({});
	});

	it("Should let you define your own formats", function() {
		var customForm = $("#custom-formats");
		$.formalizeFormat("custom", function(value) {return 1;} );
		customForm.append("<input name='custom-field' value='asdf' data-formalize='custom'></input>");
		var customData = customForm.formalizeData();
		expect(customData["custom-field"]).toEqual(1);
	});

	it("Should let you specify your own name attribute", function() {
		var customForm = $("#custom-name");
		var data = customForm.formalizeData({attribute: "data-custom-name"});
		expect(data.name).toEqual("ryan");
	});

	it("Should understand how to parse bracket style names as well", function() {
		var bracketForm = $("#bracket-style");
		var data = bracketForm.formalizeData();
		expect(data.person.name).toEqual("Ryan");
	});

});
