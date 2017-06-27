# Documentation (draft)

The project uses the following [boilerplate](https://github.com/chentsulin/electron-react-boilerplate).

Run in dev environment using:

```
npm run dev
```

## Form configuration file:

The form builder uses a set of configuration instructions to construct the actual form. Below you can see the properties at the root level of the configuration file and a short description.


```javascript
const cfg = {
    id:           String, // An unique identifier for the form (required)
    appRoute:     String, // The form URL (required)
    currentRoute: String, // The URL for the initial step of the form (required)
    steps:        Array   // An array of object describing each step in a form
}
```

Since the form builder uses redux the data associated with each form is saved in the state tree under the forms property. The forms property is an object that holds the data for all forms that are part of an application. See the example below:

```javascript
forms : {
    formOne: Object,
    formTwo: Object
}
```

Each property in forms corresponds to the id inside the form configuration file.

The form builder also uses react-router to allow navigation. The formRoute and initialRoute properties are used to setup react-router. Consider an example with the following values that runs on localhost:3000:

```javascript
    formRoute:    'myform',
    initialRoute: 'initialize'
```

To access the form the user has to navigate to locahost:3000/myform. This will redirect him to locahost:3000/myform/initialize. Note that the value of initialRoute must correspond to the value of a stepRoute property of a step object. In it doesn't match the value of stepRoute in any of the step configuration object the results may be unexpected. Note that accessing a form step through an URL may result in unexpected behavior. If accessed in such a manner the form doesn't guarantee if the field input to all previous steps has been validated.

### Step configuration

The step property holds an array of objects, where each object is a representation of a step within the form. The step object looks like this:

```javascript
{
    id:                String,        // An unique identifier for the step (required)
    title:             String,        // A title describing the page (required)
    stepRoute:         String,        // A unique name for the step URL (require)
    nextStep:          String | null, // The route of the step following the current step or null if this is the last 
                                      // step in the form (required)
    nextStepAlternate: Object | null, // An object that represent alternate values of nextStep, based on a number of 
                                      // conditions (optional)
    prevStep:          String | null, // The route of the step that precedes the current step or null if this is the 
                                      // first step in the form (required)
    prevStepAlternate: Object | null, // An object that represent alternate values for prevStep, based on a number of 
                                      // conditions (optional)
    fields:            Array          // An array of object describing each field in a step (required)
}
```

Each step in a given form must have an unique identifier, however multiple forms can each have a step with the same identifier. In a similar fashion the stepRoute has to be unique. Multiple identical routes will cause react-router to throw and error. Lets look at the following example:

```javascript
{
    id:                'stepOne',
    title:             'This is step one',
    stepRoute:         'stepone',
    nextStep:          'steptwo',
    nextStepAlternate: null,
    prevStep:          null,
    prevStepAlternate: null,
    fields:            [...]
}
```

Lets assume that the user is located at the step with route stepone. In this case the navigation component of the form should only show the next button. This is because the prevStep property is set to to null. Assuming all field input is valid clicking the next button in the navigation will load the step with route steptwo. The transition can be described as follows:
 
localhost:3000/{formRoute}/stepone -> localhost:3000/{formRoute}/steptwo

### Field configuration

A form step consists of one or more fields. Each field must have an unique identifier. Two fields belonging to the same step cannot have the same id. Each field must have a type property. The value of the property must belong to one of the types defined later in this section. Both of these properties are required.

```javascript
{
    ...
    fields: [
        {
            id:              String, // An unique identifier for the field (required)
            type:		     String, // A string indetifying the specific type of the field (require)
            visibilityRules: Array,  // A set of conditions that determine when the field is visible (optional)
            validationRules: Array   // A set of conditions that determine if the field's input is valid or not (optional)
        },
         {
            id:              String,
            type:		     String,
            visibilityRules: Array,
            validationRules: Array
        },
        {...}
    ]
}
```

### Currency field

type: CURRENCY_FIELD

The currency field allows the user to input a specific amount of money. The field is similar to the standard input field with type number however visializes the input data in a specific format. Check out the example below:

```javascript
{
   id: 'weeklyExpenses',
   type: 'CURRENCY_FIELD',
   label: 'Weekly expenses', // a label describing the field's purpose
   defaultValue: null        // the default value of the field as a number
}
```


#### Date field

type: DATE_FIELD

The date field allows the user to easy input a specific date.

```javascript
{
    id: 'birthday',
    type: 'DATE_FIELD',
    label: 'When are you born?', // a label describing the field's purpose
    defaultValue: null,          // the default value of the field in milliseconds
    maxDate: 1483225100000,      // the value of the latest selectable date in milliseconds 
}
```

#### Binary field

type: BINARY_FIELD

A field that allows a simple yes/no choice.

```javascript
{
    id: 'skyColor',
    label: 'Is the sky blue?',
    type: 'BINARY_FIELD',
    defaultValue: null
}
```

#### Radio group field

type: RADIO_GROUP_FIELD

The radio group field allows users to select one of multiple predifined options.

```javascript
{
    id: 'cakeType',
    type: 'RADIO_GROUP_FIELD',
    label: 'What cake do you like?', // a label describing the field's purpose
    defaultValue: null,              // the default value of the field as a string. It must match one of the options' values or it 										 // defaults to null
    options: [                       // an array containing object that represent each possible choice
        {
            label: 'Chocolate',      // a string describing the option
            value: 'Chocolate'		 // the value of the option
        },
        {
            label: 'Strawberry',      // a string describing the option
            value: 'Strawberry'		  // the value of the option
        },
        {
            label: 'Vanilla',         // a string describing the option
            value: 'Vanilla'          // the value of the option
        }
    ]
}
```

#### Label field

type: LABEL_FIELD

A field that displays a static value or information.

```javascript
{
    id: 'LABEL1',
    label: 'Types of expenses:',
    type: 'LABEL_FIELD', // a label describing the field's purpose
    defaultValue: null   // a string that can display static information
}
```

#### Divider field

type; DIVIDER_FIELD

A field with no options. It draws a line similar to HTML's hr tag.

```javascript
{
    id: 'dividerOne',
    type: 'DIVIDER_FIELD'
}
```

#### Formula field

type: FORMULA_FIELD

This field allows users to create Excel-like formulas with either the form fields or static values as operands. Field values can be accessed by writing the step id followed by a color and the field id as shown in the example below.

```javascript
{
    id: 'myFormula',
    type: 'FORMULA_FIELD',
    label: 'Formula', // a label describing the field's purpose
    formula: tag`5+5*10/2+stepone:fieldone` // a string representation of a formula
}

```

In the example a tagged template literal is used in order to take advantage of the possibility for multi line strings when it comes to complex formulas. If the configuration file must be transmitted over a network the code will need to be modified to account for it.

### Field validation

Since the form builder is designed for multi-step forms in mind it necessary for all input to be validated before a user can proceed to the next step. To that end each field in the configuration can declare the vidationRules property.

```javascript
{
   id: 'weeklyExpenses',
   type: 'CURRENCY_FIELD',
   label: 'Weekly expenses',
   defaultValue: null,
   validationRules: [...] (optional)
}
```

This property holds an array of object. Each object describes a specific condition that has to be met in order for the field to be considered valid. In order for a field to be valid all conditions have to evaluate to true. If the property is not defined or equals null the field will not be subject to validation. The actuall syntax of a condition will be described later on.

### Field visibility

The user can also define the visibilityRules property for each field. This property works in an identical way to the validationRules property. In this case however the form builder determines not if a field is valid, but if a field should be visible to the user or not. Oncea again the property is an array, which holds objects that describe conditions. All conditions have to evaluate to true in order for the field to be visible to the user. if the property is not defined or equals null then the field will be visibile.

```javascript
{
   id: 'weeklyExpenses',
   type: 'CURRENCY_FIELD',
   label: 'Weekly expenses',
   defaultValue: null,
   validationRules: [...]
}
```

### Rules

Work in progress...

```javascript
{
   ...
   validationRules: [
        {
            type: 'BOOL',                   // type of the condition that needs to be performed
            condition: '!=null',            // the rule that needs to be satisfied
            msg: 'Field must not be empty', // an error message in case the condition evaluates to false
            fieldRefs: [
                {
                    alias: 'LEFT_STEP',         // the alias for the field reference
                    stepId: 'stepOne',          // the step id
                    fieldId: 'weeklyExpenses'   // the field id
                }
            ]
        },
        {...}
    ]
}
```
