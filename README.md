# Formalize Data
A javascript library to convert form data into a js object which can be converted to json using your favorite json library

## grabs your structure from the name of your inputs
```html
<form id="form">
	<input name="name" value="Ryan"></input>
</form>

$("#form").formalizeData();

/*
{
	name: "Ryan"
}
*/
```

## lets you nest data as deep as you want
```html
<input name="name.first" value="Ryan"></input>
<input name="name.last" value="Quinn"></input>
<input name="nested.very.very.deep" value="Hi!"></input>

/*
{
	name: {
		first: "Ryan",
		last: "Quinn"
	},
	nested: {
		very: {
			very: {
				deep: "Hi!"
			}
		}
	}
}
*/
```

## Supports Bracket Syntax as well
This is the default syntax for rails projects, for example

```html
<input name="person[first_name]" value="Ryan"></input>
<input name="person[last_name]" value="Quinn"></input>

/*
{
  person: {
	  first_name: "Ryan",
		last_name: "Quinn"
  }
}
*/
```

## converts multiple inputs into arrays
```html
<input name="tag" value="first"></input>
<input name="tag" value="second"></input>

/*
{
	tag: ["first", "second"]
}
*/
```

## Supports Radio buttons and Selects
```html
<input type="radio" name="radioButton" value="asdf" checked>
<input type="radio" name="radioButton" value="not-checked">

<select name="selectField">
	<option>Ryan</option>
	<option>Mat</option>
</select>

<select name="multipleSelect" multiple>
	<option>Ryan</option>
	<option>Mat</option>
</select>

/*
{
	radioButton: "asdf",
	selectField: "Ryan",
	multipleSelect: ["Ryan", "Mat"]
}
*/
```

## Specify the attribute to use
You can specify the attribute to use when converting to an object.  By default we'll use the name attribute.
If no attribute is given and no custom attribute is specified, the input will be skipped.
```html
<form>
	<input data-custom-name="name" value="ryan"></input>
</form>

$("form").formalizeData({attribute: "data-custom-name"});

/*

{
	name: "ryan"
}

*/
```

## Specify the type of data you want to see
```html
<input name="age" data-formalize="number" value="22"></input>

/*
{
	age: 22
}
*/
```

## Make your own formats
Custom formats allow you to define your own transformation that will happen to an input before we store it

```html
$.formalizeFormat("format-name", function(value) { return value; })
<input name="custom-format" data-formalize="format-name"></input>
```

## Contributing
Would love any and all help you feel like giving, just please:

 - Fork the repo
 - Make sure the tests pass (open the SpecRunner.html file)
 - Write tests for the functionality you want (They should fail)
 - Make them pass
 - Push to your fork and submit a pull request
